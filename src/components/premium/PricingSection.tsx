import React from 'react';
import { Check, Crown, Zap, Star, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PricingSection() {
  const plans = [
    {
      name: 'Explorer',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '3 life simulations per month',
        'Basic timeline visualization',
        'Community insights',
        'Email support',
        'Mobile app access',
      ],
      buttonText: 'Start Free',
      buttonVariant: 'outline' as const,
      popular: false,
      cardClass: 'feature-card',
    },
    {
      name: 'Visionary',
      price: '$19.99',
      period: '/month',
      description: 'Most popular choice',
      features: [
        'Unlimited life simulations',
        'Advanced timeline visualization',
        'Premium AI insights & recommendations',
        'AI-generated media content',
        'Priority support',
        'Export & sharing features',
        'Advanced analytics dashboard',
      ],
      buttonText: 'Upgrade to Premium',
      buttonVariant: 'default' as const,
      popular: true,
      savings: 'Save 40%',
      cardClass: 'accent-card',
    },
    {
      name: 'Mastermind',
      price: '$39.99',
      period: '/month',
      description: 'For serious life optimizers',
      features: [
        'Everything in Visionary',
        'Custom AI model training',
        'White-label simulations',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'Enterprise security',
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'outline' as const,
      popular: false,
      cardClass: 'pro-card',
    },
  ];

  return (
    <div className="py-section bg-black">
      <div className="container-wide">
        <div className="text-center mb-16 lg:mb-20 content-center">
          <div className="inline-flex items-center space-x-2 accent-card rounded-full px-6 py-3 mb-8 lg:mb-12">
            <Crown className="h-5 w-5 text-orange-400" />
            <span className="text-orange-400 font-accent text-sm lg:text-base">
              LIMITED TIME - 40% OFF PREMIUM
            </span>
          </div>

          <h2 className="text-section font-display text-white mb-8 lg:mb-12">
            <span className="block mb-4 lg:mb-6">Choose Your</span>
            <span className="block accent-gradient">Journey Plan</span>
          </h2>
          <p className="text-large text-gray-300 content-center font-accent-light">
            Start free and upgrade when you're ready to unlock your full potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative ${plan.cardClass} ${
                plan.popular ? 'scale-105 shadow-2xl white-glow' : 'hover:scale-105'
              } glass-hover transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-1 rounded-full text-sm font-accent flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-current" />
                    <span>MOST POPULAR</span>
                  </div>
                </div>
              )}

              {plan.savings && (
                <div className="absolute -top-2 -right-2">
                  <div className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-accent-light">
                    {plan.savings}
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl lg:text-2xl font-accent text-white mb-2">
                  {plan.name}
                </CardTitle>
                <p className="text-gray-400 mb-4 font-accent-light">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span
                    className={`text-3xl lg:text-4xl font-accent font-mono ${
                      plan.popular
                        ? 'text-orange-400'
                        : plan.price === 'Free'
                          ? 'text-emerald-400'
                          : 'text-white'
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span className="text-gray-400 ml-1 font-mono text-sm lg:text-base">
                    {plan.period}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check
                        className={`h-5 w-5 mt-0.5 ${
                          plan.popular
                            ? 'text-orange-400'
                            : plan.price === 'Free'
                              ? 'text-emerald-400'
                              : 'text-blue-400'
                        } flex-shrink-0`}
                      />
                      <span className="text-gray-300 text-sm lg:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full py-3 lg:py-4 font-accent transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg'
                      : plan.price === 'Free'
                        ? 'btn-primary'
                        : 'btn-secondary'
                  }`}
                  variant={plan.popular || plan.price === 'Free' ? 'default' : plan.buttonVariant}
                >
                  {plan.popular && <Crown className="h-4 w-4 mr-2" />}
                  {plan.price === 'Free' && <Sparkles className="h-4 w-4 mr-2" />}
                  {plan.buttonText}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>

                {plan.popular && (
                  <div className="text-center">
                    <p className="text-xs lg:text-sm text-orange-400 font-accent-light">
                      🔥 5,000+ USERS UPGRADED THIS MONTH
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Money-back guarantee */}
        <div className="text-center mt-12 lg:mt-16">
          <div className="inline-flex items-center space-x-2 pro-card rounded-full px-6 py-3">
            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
              <Check className="h-4 w-4 text-white" />
            </div>
            <span className="text-emerald-400 font-accent-light text-sm lg:text-base">
              30-DAY MONEY-BACK GUARANTEE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
