import React, { useState, useEffect } from 'react';
import { Clock, Zap, Crown, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function UrgencySection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-16 lg:py-20 bg-gradient-to-r from-orange-900/10 via-red-900/10 to-yellow-900/10 border-y border-orange-400/20">
      <div className="container-responsive text-center">
        <div className="inline-flex items-center space-x-2 accent-card rounded-full px-6 py-3 mb-8 lg:mb-12">
          <Zap className="h-5 w-5 text-orange-400" />
          <span className="text-orange-400 font-accent text-sm lg:text-base">
            LIMITED TIME OFFER
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-heading text-white mb-6 lg:mb-8">
          <span className="font-accent text-orange-400">⚡ FLASH SALE:</span>
          <span className="block accent-gradient mt-2">70% Off Premium Plans</span>
        </h2>

        <p className="text-lg lg:text-xl xl:text-2xl text-gray-300 mb-8 lg:mb-12 content-center">
          Don't let another day pass wondering "what if?" Join thousands who've already transformed
          their lives.
        </p>

        {/* Countdown Timer */}
        <Card className="accent-card mb-8 lg:mb-12 max-w-md mx-auto">
          <CardContent className="p-6 lg:p-8">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Clock className="h-5 w-5 text-orange-400" />
              <span className="text-orange-400 font-accent text-sm lg:text-base">
                OFFER EXPIRES IN:
              </span>
            </div>
            <div className="flex justify-center space-x-4 lg:space-x-6">
              <div className="text-center">
                <div className="text-xl lg:text-2xl xl:text-3xl font-accent text-white pro-card rounded-lg px-3 py-2 lg:px-4 lg:py-3">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-xs lg:text-sm text-gray-400 mt-1 font-accent-light">HOURS</div>
              </div>
              <div className="text-center">
                <div className="text-xl lg:text-2xl xl:text-3xl font-accent text-white pro-card rounded-lg px-3 py-2 lg:px-4 lg:py-3">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-xs lg:text-sm text-gray-400 mt-1 font-accent-light">
                  MINUTES
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl lg:text-2xl xl:text-3xl font-accent text-white pro-card rounded-lg px-3 py-2 lg:px-4 lg:py-3">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-xs lg:text-sm text-gray-400 mt-1 font-accent-light">
                  SECONDS
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing comparison */}
        <div className="flex justify-center items-center space-x-4 lg:space-x-6 mb-8 lg:mb-12">
          <div className="text-center">
            <div className="text-gray-400 line-through text-lg lg:text-xl font-accent-light">
              $24.99/MONTH
            </div>
            <div className="text-xs lg:text-sm text-gray-500 font-accent-light">REGULAR PRICE</div>
          </div>
          <ArrowRight className="h-6 w-6 lg:h-8 lg:w-8 text-orange-400" />
          <div className="text-center">
            <div className="text-2xl lg:text-3xl xl:text-4xl font-accent text-orange-400">
              $7.49/MONTH
            </div>
            <div className="text-xs lg:text-sm text-emerald-400 font-accent-light">70% OFF</div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 text-emerald-400 pro-card px-4 py-2 lg:px-6 lg:py-3 rounded-full">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm lg:text-base font-accent-light">UNLIMITED SIMULATIONS</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-orange-400 pro-card px-4 py-2 lg:px-6 lg:py-3 rounded-full">
            <Crown className="h-4 w-4" />
            <span className="text-sm lg:text-base font-accent-light">PREMIUM AI FEATURES</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-blue-400 pro-card px-4 py-2 lg:px-6 lg:py-3 rounded-full">
            <Zap className="h-4 w-4" />
            <span className="text-sm lg:text-base font-accent-light">PRIORITY SUPPORT</span>
          </div>
        </div>

        {/* CTA */}
        <Button
          size="lg"
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-accent px-8 lg:px-12 py-4 lg:py-6 text-lg lg:text-xl shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-105"
        >
          <Crown className="h-5 w-5 lg:h-6 lg:w-6 mr-2" />
          CLAIM 70% DISCOUNT NOW
          <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6 ml-2" />
        </Button>

        <p className="text-xs lg:text-sm text-gray-400 mt-4 lg:mt-6 font-accent-light">
          🔒 30-DAY MONEY-BACK GUARANTEE • CANCEL ANYTIME • NO HIDDEN FEES
        </p>
      </div>
    </div>
  );
}
