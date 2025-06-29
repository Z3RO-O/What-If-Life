import React from 'react';
import { Star, Quote, Crown, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Tech Executive',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'This platform completely changed how I make decisions. Seeing my alternate career path made me realize I was on the wrong track. I switched to product management and doubled my salary within a year.',
      rating: 5,
      verified: true,
      impact: '+$85k salary increase'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Entrepreneur',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'The relationship insights were mind-blowing. I saw how my communication style was affecting my marriage. The AI recommendations helped me save my relationship and we\'re happier than ever.',
      rating: 5,
      verified: true,
      impact: 'Saved marriage'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Medical Professional',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'As a scientist, I was skeptical. But the accuracy is incredible. The simulation showed me pursuing research instead of clinical practice, and it aligned perfectly with my true passions.',
      rating: 5,
      verified: true,
      impact: 'Found true calling'
    },
    {
      name: 'James Thompson',
      role: 'Investment Banker',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'The financial projections were spot-on. I saw how my investment decisions would play out over 20 years. Changed my strategy and I\'m already seeing 40% better returns.',
      rating: 5,
      verified: true,
      impact: '+40% ROI improvement'
    },
    {
      name: 'Lisa Park',
      role: 'Creative Director',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'The creative insights helped me understand my artistic journey. I saw how different choices would have led to different creative expressions. It inspired my best work yet.',
      rating: 5,
      verified: true,
      impact: 'Creative breakthrough'
    },
    {
      name: 'David Kim',
      role: 'Software Engineer',
      avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'This is the future of decision-making. The AI showed me how my location choices affected my career. I relocated and landed my dream job at a top tech company.',
      rating: 5,
      verified: true,
      impact: 'Dream job achieved'
    }
  ];

  return (
    <div className="py-section bg-black">
      <div className="container-wide">
        <div className="text-center mb-20 lg:mb-28 content-center">
          <div className="inline-flex items-center space-x-3 glass rounded-full px-8 py-4 mb-12 lg:mb-16 white-glow">
            <Star className="h-6 w-6 text-emerald-400 fill-current" />
            <span className="text-emerald-400 font-accent text-base lg:text-lg">50,000+ SUCCESS STORIES</span>
          </div>
          
          <h2 className="text-section font-display text-white mb-12 lg:mb-16">
            <span className="block mb-6 lg:mb-8">Real People</span>
            <span className="block accent-gradient">
              Real Transformations
            </span>
          </h2>
          <p className="text-large text-gray-300 content-center font-accent-light leading-relaxed">
            See how our AI-powered life simulations have helped thousands of people make better decisions and transform their lives.
          </p>
        </div>

        <div className="testimonial-grid mb-20 lg:mb-28">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="feature-card glass-hover transition-all duration-300 hover:scale-105 h-full"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="card-content-comfortable h-full flex flex-col">
                <div className="flex items-start space-x-4 lg:space-x-6 mb-8">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover ring-2 ring-white/20"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-accent-light text-white text-lg lg:text-xl">{testimonial.name}</h4>
                      {testimonial.verified && (
                        <div className="bg-emerald-500 rounded-full p-1">
                          <Crown className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm lg:text-base font-accent-light">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                <Quote className="h-8 w-8 lg:h-10 lg:w-10 text-gray-400 mb-6" />
                <p className="text-gray-300 text-base lg:text-lg xl:text-xl leading-relaxed mb-8 flex-grow">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center space-x-3 pro-card rounded-full px-4 py-3 mt-auto">
                  <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5 text-emerald-400" />
                  <span className="text-emerald-400 text-sm lg:text-base font-accent-light">{testimonial.impact}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social proof stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 xl:gap-16 text-center">
          <div className="pro-card p-8 lg:p-10 xl:p-12 rounded-xl">
            <div className="text-3xl lg:text-4xl xl:text-5xl font-accent text-emerald-400 mb-4">50,000+</div>
            <div className="text-gray-400 font-accent-light text-base lg:text-lg">ACTIVE USERS</div>
          </div>
          <div className="pro-card p-8 lg:p-10 xl:p-12 rounded-xl">
            <div className="text-3xl lg:text-4xl xl:text-5xl font-accent text-blue-400 mb-4">99.7%</div>
            <div className="text-gray-400 font-accent-light text-base lg:text-lg">ACCURACY RATE</div>
          </div>
          <div className="pro-card p-8 lg:p-10 xl:p-12 rounded-xl">
            <div className="text-3xl lg:text-4xl xl:text-5xl font-accent text-purple-400 mb-4">2.5M+</div>
            <div className="text-gray-400 font-accent-light text-base lg:text-lg">SIMULATIONS RUN</div>
          </div>
          <div className="pro-card p-8 lg:p-10 xl:p-12 rounded-xl">
            <div className="text-3xl lg:text-4xl xl:text-5xl font-accent text-yellow-400 mb-4">4.9/5</div>
            <div className="text-gray-400 font-accent-light text-base lg:text-lg">USER RATING</div>
          </div>
        </div>
      </div>
    </div>
  );
}