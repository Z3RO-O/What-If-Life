import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Brain, Clock, TrendingUp, BarChart3, Loader } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';

interface UserStats {
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
}

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      loadUserStats();
    }
  }, [isAuthenticated]);

  const loadUserStats = async () => {
    try {
      const userStats = await api.getUserStats();
      setStats(userStats);
    } catch (error) {
      console.error('Error loading user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Dashboard Access Required</h1>
          <p className="text-xl text-gray-300 mb-8">
            Please sign in to view your simulation dashboard and track your alternate life explorations.
          </p>
          <Link
            to="/"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Go to Home Page
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center">
          <Loader className="h-8 w-8 text-blue-400 animate-spin" />
          <span className="ml-2 text-white">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  const statsData = [
    { name: 'Total Simulations', value: stats?.totalSimulations.toString() || '0', icon: Brain, color: 'text-blue-400' },
    { name: 'Avg. Confidence', value: `${stats?.avgConfidence || 0}%`, icon: TrendingUp, color: 'text-green-400' },
    { name: 'Processing Time', value: `${stats?.avgProcessingTime || 0}s`, icon: Clock, color: 'text-purple-400' },
    { name: 'Insights Generated', value: stats?.totalInsights.toString() || '0', icon: BarChart3, color: 'text-teal-400' },
  ];

  const categoryColors = {
    career: 'bg-blue-500/20 text-blue-400',
    education: 'bg-green-500/20 text-green-400',
    relationship: 'bg-pink-500/20 text-pink-400',
    location: 'bg-purple-500/20 text-purple-400',
    health: 'bg-red-500/20 text-red-400',
    finance: 'bg-yellow-500/20 text-yellow-400',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.profile?.full_name || user?.email?.split('@')[0]}
          </h1>
          <p className="text-gray-300">Track your alternate life explorations</p>
        </div>
        
        <Link
          to="/simulate"
          className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:scale-105 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Simulation</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {statsData.map((stat) => (
          <div key={stat.name} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.name}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Simulations */}
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Recent Simulations</h2>
        
        {!stats?.recentSimulations || stats.recentSimulations.length === 0 ? (
          <div className="text-center py-12">
            <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No simulations yet</h3>
            <p className="text-gray-300 mb-6">Start your first simulation to explore alternate life paths</p>
            <Link
              to="/simulate"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Create Your First Simulation
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {stats.recentSimulations.map((simulation) => (
              <div
                key={simulation.id}
                className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{simulation.title}</h3>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[simulation.category as keyof typeof categoryColors]}`}>
                        {simulation.category}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {new Date(simulation.createdAt).toLocaleDateString()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        simulation.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        simulation.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {simulation.status}
                      </span>
                    </div>
                  </div>
                  {simulation.status === 'completed' && (
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-400">
                        {Math.round(simulation.confidence * 100)}%
                      </div>
                      <div className="text-sm text-gray-400">confidence</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}