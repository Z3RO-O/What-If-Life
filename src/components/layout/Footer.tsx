import {
  ArrowRight,
  Brain,
  Github,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Shield,
  Star,
  Twitter,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '/#features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Simulations', href: '/simulate' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '#' },
      { name: 'Press Kit', href: '#' },
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'Community', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'License', href: '#' },
    ],
  };

  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://x.com/vaibhavsngh0',
      icon: Twitter,
      color: 'hover:text-blue-400',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/vvaibhavsingh',
      icon: Linkedin,
      color: 'hover:text-purple-400',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Z3RO-O',
      icon: Github,
      color: 'hover:text-gray-300',
    },
  ];

  return (
    <footer className="bg-gray-900/50 border-t border-gray-800 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/2 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Brand Section */}
            <div className="lg:col-span-5 xl:col-span-4">
              <Link to="/" className="flex items-center space-x-4 mb-8 group">
                <div className="relative">
                  <Brain className="h-10 w-10 lg:h-12 lg:w-12 text-white group-hover:text-gray-200 transition-colors" />
                  <div className="absolute inset-0 bg-white/10 rounded-full blur-lg group-hover:bg-white/20 transition-all" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl lg:text-2xl font-accent text-white group-hover:scale-105 transition-transform">
                    PATHS
                  </span>
                  <span className="text-sm font-accent-light text-gray-400 -mt-1 tracking-wider">
                    NOT TAKEN
                  </span>
                </div>
              </Link>

              <p className="text-gray-300 mb-8 leading-relaxed text-base lg:text-lg font-accent-light">
                Revolutionary AI-powered life simulation platform. Discover the extraordinary paths
                your life could have taken with quantum-level precision.
              </p>

              {/* Key Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 text-blue-400">
                  <Shield className="h-5 w-5" />
                  <span className="font-accent-light text-sm lg:text-base">
                    QUANTUM-GRADE SECURITY
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-purple-400">
                  <Zap className="h-5 w-5" />
                  <span className="font-accent-light text-sm lg:text-base">99.7% AI ACCURACY</span>
                </div>
                <div className="flex items-center space-x-3 text-emerald-400">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="font-accent-light text-sm lg:text-base">
                    50,000+ VISIONARIES
                  </span>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="pro-card p-6 lg:p-8 rounded-xl">
                <h4 className="font-accent text-white text-lg lg:text-xl mb-4 lg:mb-6 flex items-center">
                  <Rocket className="h-5 w-5 mr-2 text-blue-400" />
                  STAY UPDATED
                </h4>
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 glass text-white placeholder-gray-400 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg font-accent-light"
                  />
                  <button className="btn-primary px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
                {/* Product */}
                <div>
                  <h3 className="font-accent text-blue-400 text-lg lg:text-xl mb-6 lg:mb-8">
                    PRODUCT
                  </h3>
                  <ul className="space-y-4">
                    {footerLinks.product.map(link => (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="text-gray-400 hover:text-blue-400 transition-colors text-sm lg:text-base font-accent-light hover:translate-x-1 transform duration-200 inline-block"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h3 className="font-accent text-purple-400 text-lg lg:text-xl mb-6 lg:mb-8">
                    COMPANY
                  </h3>
                  <ul className="space-y-4">
                    {footerLinks.company.map(link => (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="text-gray-400 hover:text-purple-400 transition-colors text-sm lg:text-base font-accent-light hover:translate-x-1 transform duration-200 inline-block"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="font-accent text-emerald-400 text-lg lg:text-xl mb-6 lg:mb-8">
                    RESOURCES
                  </h3>
                  <ul className="space-y-4">
                    {footerLinks.resources.map(link => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-emerald-400 transition-colors text-sm lg:text-base font-accent-light hover:translate-x-1 transform duration-200 inline-block"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal */}
                <div>
                  <h3 className="font-accent text-orange-400 text-lg lg:text-xl mb-6 lg:mb-8">
                    LEGAL
                  </h3>
                  <ul className="space-y-4">
                    {footerLinks.legal.map(link => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-orange-400 transition-colors text-sm lg:text-base font-accent-light hover:translate-x-1 transform duration-200 inline-block"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-8 lg:py-12 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="font-accent text-white text-lg lg:text-xl mb-6 lg:mb-8">
                GET IN TOUCH
              </h3>
              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-center space-x-4 text-gray-400 group">
                  <Mail className="h-5 w-5 text-blue-400 group-hover:animate-bounce" />
                  <a
                    href="mailto:hello@pathsnottaken.com"
                    className="hover:text-blue-400 transition-colors font-accent-light text-sm lg:text-base"
                  >
                    hello@pathsnottaken.com
                  </a>
                </div>
                <div className="flex items-center space-x-4 text-gray-400 group">
                  <Phone className="h-5 w-5 text-purple-400 group-hover:animate-bounce" />
                  <span className="font-accent-light text-sm lg:text-base">+91 9876543210</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-400 group">
                  <MapPin className="h-5 w-5 text-emerald-400 group-hover:animate-bounce" />
                  <span className="font-accent-light text-sm lg:text-base">Unnao, India</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-accent text-white text-lg lg:text-xl mb-6 lg:mb-8">FOLLOW US</h3>
              <div className="flex space-x-4 lg:space-x-6">
                {socialLinks.map(social => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 lg:w-14 lg:h-14 pro-card rounded-xl flex items-center justify-center text-gray-400 ${social.color} hover:bg-white/10 transition-all duration-300 group transform hover:scale-110`}
                  >
                    <social.icon className="h-6 w-6 lg:h-7 lg:w-7 group-hover:animate-pulse" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 lg:py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-gray-400 text-sm lg:text-base">
              <span className="font-accent-light">© {currentYear} Paths Not Taken, Inc.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center space-x-2 font-accent-light">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-pink-400 fill-current animate-pulse" />
                <span>in India</span>
              </span>
            </div>

            <div className="flex items-center space-x-6 text-sm lg:text-base">
              <span className="text-gray-400 font-accent">POWERED BY SOME AI</span>
              <div className="flex items-center space-x-2 pro-card px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 font-accent text-xs lg:text-sm">ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
