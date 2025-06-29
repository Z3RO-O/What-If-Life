// API Response Types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Decision Types
export interface Decision {
  id: string;
  userId: string;
  title: string;
  description?: string;
  category: DecisionCategory;
  chosenPath: string;
  alternativePath: string;
  timeframe: string;
  importance: 1 | 2 | 3 | 4 | 5;
  context?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDecisionRequest {
  title: string;
  description?: string;
  category: DecisionCategory;
  chosenPath: string;
  alternativePath: string;
  timeframe: string;
  importance: 1 | 2 | 3 | 4 | 5;
  context?: string;
}

// Simulation Types
export interface Simulation {
  id: string;
  decisionId: string;
  userId: string;
  originalTimeline: LifeEvent[];
  alternateTimeline: LifeEvent[];
  insights: string[];
  confidenceScore: number;
  processingTime: number;
  status: 'processing' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface LifeEvent {
  id: string;
  simulationId: string;
  title: string;
  description: string;
  category: string;
  timeline: string;
  impact: 'positive' | 'negative' | 'neutral';
  probability: number;
  isAlternate: boolean;
  createdAt: string;
}

export interface ProcessSimulationRequest {
  decisionId: string;
}

export interface ProcessSimulationResponse {
  simulationId: string;
  confidence: number;
  processingTime: number;
  status: string;
}

// Media Types
export interface GeneratedMedia {
  id: string;
  simulationId: string;
  eventId?: string;
  userId: string;
  type: 'image' | 'video';
  url: string;
  prompt: string;
  style: MediaStyle;
  metadata: Record<string, any>;
  createdAt: string;
}

export interface MediaGenerationRequest {
  simulationId: string;
  eventId?: string;
  prompt: string;
  type: 'image' | 'video';
  style?: MediaStyle;
  duration?: number; // for videos
}

export interface MediaGenerationResponse {
  mediaId: string;
  url: string;
  type: 'image' | 'video';
  style: string;
  metadata: Record<string, any>;
}

// User Types
export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  decisionPatterns: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  totalSimulations: number;
  avgConfidence: number;
  avgProcessingTime: number;
  totalInsights: number;
  recentSimulations: Array<{
    id: string;
    title: string;
    category: string;
    confidence: number;
    createdAt: string;
    status: string;
  }>;
  categoryBreakdown: Record<DecisionCategory, number>;
  monthlyUsage: Array<{
    month: string;
    simulations: number;
  }>;
}

// Analytics Types
export interface SimulationAnalytics {
  simulationId: string;
  views: number;
  interactions: number;
  mediaGenerated: number;
  shareCount: number;
  avgTimeSpent: number;
  completionRate: number;
  userFeedback: {
    rating: number;
    comments: string[];
  };
}

// Error Types
export interface APIError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
}

// Subscription Types
export interface Subscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UsageStats {
  simulationsUsed: number;
  simulationsLimit: number;
  mediaGenerated: number;
  storageUsed: number; // in bytes
  storageLimit: number; // in bytes
  resetDate: string;
}

// Import types from constants
import type { DecisionCategory, MediaStyle, SubscriptionTier } from '@/helpers/constants';