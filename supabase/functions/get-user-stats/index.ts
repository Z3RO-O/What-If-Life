/*
  # User Statistics Edge Function
  
  Provides aggregated statistics for user dashboard
*/

import { createClient } from 'npm:@supabase/supabase-js@2';

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

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Get user from auth header
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Get user statistics
    const [
      { count: totalSimulations },
      { data: completedSimulations },
      { data: recentSimulations }
    ] = await Promise.all([
      supabase
        .from('simulations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id),
      
      supabase
        .from('simulations')
        .select('confidence_score, processing_time')
        .eq('user_id', user.id)
        .eq('status', 'completed'),
      
      supabase
        .from('simulations')
        .select(`
          id,
          confidence_score,
          created_at,
          status,
          decisions (
            title,
            category
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)
    ]);

    // Calculate statistics
    const avgConfidence = completedSimulations?.length > 0
      ? completedSimulations.reduce((sum, sim) => sum + (sim.confidence_score || 0), 0) / completedSimulations.length
      : 0;

    const avgProcessingTime = completedSimulations?.length > 0
      ? completedSimulations.reduce((sum, sim) => sum + (sim.processing_time || 0), 0) / completedSimulations.length
      : 0;

    // Count insights generated (assuming 5 insights per simulation)
    const totalInsights = (completedSimulations?.length || 0) * 5;

    const stats = {
      totalSimulations: totalSimulations || 0,
      avgConfidence: Math.round(avgConfidence * 100),
      avgProcessingTime: Math.round(avgProcessingTime / 1000 * 10) / 10, // Convert to seconds
      totalInsights,
      recentSimulations: recentSimulations?.map(sim => ({
        id: sim.id,
        title: sim.decisions?.title || 'Untitled Decision',
        category: sim.decisions?.category || 'general',
        confidence: sim.confidence_score || 0,
        createdAt: sim.created_at,
        status: sim.status
      })) || []
    };

    return new Response(
      JSON.stringify(stats),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Stats error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});