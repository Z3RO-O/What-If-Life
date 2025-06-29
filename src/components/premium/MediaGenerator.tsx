import React, { useState } from 'react';
import { Image, Video, Wand2, Download, Trash2, Loader, Sparkles } from 'lucide-react';
import { mediaApi, type MediaGenerationRequest, type GeneratedMedia } from '@/lib/mediaApi';

interface MediaGeneratorProps {
  simulationId: string;
  eventId?: string;
  event?: any;
  onMediaGenerated?: (media: GeneratedMedia) => void;
}

export default function MediaGenerator({ simulationId, eventId, event, onMediaGenerated }: MediaGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<MediaGenerationRequest['style']>('realistic');
  const [duration, setDuration] = useState(5);
  const [generatedMedia, setGeneratedMedia] = useState<GeneratedMedia[]>([]);
  const [error, setError] = useState('');

  const styles = [
    { value: 'realistic', label: 'Realistic', description: 'Photorealistic, high quality' },
    { value: 'artistic', label: 'Artistic', description: 'Painterly, creative style' },
    { value: 'cinematic', label: 'Cinematic', description: 'Film-like, dramatic lighting' },
    { value: 'vintage', label: 'Vintage', description: 'Retro, nostalgic feel' },
    { value: 'futuristic', label: 'Futuristic', description: 'Sci-fi, high-tech aesthetic' },
    { value: 'minimalist', label: 'Minimalist', description: 'Clean, simple design' },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setGenerating(true);
    setError('');

    try {
      const media = await mediaApi.generateMedia({
        simulationId,
        eventId,
        prompt: prompt.trim(),
        type: mediaType,
        style,
        duration: mediaType === 'video' ? duration : undefined,
      });

      setGeneratedMedia(prev => [media, ...prev]);
      onMediaGenerated?.(media);
      setPrompt('');
    } catch (err: any) {
      setError(err.message || 'Generation failed');
    } finally {
      setGenerating(false);
    }
  };

  const handlePromptSuggestion = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const handleDeleteMedia = async (mediaId: string) => {
    try {
      await mediaApi.deleteMedia(mediaId);
      setGeneratedMedia(prev => prev.filter(m => m.id !== mediaId));
    } catch (err: any) {
      setError(err.message || 'Delete failed');
    }
  };

  const promptSuggestions = event ? mediaApi.generatePromptSuggestions(event) : [];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
      >
        <Wand2 className="h-4 w-4" />
        <span>Generate Media</span>
      </button>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
          AI Media Generator
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ×
        </button>
      </div>

      {/* Media Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">Media Type</label>
        <div className="flex space-x-3">
          <button
            onClick={() => setMediaType('image')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              mediaType === 'image'
                ? 'bg-blue-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Image className="h-4 w-4" />
            <span>Image</span>
          </button>
          <button
            onClick={() => setMediaType('video')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              mediaType === 'video'
                ? 'bg-blue-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Video className="h-4 w-4" />
            <span>Video</span>
          </button>
        </div>
      </div>

      {/* Style Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">Style</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {styles.map((styleOption) => (
            <button
              key={styleOption.value}
              onClick={() => setStyle(styleOption.value as any)}
              className={`p-3 rounded-lg text-left transition-all ${
                style === styleOption.value
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <div className="font-medium">{styleOption.label}</div>
              <div className="text-xs opacity-75">{styleOption.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Video Duration */}
      {mediaType === 'video' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Duration: {duration} seconds
          </label>
          <input
            type="range"
            min="3"
            max="10"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      )}

      {/* Prompt Suggestions */}
      {promptSuggestions.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">Prompt Suggestions</label>
          <div className="space-y-2">
            {promptSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handlePromptSuggestion(suggestion)}
                className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 text-sm transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Prompt Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">Prompt</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to generate..."
          rows={3}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-lg p-3">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={generating || !prompt.trim()}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {generating ? (
          <>
            <Loader className="h-5 w-5 animate-spin" />
            <span>Generating {mediaType}...</span>
          </>
        ) : (
          <>
            <Wand2 className="h-5 w-5" />
            <span>Generate {mediaType}</span>
          </>
        )}
      </button>

      {/* Generated Media Gallery */}
      {generatedMedia.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-white mb-4">Generated Media</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedMedia.map((media) => (
              <div key={media.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                {media.type === 'image' ? (
                  <img
                    src={media.url}
                    alt={media.prompt}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                ) : (
                  <video
                    src={media.url}
                    controls
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                )}
                <p className="text-gray-300 text-sm mb-2 line-clamp-2">{media.prompt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 capitalize">{media.style}</span>
                  <div className="flex space-x-2">
                    <a
                      href={media.url}
                      download
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => handleDeleteMedia(media.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}