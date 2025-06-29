import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { APP_CONFIG } from '@/config/appConfig';
import {
  ArrowRight,
  Brain,
  CheckCircle,
  Clock,
  Linkedin,
  Mail,
  Play,
  Sparkles,
  Twitter,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function LaunchPage() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const launchDate = new Date(APP_CONFIG.LAUNCH_CONFIG.launchDate).getTime();
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEarlyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Early access signup:', email);
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Simulations',
      description:
        'Advanced neural networks analyze your decisions to create accurate life predictions',
    },
    {
      icon: Sparkles,
      title: 'Infinite Possibilities',
      description: 'Explore unlimited alternate timelines based on different life choices',
    },
    {
      icon: Zap,
      title: 'Instant Insights',
      description: 'Get personalized recommendations to optimize your future decisions',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '4s' }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-emerald-400" />
            <span className="text-xl font-heading text-white">
              {APP_CONFIG.LAUNCH_CONFIG.title}
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Coming Soon Badge */}
            <div className="inline-flex items-center space-x-2 freemium-card rounded-full px-4 py-2 mb-8">
              <Zap className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400 font-medium text-sm">Coming Soon</span>
              <Sparkles className="h-4 w-4 text-emerald-400" />
            </div>

            {/* Hero Section */}
            <h1 className="text-5xl md:text-7xl font-heading text-white mb-6 leading-tight">
              {APP_CONFIG.LAUNCH_CONFIG.subtitle}
              <span className="block gradient-text">Awaits Discovery</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {APP_CONFIG.LAUNCH_CONFIG.description}
            </p>

            {/* Countdown Timer */}
            <Card className="glass border-emerald-400/20 mb-12 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center justify-center space-x-2 mb-6">
                  <Clock className="h-5 w-5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium font-mono">Launch Countdown</span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hours', value: timeLeft.hours },
                    { label: 'Minutes', value: timeLeft.minutes },
                    { label: 'Seconds', value: timeLeft.seconds },
                  ].map(item => (
                    <div key={item.label} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold font-mono text-white freemium-card rounded-lg py-4 mb-2">
                        {item.value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm text-gray-400">{item.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Early Access Form */}
            {APP_CONFIG.LAUNCH_CONFIG.earlyAccessEnabled && (
              <Card className="freemium-card mb-12 max-w-md mx-auto">
                <CardContent className="p-6">
                  <Play className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-xl font-heading text-white mb-2">Get Early Access</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Be among the first to explore your alternate life paths
                  </p>

                  {!isSubscribed ? (
                    <form onSubmit={handleEarlyAccess} className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="glass text-white placeholder-gray-400"
                        required
                      />
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Join Waitlist
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center">
                      <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto mb-3" />
                      <h4 className="text-lg font-semibold text-white mb-2">You're In!</h4>
                      <p className="text-gray-300 text-sm">
                        We'll notify you as soon as we launch. Get ready to discover your infinite
                        potential!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {features.map((feature, index) => (
                <Card
                  key={feature.title}
                  className="glass glass-hover transition-all duration-300"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardContent className="p-6 text-center">
                    <feature.icon className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-lg font-heading text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6">
              <a
                href={APP_CONFIG.LAUNCH_CONFIG.socialLinks.twitter}
                className="text-gray-400 hover:text-emerald-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href={APP_CONFIG.LAUNCH_CONFIG.socialLinks.linkedin}
                className="text-gray-400 hover:text-teal-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href={`mailto:${APP_CONFIG.LAUNCH_CONFIG.socialLinks.email}`}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center">
          <p className="text-gray-400 text-sm font-mono">
            © 2025 {APP_CONFIG.LAUNCH_CONFIG.title}. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
