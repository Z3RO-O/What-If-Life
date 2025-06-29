import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  BarChart3,
  Brain,
  Calendar,
  Heart,
  Lock,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

export default function Features() {
  const freemiumFeatures = [
    {
      icon: Target,
      title: 'Decision Analysis',
      description:
        'Analyze life decisions with quantum AI to see potential outcomes and alternate paths with remarkable precision.',
      color: 'text-blue-400',
    },
    {
      icon: Users,
      title: 'Community Insights',
      description:
        'Learn from anonymized patterns of similar decisions made by our global community of visionaries.',
      color: 'text-emerald-400',
    },
    {
      icon: Shield,
      title: 'Privacy Protection',
      description:
        'Military-grade encryption ensures your personal data is never shared with third parties or compromised.',
      color: 'text-purple-400',
    },
    {
      icon: BarChart3,
      title: 'Timeline Visualization',
      description:
        'View interactive timeline projections of your alternate life paths in stunning detail and clarity.',
      color: 'text-pink-400',
    },
  ];

  const premiumFeatures = [
    {
      icon: TrendingUp,
      title: 'Career Modeling',
      description:
        'Deep analysis of career trajectories with salary projections, growth paths, and industry insights.',
      color: 'text-orange-400',
    },
    {
      icon: Heart,
      title: 'Relationship Analysis',
      description:
        'Understand how decisions affect relationships, social connections, and emotional well-being.',
      color: 'text-pink-400',
    },
    {
      icon: Calendar,
      title: 'Life Mapping',
      description:
        'Comprehensive life event predictions with precise timing, probabilities, and impact analysis.',
      color: 'text-blue-400',
    },
    {
      icon: Sparkles,
      title: 'AI Media Generation',
      description:
        'Generate photorealistic images and videos of your alternate life scenarios with quantum precision.',
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="py-section bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.02),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.02),transparent_50%)]" />
      </div>

      <div className="container-wide relative">
        <div className="text-center mb-20 lg:mb-28 content-center">
          <div className="inline-flex items-center space-x-3 glass rounded-full px-8 py-4 mb-12 lg:mb-16 white-glow">
            <Rocket className="h-6 w-6 text-white animate-bounce" />
            <span className="text-white font-accent text-base lg:text-lg">
              REVOLUTIONARY FEATURES
            </span>
            <Brain className="h-6 w-6 text-white animate-pulse" />
          </div>

          <h2 className="text-section font-display text-white mb-12 lg:mb-16 leading-tight">
            <span className="block mb-6 lg:mb-8">Start Free</span>
            <span className="block accent-gradient">Upgrade When Ready</span>
          </h2>
          <p className="text-large text-gray-300 content-center font-accent-light leading-relaxed">
            Begin your journey with powerful free features, then unlock advanced capabilities when
            you're ready to explore deeper realities.
          </p>
        </div>

        {/* Free Features Section */}
        <div className="mb-28 lg:mb-36">
          <h3 className="text-3xl lg:text-4xl xl:text-5xl font-accent emerald-gradient mb-16 lg:mb-20 text-center">
            🚀 FREE FOREVER FEATURES
          </h3>
          <div className="feature-grid">
            {freemiumFeatures.map((feature, index) => (
              <Card
                key={feature.title}
                className="feature-card group transition-all duration-500 hover:scale-105 transform"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="card-content-comfortable">
                  <div className="relative mb-8 lg:mb-10">
                    <feature.icon
                      className={`h-14 w-14 lg:h-16 lg:w-16 xl:h-20 xl:w-20 ${feature.color} group-hover:scale-110 transition-transform animate-float`}
                    />
                    <div className="absolute -top-3 -right-3 w-8 h-8 lg:w-10 lg:h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Star className="h-4 w-4 lg:h-5 lg:w-5 text-white fill-current" />
                    </div>
                  </div>
                  <h3 className="text-xl lg:text-2xl xl:text-3xl font-accent text-white mb-6 lg:mb-8">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-base lg:text-lg xl:text-xl leading-relaxed mb-6 lg:mb-8">
                    {feature.description}
                  </p>
                  <div className="mt-auto">
                    <span className="inline-flex items-center space-x-2 pro-card px-4 py-2 rounded-full text-sm lg:text-base font-accent">
                      <Star className="h-4 w-4 fill-current text-emerald-400" />
                      <span className="text-emerald-400">FREE</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Premium Features Section */}
        <div className="mb-28 lg:mb-36">
          <h3 className="text-3xl lg:text-4xl xl:text-5xl font-accent accent-gradient mb-16 lg:mb-20 text-center">
            ⚡ PREMIUM FEATURES
          </h3>
          <div className="feature-grid">
            {premiumFeatures.map((feature, index) => (
              <Card
                key={feature.title}
                className="feature-card group transition-all duration-500 hover:scale-105 transform relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="card-content-comfortable">
                  <div className="relative mb-8 lg:mb-10">
                    <feature.icon
                      className={`h-14 w-14 lg:h-16 lg:w-16 xl:h-20 xl:w-20 ${feature.color} group-hover:scale-110 transition-transform animate-float`}
                    />
                    <div className="absolute -top-3 -right-3 w-8 h-8 lg:w-10 lg:h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <Lock className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl lg:text-2xl xl:text-3xl font-accent text-white mb-6 lg:mb-8">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-base lg:text-lg xl:text-xl leading-relaxed mb-6 lg:mb-8">
                    {feature.description}
                  </p>
                  <div className="mt-auto">
                    <span className="inline-flex items-center space-x-2 accent-card px-4 py-2 rounded-full text-sm lg:text-base font-accent">
                      <Lock className="h-4 w-4 text-orange-400" />
                      <span className="text-orange-400">PREMIUM</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center content-center">
          <div className="accent-card rounded-3xl p-12 lg:p-16 xl:p-20 relative overflow-hidden">
            {/* Background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-glow" />

            <div className="relative">
              <Sparkles className="h-16 w-16 lg:h-20 lg:w-20 text-white mx-auto mb-8 lg:mb-12 animate-spin-slow" />
              <h3 className="text-3xl lg:text-4xl xl:text-5xl font-accent text-white mb-8 lg:mb-12">
                READY TO UNLOCK EVERYTHING?
              </h3>
              <p className="text-gray-300 mb-12 lg:mb-16 text-xl lg:text-2xl xl:text-3xl font-accent-light content-center leading-relaxed">
                Start with our revolutionary free features, then upgrade to premium for the complete
                multiverse experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center">
                <Button className="btn-primary text-xl lg:text-2xl px-12 py-6 transform hover:scale-105 transition-all duration-300">
                  <Rocket className="h-6 w-6 lg:h-7 lg:w-7 mr-3" />
                  START FREE
                </Button>
                <Button className="btn-accent text-xl lg:text-2xl px-12 py-6 transform hover:scale-105 transition-all duration-300">
                  <Zap className="h-6 w-6 lg:h-7 lg:w-7 mr-3" />
                  VIEW PREMIUM
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
