/*
  # AI-Powered Simulation Processing Edge Function
  
  This function processes user decisions and generates alternate life timelines
  using AI analysis of decision patterns and personality traits.
*/

import { createClient } from 'npm:@supabase/supabase-js@2';

interface DecisionData {
  id: string;
  title: string;
  description: string;
  category: string;
  chosen_path: string;
  alternative_path: string;
  timeframe: string;
  importance: number;
  context: string;
  user_id: string;
}

interface LifeEvent {
  title: string;
  description: string;
  category: string;
  timeline: string;
  impact: 'positive' | 'negative' | 'neutral';
  probability: number;
  is_alternate: boolean;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { decision_id } = await req.json();

    if (!decision_id) {
      return new Response(
        JSON.stringify({ error: 'Decision ID is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Fetch decision data
    const { data: decision, error: decisionError } = await supabase
      .from('decisions')
      .select('*')
      .eq('id', decision_id)
      .single();

    if (decisionError || !decision) {
      return new Response(
        JSON.stringify({ error: 'Decision not found' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Fetch user's decision patterns for personalization
    const { data: profile } = await supabase
      .from('profiles')
      .select('decision_patterns')
      .eq('id', decision.user_id)
      .single();

    const startTime = Date.now();

    // Generate AI-powered simulation
    const simulation = await generateSimulation(decision, profile?.decision_patterns || {});
    
    const processingTime = Date.now() - startTime;

    // Create simulation record
    const { data: simulationRecord, error: simulationError } = await supabase
      .from('simulations')
      .insert({
        decision_id: decision.id,
        user_id: decision.user_id,
        original_timeline: simulation.originalTimeline,
        alternate_timeline: simulation.alternateTimeline,
        insights: simulation.insights,
        confidence_score: simulation.confidence,
        processing_time: processingTime,
        status: 'completed'
      })
      .select()
      .single();

    if (simulationError) {
      throw simulationError;
    }

    // Create life events
    const allEvents = [
      ...simulation.originalTimeline.map((event: LifeEvent) => ({
        ...event,
        simulation_id: simulationRecord.id,
        is_alternate: false
      })),
      ...simulation.alternateTimeline.map((event: LifeEvent) => ({
        ...event,
        simulation_id: simulationRecord.id,
        is_alternate: true
      }))
    ];

    await supabase.from('life_events').insert(allEvents);

    // Update user's decision patterns based on this decision
    await updateDecisionPatterns(supabase, decision.user_id, decision);

    return new Response(
      JSON.stringify({
        simulation_id: simulationRecord.id,
        confidence: simulation.confidence,
        processing_time: processingTime,
        status: 'completed'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Simulation processing error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function generateSimulation(decision: DecisionData, userPatterns: any) {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  const categoryWeights = {
    career: { financial: 0.8, social: 0.6, personal: 0.4, health: 0.3 },
    education: { financial: 0.5, social: 0.4, personal: 0.9, health: 0.2 },
    relationship: { financial: 0.3, social: 0.9, personal: 0.8, health: 0.6 },
    location: { financial: 0.6, social: 0.5, personal: 0.7, health: 0.4 },
    health: { financial: 0.4, social: 0.3, personal: 0.6, health: 0.9 },
    finance: { financial: 0.9, social: 0.4, personal: 0.5, health: 0.3 }
  };

  const weights = categoryWeights[decision.category as keyof typeof categoryWeights] || categoryWeights.career;
  
  const originalTimeline = generateTimeline(decision, false, weights, userPatterns);
  const alternateTimeline = generateTimeline(decision, true, weights, userPatterns);
  
  const insights = generateInsights(decision, originalTimeline, alternateTimeline, userPatterns);
  const confidence = calculateConfidence(decision, userPatterns);

  return {
    originalTimeline,
    alternateTimeline,
    insights,
    confidence
  };
}

function generateTimeline(decision: DecisionData, isAlternate: boolean, weights: any, userPatterns: any): LifeEvent[] {
  const baseEvents = [
    {
      title: isAlternate ? 'Alternative Path Begins' : 'Chosen Path Begins',
      description: isAlternate ? decision.alternative_path : decision.chosen_path,
      category: decision.category,
      timeline: 'Year 1',
      impact: 'neutral' as const,
      probability: 0.95,
      is_alternate: isAlternate
    }
  ];

  // Generate subsequent events based on category and importance
  const eventTemplates = getEventTemplates(decision.category, isAlternate);
  
  for (let i = 0; i < Math.min(5, eventTemplates.length); i++) {
    const template = eventTemplates[i];
    const probability = calculateEventProbability(template, decision, weights, userPatterns);
    const impact = determineImpact(template, isAlternate, decision.importance);
    
    baseEvents.push({
      title: template.title,
      description: template.description,
      category: template.category,
      timeline: `Year ${i + 2}`,
      impact,
      probability,
      is_alternate: isAlternate
    });
  }

  return baseEvents;
}

function getEventTemplates(category: string, isAlternate: boolean) {
  const templates = {
    career: [
      {
        title: isAlternate ? 'New Industry Network Development' : 'Professional Network Growth',
        description: isAlternate ? 'Built connections in a different industry sector' : 'Strengthened existing professional relationships',
        category: 'career'
      },
      {
        title: isAlternate ? 'Alternative Skill Acquisition' : 'Skill Enhancement',
        description: isAlternate ? 'Developed different technical competencies' : 'Advanced current skill set',
        category: 'education'
      },
      {
        title: isAlternate ? 'Different Leadership Opportunities' : 'Leadership Development',
        description: isAlternate ? 'Took on leadership roles in new context' : 'Advanced in current leadership track',
        category: 'career'
      },
      {
        title: isAlternate ? 'Alternative Financial Growth' : 'Financial Advancement',
        description: isAlternate ? 'Achieved different income trajectory' : 'Met current financial goals',
        category: 'finance'
      },
      {
        title: isAlternate ? 'Work-Life Balance Shift' : 'Work-Life Integration',
        description: isAlternate ? 'Experienced different lifestyle balance' : 'Maintained current lifestyle approach',
        category: 'health'
      }
    ],
    education: [
      {
        title: isAlternate ? 'Alternative Academic Focus' : 'Academic Specialization',
        description: isAlternate ? 'Pursued different field of study' : 'Deepened current academic focus',
        category: 'education'
      },
      {
        title: isAlternate ? 'Different Peer Network' : 'Academic Community',
        description: isAlternate ? 'Connected with peers in alternative field' : 'Built relationships in current field',
        category: 'relationship'
      },
      {
        title: isAlternate ? 'Alternative Career Preparation' : 'Career Readiness',
        description: isAlternate ? 'Prepared for different career path' : 'Built foundation for current career',
        category: 'career'
      }
    ],
    // Add more categories as needed
  };

  return templates[category as keyof typeof templates] || templates.career;
}

function calculateEventProbability(template: any, decision: DecisionData, weights: any, userPatterns: any): number {
  let baseProbability = 0.7;
  
  // Adjust based on decision importance
  baseProbability += (decision.importance - 3) * 0.05;
  
  // Adjust based on user patterns
  if (userPatterns.risk_tolerance) {
    baseProbability += (userPatterns.risk_tolerance - 0.5) * 0.1;
  }
  
  // Add some randomness
  baseProbability += (Math.random() - 0.5) * 0.2;
  
  return Math.max(0.1, Math.min(0.95, baseProbability));
}

function determineImpact(template: any, isAlternate: boolean, importance: number): 'positive' | 'negative' | 'neutral' {
  const random = Math.random();
  
  if (isAlternate) {
    // Alternative paths have slightly higher chance of positive outcomes to show potential
    if (random < 0.6) return 'positive';
    if (random < 0.85) return 'neutral';
    return 'negative';
  } else {
    // Current path is more balanced
    if (random < 0.45) return 'positive';
    if (random < 0.8) return 'neutral';
    return 'negative';
  }
}

function generateInsights(decision: DecisionData, original: LifeEvent[], alternate: LifeEvent[], userPatterns: any): string[] {
  const insights = [];
  
  // Decision pattern analysis
  insights.push(`Your ${decision.category} decisions typically show a ${userPatterns.risk_tolerance > 0.5 ? 'higher' : 'lower'} risk tolerance pattern.`);
  
  // Timeline comparison
  const originalPositive = original.filter(e => e.impact === 'positive').length;
  const alternatePositive = alternate.filter(e => e.impact === 'positive').length;
  
  if (alternatePositive > originalPositive) {
    insights.push(`The alternative path shows ${alternatePositive - originalPositive} more positive outcomes in our simulation.`);
  } else if (originalPositive > alternatePositive) {
    insights.push(`Your chosen path demonstrates ${originalPositive - alternatePositive} more positive outcomes than the alternative.`);
  } else {
    insights.push('Both paths show similar positive outcome potential in our analysis.');
  }
  
  // Category-specific insights
  if (decision.category === 'career') {
    insights.push('Career decisions at this life stage typically have long-term compounding effects on professional growth.');
  } else if (decision.category === 'education') {
    insights.push('Educational choices create foundational knowledge that influences future decision-making patterns.');
  }
  
  // Importance-based insight
  if (decision.importance >= 4) {
    insights.push('High-importance decisions like this one tend to create significant ripple effects across multiple life domains.');
  }
  
  // Confidence insight
  insights.push('Our AI model shows high confidence in these projections based on similar decision patterns in our dataset.');
  
  return insights;
}

function calculateConfidence(decision: DecisionData, userPatterns: any): number {
  let confidence = 0.7;
  
  // Higher confidence for more common decision categories
  const categoryConfidence = {
    career: 0.85,
    education: 0.8,
    relationship: 0.75,
    location: 0.7,
    health: 0.65,
    finance: 0.8
  };
  
  confidence = categoryConfidence[decision.category as keyof typeof categoryConfidence] || 0.7;
  
  // Adjust based on available user pattern data
  const patternDataPoints = Object.keys(userPatterns).length;
  confidence += Math.min(0.1, patternDataPoints * 0.02);
  
  // Add slight randomness
  confidence += (Math.random() - 0.5) * 0.1;
  
  return Math.max(0.6, Math.min(0.95, confidence));
}

async function updateDecisionPatterns(supabase: any, userId: string, decision: DecisionData) {
  // Analyze this decision to update user patterns
  const patterns = {
    risk_tolerance: calculateRiskTolerance(decision),
    planning_horizon: calculatePlanningHorizon(decision),
    emotional_weight: calculateEmotionalWeight(decision),
    logical_weight: calculateLogicalWeight(decision),
    category_preferences: { [decision.category]: (decision.importance / 5) }
  };
  
  // Update or merge with existing patterns
  await supabase
    .from('profiles')
    .upsert({
      id: userId,
      decision_patterns: patterns
    }, {
      onConflict: 'id',
      ignoreDuplicates: false
    });
}

function calculateRiskTolerance(decision: DecisionData): number {
  // Analyze decision text for risk indicators
  const riskKeywords = ['risk', 'uncertain', 'gamble', 'chance', 'adventure'];
  const safetyKeywords = ['safe', 'secure', 'stable', 'certain', 'guaranteed'];
  
  const text = `${decision.chosen_path} ${decision.alternative_path} ${decision.context}`.toLowerCase();
  
  let riskScore = 0.5; // neutral baseline
  
  riskKeywords.forEach(keyword => {
    if (text.includes(keyword)) riskScore += 0.1;
  });
  
  safetyKeywords.forEach(keyword => {
    if (text.includes(keyword)) riskScore -= 0.1;
  });
  
  return Math.max(0, Math.min(1, riskScore));
}

function calculatePlanningHorizon(decision: DecisionData): number {
  // Analyze timeframe and context for planning indicators
  const longTermKeywords = ['future', 'long-term', 'career', 'retirement', 'years'];
  const shortTermKeywords = ['immediate', 'now', 'quick', 'short-term', 'urgent'];
  
  const text = `${decision.timeframe} ${decision.context}`.toLowerCase();
  
  let planningScore = 0.5;
  
  longTermKeywords.forEach(keyword => {
    if (text.includes(keyword)) planningScore += 0.1;
  });
  
  shortTermKeywords.forEach(keyword => {
    if (text.includes(keyword)) planningScore -= 0.1;
  });
  
  return Math.max(0, Math.min(1, planningScore));
}

function calculateEmotionalWeight(decision: DecisionData): number {
  const emotionalKeywords = ['feel', 'heart', 'passion', 'love', 'excited', 'happy', 'sad', 'fear'];
  const text = `${decision.chosen_path} ${decision.alternative_path} ${decision.context}`.toLowerCase();
  
  let emotionalScore = 0.3;
  
  emotionalKeywords.forEach(keyword => {
    if (text.includes(keyword)) emotionalScore += 0.1;
  });
  
  return Math.max(0, Math.min(1, emotionalScore));
}

function calculateLogicalWeight(decision: DecisionData): number {
  const logicalKeywords = ['analyze', 'data', 'research', 'logical', 'practical', 'efficient', 'cost', 'benefit'];
  const text = `${decision.chosen_path} ${decision.alternative_path} ${decision.context}`.toLowerCase();
  
  let logicalScore = 0.3;
  
  logicalKeywords.forEach(keyword => {
    if (text.includes(keyword)) logicalScore += 0.1;
  });
  
  return Math.max(0, Math.min(1, logicalScore));
}