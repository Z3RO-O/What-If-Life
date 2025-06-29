import { supabase } from '@/lib/supabase';

export interface MediaGenerationRequest {
  simulationId: string;
  eventId?: string;
  prompt: string;
  type: 'image' | 'video';
  style?: 'realistic' | 'artistic' | 'cinematic' | 'vintage' | 'futuristic' | 'minimalist';
  duration?: number; // for videos
}

export interface GeneratedMedia {
  id: string;
  url: string;
  type: 'image' | 'video';
  prompt: string;
  style: string;
  metadata: any;
  createdAt: string;
}

export const mediaApi = {
  // Generate new media
  async generateMedia(request: MediaGenerationRequest): Promise<GeneratedMedia> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-media`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          simulation_id: request.simulationId,
          event_id: request.eventId,
          prompt: request.prompt,
          type: request.type,
          style: request.style,
          duration: request.duration,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Media generation failed');
    }

    const result = await response.json();
    return {
      id: result.media_id,
      url: result.media.url,
      type: result.media.type,
      prompt: result.media.prompt,
      style: result.media.style,
      metadata: result.media.metadata,
      createdAt: new Date().toISOString(),
    };
  },

  // Get media for a simulation
  async getSimulationMedia(simulationId: string): Promise<GeneratedMedia[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('generated_media')
      .select('*')
      .eq('simulation_id', simulationId)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(item => ({
      id: item.id,
      url: item.media_url,
      type: item.media_type,
      prompt: item.prompt,
      style: item.style,
      metadata: item.metadata,
      createdAt: item.created_at,
    }));
  },

  // Get media for a specific event
  async getEventMedia(eventId: string): Promise<GeneratedMedia[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('generated_media')
      .select('*')
      .eq('event_id', eventId)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(item => ({
      id: item.id,
      url: item.media_url,
      type: item.media_type,
      prompt: item.prompt,
      style: item.style,
      metadata: item.metadata,
      createdAt: item.created_at,
    }));
  },

  // Delete media
  async deleteMedia(mediaId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('generated_media')
      .delete()
      .eq('id', mediaId)
      .eq('user_id', user.id);

    if (error) throw error;
  },

  // Generate prompt suggestions based on life event
  generatePromptSuggestions(event: any): string[] {
    const basePrompts = {
      career: [
        `Person working in ${event.category} environment, professional setting`,
        `Career milestone celebration, office or workplace scene`,
        `Professional networking event, business meeting atmosphere`,
        `Achievement moment in ${event.category} field, success visualization`
      ],
      education: [
        `Student in educational setting, learning environment`,
        `Graduation ceremony, academic achievement moment`,
        `Study session, library or classroom scene`,
        `Educational milestone, knowledge acquisition visualization`
      ],
      relationship: [
        `Meaningful relationship moment, emotional connection`,
        `Social gathering, friends and family interaction`,
        `Romantic scene, intimate and warm atmosphere`,
        `Community event, social bonding visualization`
      ],
      location: [
        `New city or location, exploration and discovery`,
        `Moving day, transition and change visualization`,
        `Local landmark or characteristic scene`,
        `Neighborhood life, community and belonging`
      ],
      health: [
        `Wellness and fitness activity, healthy lifestyle`,
        `Medical or health-related milestone`,
        `Outdoor activity, nature and vitality`,
        `Self-care moment, mental and physical wellbeing`
      ],
      finance: [
        `Financial milestone celebration, success moment`,
        `Investment or business opportunity visualization`,
        `Economic stability, security and prosperity`,
        `Financial planning, future-focused scene`
      ]
    };

    const categoryPrompts = basePrompts[event.category as keyof typeof basePrompts] || basePrompts.career;
    
    return categoryPrompts.map(prompt => 
      `${prompt}, ${event.impact === 'positive' ? 'happy and successful' : 
        event.impact === 'negative' ? 'challenging but resilient' : 'contemplative and thoughtful'} mood`
    );
  }
};