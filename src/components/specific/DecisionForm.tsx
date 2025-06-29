import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { Decision } from '@/types';
import { ArrowRight, Calendar, Loader, Star } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DecisionForm() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Decision>>({
    category: 'career',
    importance: 3,
  });

  const categories = [
    { value: 'career', label: 'Career & Work', icon: '💼' },
    { value: 'education', label: 'Education', icon: '🎓' },
    { value: 'relationship', label: 'Relationships', icon: '💕' },
    { value: 'location', label: 'Location & Living', icon: '🏠' },
    { value: 'health', label: 'Health & Wellness', icon: '🏃' },
    { value: 'finance', label: 'Financial', icon: '💰' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      // Redirect to home with auth modal
      navigate('/?auth=signup');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create decision in database
      const decision = await api.createDecision({
        title: formData.title || '',
        description: formData.description || '',
        category: formData.category as Decision['category'],
        chosenPath: formData.chosenPath || '',
        alternativePath: formData.alternativePath || '',
        timeframe: formData.timeframe || '',
        importance: formData.importance || 3,
        context: formData.context || '',
      });

      // Process simulation
      const simulation = await api.processSimulation(decision.id);

      // Navigate to results
      navigate(`/simulation/${simulation.simulation_id}`);
    } catch (error) {
      console.error('Error processing simulation:', error);
      // Handle error - could show toast notification
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Sign In Required</h1>
          <p className="text-xl text-gray-300 mb-8">
            Please sign in to create and track your life simulations.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Define Your
          <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Pivotal Decision
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Tell us about a significant choice you made, and we'll simulate how your life might have
          unfolded if you had chosen differently.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
      >
        <div className="space-y-8">
          {/* Decision Title */}
          <div>
            <label className="block text-lg font-medium text-white mb-3">Decision Title</label>
            <input
              type="text"
              required
              placeholder="e.g., Choosing my college major"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.title || ''}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-lg font-medium text-white mb-3">Category</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map(category => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, category: category.value as Decision['category'] })
                  }
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    formData.category === category.value
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="text-sm font-medium">{category.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Paths */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-white mb-3">Path You Chose</label>
              <textarea
                required
                placeholder="Describe the choice you actually made..."
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                value={formData.chosenPath || ''}
                onChange={e => setFormData({ ...formData, chosenPath: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-white mb-3">Alternative Path</label>
              <textarea
                required
                placeholder="Describe the choice you didn't make..."
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                value={formData.alternativePath || ''}
                onChange={e => setFormData({ ...formData, alternativePath: e.target.value })}
              />
            </div>
          </div>

          {/* Timeframe and Importance */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-white mb-3 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-400" />
                When Did This Happen?
              </label>
              <input
                type="text"
                required
                placeholder="e.g., 2018, Age 22, 5 years ago"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.timeframe || ''}
                onChange={e => setFormData({ ...formData, timeframe: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-white mb-3 flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-400" />
                Importance Level
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, importance: level as Decision['importance'] })
                    }
                    className={`w-12 h-12 rounded-full transition-all duration-200 ${
                      formData.importance === level
                        ? 'bg-yellow-500 text-black'
                        : 'bg-white/10 text-gray-400 hover:bg-white/20'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Context */}
          <div>
            <label className="block text-lg font-medium text-white mb-3">Additional Context</label>
            <textarea
              placeholder="Provide any additional context that might help us understand your decision..."
              rows={3}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              value={formData.context || ''}
              onChange={e => setFormData({ ...formData, context: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-2xl flex items-center space-x-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Start Simulation</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
