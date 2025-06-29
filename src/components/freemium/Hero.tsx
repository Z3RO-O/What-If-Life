import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Clock, Zap, Star, Sparkles, Play, Rocket, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-black">
      {/* Subtle background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_49%,rgba(255,255,255,0.01)_50%,transparent_51%)] bg-[length:20px_20px]" />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-float" />
        <div
          className="absolute top-40 right-32 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-float"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-32 left-1/3 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '4s' }}
        />
        <div
          className="absolute bottom-20 right-20 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl animate-float"
          style={{ animationDelay: '6s' }}
        />
      </div>

      <div className="container-wide py-section relative">
        <div className="text-center content-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 mb-8 lg:mb-12 white-glow">
            <Sparkles className="h-5 w-5 text-white animate-pulse" />
            <span className="text-white font-accent text-sm lg:text-base">
              AI-POWERED LIFE SIMULATION
            </span>
            <Rocket className="h-5 w-5 text-white" />
          </div>

          {/* Main heading */}
          <h1 className="text-hero font-display text-white mb-8 lg:mb-12 leading-tight tracking-tight">
            <span className="block mb-4 lg:mb-6">Discover Your</span>
            <span className="block accent-gradient animate-fade-in">Infinite Potential</span>
          </h1>

          {/* Subtitle */}
          <p className="text-large text-gray-300 mb-8 lg:mb-12 content-center leading-relaxed font-accent-light">
            What if you had chosen differently? Our revolutionary AI reveals the extraordinary paths
            your life could have taken with stunning precision.
          </p>

          {/* Value propositions */}
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mb-12 lg:mb-16">
            <div className="flex items-center space-x-2 pro-card px-4 py-2 lg:px-6 lg:py-3 rounded-full">
              <Star className="h-4 w-4 lg:h-5 lg:w-5 text-emerald-400 fill-current" />
              <span className="font-accent text-emerald-400 text-sm lg:text-base">
                FREE FOREVER
              </span>
            </div>
            <div className="flex items-center space-x-2 pro-card px-4 py-2 lg:px-6 lg:py-3 rounded-full">
              <Brain className="h-4 w-4 lg:h-5 lg:w-5 text-blue-400" />
              <span className="font-accent text-blue-400 text-sm lg:text-base">99.7% ACCURATE</span>
            </div>
            <div className="flex items-center space-x-2 pro-card px-4 py-2 lg:px-6 lg:py-3 rounded-full">
              <Zap className="h-4 w-4 lg:h-5 lg:w-5 text-purple-400" />
              <span className="font-accent text-purple-400 text-sm lg:text-base">
                INSTANT RESULTS
              </span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center mb-12 lg:mb-16">
            <Button asChild className="btn-primary text-lg lg:text-xl group">
              <Link to="/simulate">
                <Play className="h-5 w-5 lg:h-6 lg:w-6 mr-3" />
                <span>Start Free Simulation</span>
                <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button asChild className="btn-secondary text-lg lg:text-xl">
              <Link to="/pricing">View Premium Features</Link>
            </Button>
          </div>

          {/* Social proof */}
          <div className="text-center mb-16 lg:mb-20">
            <p className="text-gray-400 text-sm lg:text-base mb-4 font-accent-light">
              TRUSTED BY 50,000+ VISIONARIES WORLDWIDE
            </p>
            <div className="flex justify-center items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-yellow-400 text-lg lg:text-xl ml-3 font-mono font-bold">
                4.9/5
              </span>
              <span className="text-gray-400 text-sm lg:text-base ml-2">• 2.5M+ Simulations</span>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid-features content-wide">
            <Card className="feature-card group transform hover:scale-105 transition-all duration-500">
              <CardContent className="p-6 lg:p-8 xl:p-10 text-center">
                <div className="relative mb-6 lg:mb-8">
                  <Brain className="h-12 w-12 lg:h-16 lg:w-16 xl:h-20 xl:w-20 text-white mb-4 mx-auto group-hover:scale-110 transition-transform animate-float" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 lg:w-8 lg:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Sparkles className="h-3 w-3 lg:h-4 lg:w-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl lg:text-2xl xl:text-3xl font-accent text-white mb-4 lg:mb-6">
                  QUANTUM AI
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm lg:text-base xl:text-lg">
                  Advanced neural networks analyze infinite decision paths to predict your alternate
                  realities with unprecedented precision.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card group transform hover:scale-105 transition-all duration-500">
              <CardContent className="p-6 lg:p-8 xl:p-10 text-center">
                <div className="relative mb-6 lg:mb-8">
                  <Clock
                    className="h-12 w-12 lg:h-16 lg:w-16 xl:h-20 xl:w-20 text-white mb-4 mx-auto group-hover:scale-110 transition-transform animate-float"
                    style={{ animationDelay: '1s' }}
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 lg:w-8 lg:h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <Star className="h-3 w-3 lg:h-4 lg:w-4 text-white fill-current" />
                  </div>
                </div>
                <h3 className="text-xl lg:text-2xl xl:text-3xl font-accent text-white mb-4 lg:mb-6">
                  TIME EXPLORER
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm lg:text-base xl:text-lg">
                  Navigate through immersive timelines that reveal exactly how your life unfolds
                  across multiple dimensions.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card group transform hover:scale-105 transition-all duration-500">
              <CardContent className="p-6 lg:p-8 xl:p-10 text-center">
                <div className="relative mb-6 lg:mb-8">
                  <Zap
                    className="h-12 w-12 lg:h-16 lg:w-16 xl:h-20 xl:w-20 text-white mb-4 mx-auto group-hover:scale-110 transition-transform animate-float"
                    style={{ animationDelay: '2s' }}
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 lg:w-8 lg:h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Play className="h-3 w-3 lg:h-4 lg:w-4 text-white fill-current" />
                  </div>
                </div>
                <h3 className="text-xl lg:text-2xl xl:text-3xl font-accent text-white mb-4 lg:mb-6">
                  INSTANT INSIGHTS
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm lg:text-base xl:text-lg">
                  Receive personalized recommendations to optimize your future and unlock your
                  maximum potential.
                </p>
              </CardContent>
            </Card>

            {/* Additional card for larger screens */}
            <Card className="feature-card group transform hover:scale-105 transition-all duration-500 hidden 2xl:block">
              <CardContent className="p-6 lg:p-8 xl:p-10 text-center">
                <div className="relative mb-6 lg:mb-8">
                  <Shield
                    className="h-12 w-12 lg:h-16 lg:w-16 xl:h-20 xl:w-20 text-white mb-4 mx-auto group-hover:scale-110 transition-transform animate-float"
                    style={{ animationDelay: '3s' }}
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 lg:w-8 lg:h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Shield className="h-3 w-3 lg:h-4 lg:w-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl lg:text-2xl xl:text-3xl font-accent text-white mb-4 lg:mb-6">
                  SECURE & PRIVATE
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm lg:text-base xl:text-lg">
                  Military-grade encryption ensures your personal data remains completely private
                  and secure.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
