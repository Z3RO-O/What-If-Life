export interface Decision {
  id: string;
  title: string;
  description: string;
  category: 'career' | 'education' | 'relationship' | 'location' | 'health' | 'finance';
  chosenPath: string;
  alternativePath: string;
  timeframe: string;
  importance: 1 | 2 | 3 | 4 | 5;
  context: string;
  createdAt: Date;
}

export interface LifeEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  timeline: string;
  impact: 'positive' | 'negative' | 'neutral';
  probability: number;
}

export interface Simulation {
  id: string;
  decision: Decision;
  originalTimeline: LifeEvent[];
  alternateTimeline: LifeEvent[];
  insights: string[];
  confidence: number;
  createdAt: Date;
  status: 'processing' | 'completed' | 'failed';
}

export interface User {
  id: string;
  name: string;
  email: string;
  simulations: Simulation[];
  decisionPatterns: {
    riskTolerance: number;
    planningHorizon: number;
    emotionalWeight: number;
    logicalWeight: number;
  };
}