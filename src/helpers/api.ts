// Enhanced API Helper with Error Handling and Retry Logic
import { supabase } from '@/lib/supabase';

class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
};

// Exponential backoff delay
const getRetryDelay = (attempt: number): number => {
  const delay = RETRY_CONFIG.baseDelay * Math.pow(2, attempt);
  return Math.min(delay, RETRY_CONFIG.maxDelay);
};

// Generic retry wrapper
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = RETRY_CONFIG.maxRetries
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on authentication errors or client errors
      if (error instanceof APIError && error.status && error.status < 500) {
        throw error;
      }

      if (attempt < maxRetries) {
        const delay = getRetryDelay(attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
    }
  }

  throw lastError!;
}

// Enhanced API client
export class APIClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = import.meta.env.VITE_SUPABASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async getAuthHeaders(): Promise<Record<string, string>> {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      throw new APIError('Authentication required', 401, 'AUTH_REQUIRED');
    }

    return {
      ...this.defaultHeaders,
      'Authorization': `Bearer ${session.access_token}`,
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}/functions/v1/${endpoint}`;
    const headers = await this.getAuthHeaders();

    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.error || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData.code
      );
    }

    return response.json();
  }

  // Decision API
  async createDecision(decision: any): Promise<any> {
    return withRetry(() => 
      this.request('create-decision', {
        method: 'POST',
        body: JSON.stringify(decision),
      })
    );
  }

  async getDecisions(): Promise<any[]> {
    return withRetry(() => this.request('get-decisions'));
  }

  // Simulation API
  async processSimulation(decisionId: string): Promise<any> {
    return withRetry(() =>
      this.request('process-simulation', {
        method: 'POST',
        body: JSON.stringify({ decision_id: decisionId }),
      })
    );
  }

  async getSimulation(simulationId: string): Promise<any> {
    return withRetry(() => this.request(`get-simulation/${simulationId}`));
  }

  async getUserSimulations(): Promise<any[]> {
    return withRetry(() => this.request('get-user-simulations'));
  }

  // Analytics API
  async getUserStats(): Promise<any> {
    return withRetry(() => this.request('get-user-stats'));
  }

  async getSimulationAnalytics(simulationId: string): Promise<any> {
    return withRetry(() => this.request(`get-simulation-analytics/${simulationId}`));
  }

  // Media Generation API
  async generateMedia(request: any): Promise<any> {
    return withRetry(() =>
      this.request('generate-media', {
        method: 'POST',
        body: JSON.stringify(request),
      })
    );
  }

  async getMediaForSimulation(simulationId: string): Promise<any[]> {
    return withRetry(() => this.request(`get-media/${simulationId}`));
  }

  // Real-time subscriptions
  subscribeToSimulations(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel('simulations')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'simulations',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();
  }

  subscribeToDecisions(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel('decisions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'decisions',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();
  }
}

export const apiClient = new APIClient();