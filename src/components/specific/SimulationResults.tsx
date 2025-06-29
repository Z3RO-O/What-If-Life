import MediaGenerator from '@/components/premium/MediaGenerator';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { mediaApi, type GeneratedMedia } from '@/lib/mediaApi';
import { ArrowLeft, Brain, Clock, Download, Loader, TrendingUp, Wand2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface LifeEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  timeline: string;
  impact: 'positive' | 'negative' | 'neutral';
  probability: number;
  is_alternate: boolean;
}

interface SimulationData {
  id: string;
  confidence_score: number;
  insights: string[];
  decisions: {
    title: string;
    category: string;
  };
  life_events: LifeEvent[];
}

interface TimelineItemProps {
  event: LifeEvent;
  delay: number;
  simulationId: string;
}

function TimelineItem({ event, delay, simulationId }: TimelineItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showMediaGenerator, setShowMediaGenerator] = useState(false);
  const [eventMedia, setEventMedia] = useState<GeneratedMedia[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    loadEventMedia();
  }, [event.id]);

  const loadEventMedia = async () => {
    setLoadingMedia(true);
    try {
      const media = await mediaApi.getEventMedia(event.id);
      setEventMedia(media);
    } catch (error) {
      console.error('Error loading event media:', error);
    } finally {
      setLoadingMedia(false);
    }
  };

  const handleMediaGenerated = (media: GeneratedMedia) => {
    setEventMedia(prev => [media, ...prev]);
    setShowMediaGenerator(false);
  };

  const impactColors = {
    positive: event.is_alternate
      ? 'text-green-400 bg-green-400/20'
      : 'text-blue-400 bg-blue-400/20',
    negative: 'text-red-400 bg-red-400/20',
    neutral: 'text-gray-400 bg-gray-400/20',
  };

  return (
    <div
      className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">{event.title}</h3>
          <div className="flex items-center space-x-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${impactColors[event.impact]}`}
            >
              {event.impact}
            </span>
            <button
              onClick={() => setShowMediaGenerator(!showMediaGenerator)}
              className="text-purple-400 hover:text-purple-300 transition-colors"
              title="Generate AI Media"
            >
              <Wand2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <p className="text-gray-300 mb-3">{event.description}</p>

        <div className="flex justify-between items-center text-sm mb-4">
          <span className="text-gray-400">{event.timeline}</span>
          <span className="text-gray-400">{Math.round(event.probability * 100)}% likelihood</span>
        </div>

        {/* Generated Media Display */}
        {loadingMedia ? (
          <div className="flex items-center justify-center py-4">
            <Loader className="h-5 w-5 text-blue-400 animate-spin" />
            <span className="ml-2 text-gray-400">Loading media...</span>
          </div>
        ) : (
          eventMedia.length > 0 && (
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-3">
                {eventMedia.slice(0, 4).map(media => (
                  <div key={media.id} className="relative group">
                    {media.type === 'image' ? (
                      <img
                        src={media.url}
                        alt={media.prompt}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ) : (
                      <video
                        src={media.url}
                        className="w-full h-24 object-cover rounded-lg"
                        muted
                        loop
                        autoPlay
                      />
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <a
                        href={media.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-300"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              {eventMedia.length > 4 && (
                <p className="text-xs text-gray-400 mt-2">
                  +{eventMedia.length - 4} more media items
                </p>
              )}
            </div>
          )
        )}

        {/* Media Generator */}
        {showMediaGenerator && (
          <div className="mt-4">
            <MediaGenerator
              simulationId={simulationId}
              eventId={event.id}
              event={event}
              onMediaGenerated={handleMediaGenerated}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function SimulationResults() {
  const navigate = useNavigate();
  const { simulationId } = useParams<{ simulationId: string }>();
  const { isAuthenticated } = useAuth();
  const [simulation, setSimulation] = useState<SimulationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showGlobalMediaGenerator, setShowGlobalMediaGenerator] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    if (simulationId) {
      loadSimulation();
    }
  }, [simulationId, isAuthenticated, navigate]);

  const loadSimulation = async () => {
    try {
      const data = await api.getSimulation(simulationId!);
      setSimulation(data);
    } catch (err) {
      console.error('Error loading simulation:', err);
      setError('Failed to load simulation results');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Brain className="h-16 w-16 text-blue-400 mx-auto mb-4 animate-pulse" />
            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl animate-ping" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Simulation Results</h2>
          <p className="text-gray-300">Retrieving your alternate timeline...</p>
        </div>
      </div>
    );
  }

  if (error || !simulation) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Simulation Not Found</h1>
          <p className="text-xl text-gray-300 mb-8">
            {error || 'The requested simulation could not be found.'}
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const originalEvents = simulation.life_events.filter(event => !event.is_alternate);
  const alternateEvents = simulation.life_events.filter(event => event.is_alternate);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex space-x-3">
          <button
            onClick={() => setShowGlobalMediaGenerator(!showGlobalMediaGenerator)}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            <Wand2 className="h-4 w-4" />
            <span>Generate Overview Media</span>
          </button>
          <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
            <Download className="h-4 w-4" />
            <span>Export Results</span>
          </button>
        </div>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Your Alternate
          <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Life Timeline
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-6">{simulation.decisions.title}</p>
        <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="font-medium">
            {Math.round(simulation.confidence_score * 100)}% Confidence
          </span>
        </div>
      </div>

      {/* Global Media Generator */}
      {showGlobalMediaGenerator && (
        <div className="mb-12">
          <MediaGenerator
            simulationId={simulation.id}
            event={{
              title: simulation.decisions.title,
              category: simulation.decisions.category,
              impact: 'neutral',
            }}
          />
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Clock className="h-6 w-6 mr-2 text-blue-400" />
            Your Actual Path
          </h2>
          <div className="space-y-4">
            {originalEvents.map((event, index) => (
              <TimelineItem
                key={event.id}
                event={event}
                delay={index * 200}
                simulationId={simulation.id}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-purple-400" />
            Alternative Path
          </h2>
          <div className="space-y-4">
            {alternateEvents.map((event, index) => (
              <TimelineItem
                key={event.id}
                event={event}
                delay={index * 200 + 100}
                simulationId={simulation.id}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Brain className="h-6 w-6 mr-2 text-teal-400" />
          AI Insights
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {simulation.insights.map((insight, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-xl p-4 border border-white/10"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <p className="text-gray-300">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
