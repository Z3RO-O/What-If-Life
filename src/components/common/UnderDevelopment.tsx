import React from 'react';
import { Construction, Clock, ArrowLeft, Wrench, Code, Sparkles, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface UnderDevelopmentProps {
  type?: 'page' | 'component' | 'feature';
  name?: string;
  description?: string;
  estimatedCompletion?: string;
  showBackButton?: boolean;
}

export default function UnderDevelopment({
  type = 'page',
  name = 'This section',
  description,
  estimatedCompletion = 'Soon',
  showBackButton = true,
}: UnderDevelopmentProps) {
  const navigate = useNavigate();

  const getIcon = () => {
    switch (type) {
      case 'component':
        return Code;
      case 'feature':
        return Sparkles;
      default:
        return Construction;
    }
  };

  const Icon = getIcon();

  const getTitle = () => {
    switch (type) {
      case 'component':
        return `${name} Component`;
      case 'feature':
        return `${name} Feature`;
      default:
        return `${name} Page`;
    }
  };

  const getDefaultDescription = () => {
    switch (type) {
      case 'component':
        return `The ${name} component is currently being developed with cutting-edge technology to provide you with the best experience.`;
      case 'feature':
        return `The ${name} feature is being crafted with advanced AI capabilities to enhance your life simulation experience.`;
      default:
        return `The ${name} page is under active development. Our team is working hard to bring you an amazing experience.`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <Card className="glass border-amber-400/20">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                  <Icon className="h-10 w-10 text-amber-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center animate-bounce">
                  <Wrench className="h-3 w-3 text-slate-900" />
                </div>
              </div>
            </div>

            <CardTitle className="text-3xl font-heading text-white mb-2">
              {getTitle()} Under Development
            </CardTitle>

            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-2">
              <Clock className="h-4 w-4 text-amber-400" />
              <span className="text-amber-400 font-medium text-sm font-mono">
                Coming {estimatedCompletion}
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              {description || getDefaultDescription()}
            </p>

            {/* Progress indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass rounded-lg p-4 border border-emerald-400/20">
                <Brain className="h-6 w-6 text-emerald-400 mb-2" />
                <div className="text-sm font-medium text-white">AI Integration</div>
                <div className="text-xs text-gray-400 font-mono">In Progress</div>
              </div>
              <div className="glass rounded-lg p-4 border border-teal-400/20">
                <Code className="h-6 w-6 text-teal-400 mb-2" />
                <div className="text-sm font-medium text-white">Development</div>
                <div className="text-xs text-gray-400 font-mono">Active</div>
              </div>
              <div className="glass rounded-lg p-4 border border-cyan-400/20">
                <Zap className="h-6 w-6 text-cyan-400 mb-2" />
                <div className="text-sm font-medium text-white">Testing</div>
                <div className="text-xs text-gray-400 font-mono">Upcoming</div>
              </div>
            </div>

            {/* What to expect */}
            <div className="freemium-card rounded-lg p-6">
              <h3 className="text-lg font-heading text-white mb-3 flex items-center">
                <Sparkles className="h-5 w-5 text-emerald-400 mr-2" />
                What to Expect
              </h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Enhanced user experience with modern design
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Advanced AI-powered features and insights
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Seamless integration with existing functionality
                </li>
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {showBackButton && (
                <Button
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
              )}
              <Button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              >
                <Brain className="h-4 w-4 mr-2" />
                Return Home
              </Button>
            </div>

            {/* Newsletter signup */}
            <div className="border-t border-white/10 pt-6">
              <p className="text-gray-400 text-sm mb-4">Want to be notified when this is ready?</p>
              <div className="flex gap-2 max-w-sm mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 glass text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg"
                />
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Notify Me
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
