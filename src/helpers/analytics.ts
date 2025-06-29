// Analytics and Tracking Helpers
interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: Date;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private isEnabled: boolean = true;

  constructor() {
    // Initialize analytics based on environment
    this.isEnabled = import.meta.env.PROD;
  }

  // Track user events
  track(eventName: string, properties?: Record<string, any>, userId?: string) {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      name: eventName,
      properties: {
        ...properties,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      },
      userId,
      timestamp: new Date(),
    };

    this.events.push(event);
    this.sendEvent(event);
  }

  // Track page views
  trackPageView(page: string, userId?: string) {
    this.track(
      'page_view',
      {
        page,
        title: document.title,
        referrer: document.referrer,
      },
      userId
    );
  }

  // Track simulation events
  trackSimulationStart(decisionCategory: string, userId?: string) {
    this.track(
      'simulation_started',
      {
        category: decisionCategory,
      },
      userId
    );
  }

  trackSimulationComplete(simulationId: string, confidence: number, userId?: string) {
    this.track(
      'simulation_completed',
      {
        simulationId,
        confidence,
      },
      userId
    );
  }

  trackMediaGeneration(type: 'image' | 'video', style: string, userId?: string) {
    this.track(
      'media_generated',
      {
        type,
        style,
      },
      userId
    );
  }

  // Track user engagement
  trackFeatureUsage(feature: string, userId?: string) {
    this.track(
      'feature_used',
      {
        feature,
      },
      userId
    );
  }

  trackError(error: string, context?: string, userId?: string) {
    this.track(
      'error_occurred',
      {
        error,
        context,
        stack: new Error().stack,
      },
      userId
    );
  }

  // Performance tracking
  trackPerformance(metric: string, value: number, userId?: string) {
    this.track(
      'performance_metric',
      {
        metric,
        value,
      },
      userId
    );
  }

  // Send event to analytics service
  private async sendEvent(event: AnalyticsEvent) {
    try {
      // In production, send to your analytics service
      if (import.meta.env.PROD) {
        // Example: Send to your analytics endpoint
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(event),
        });
      } else {
        // In development, just log
        console.log('Analytics Event:', event);
      }
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  }

  // Get stored events (for debugging)
  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  // Clear events
  clearEvents() {
    this.events = [];
  }
}

export const analytics = new AnalyticsService();

// React hook for analytics
export function useAnalytics() {
  return {
    track: analytics.track.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackSimulationStart: analytics.trackSimulationStart.bind(analytics),
    trackSimulationComplete: analytics.trackSimulationComplete.bind(analytics),
    trackMediaGeneration: analytics.trackMediaGeneration.bind(analytics),
    trackFeatureUsage: analytics.trackFeatureUsage.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackPerformance: analytics.trackPerformance.bind(analytics),
  };
}
