import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/common/AuthModal';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const location = useLocation();
  const { user, signOut, isAuthenticated } = useAuth();

  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    {
      name: 'Dashboard',
      href: '/dashboard',
      current: location.pathname === '/dashboard',
      requiresAuth: true,
    },
    {
      name: 'Simulate',
      href: '/simulate',
      current: location.pathname === '/simulate',
      requiresAuth: true,
    },
  ];

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const filteredNavigation = navigation.filter(item => !item.requiresAuth || isAuthenticated);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <nav className="glass border-b border-gray-800 sticky top-0 z-50 backdrop-blur-xl">
        <div className="container-responsive">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Brain className="h-8 w-8 lg:h-10 lg:w-10 text-white group-hover:text-gray-200 transition-colors" />
                <div className="absolute inset-0 bg-white/10 rounded-full blur-lg group-hover:bg-white/20 transition-all" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg lg:text-xl font-accent text-white group-hover:scale-105 transition-transform">
                  WHAT IF?
                </span>
                <span className="text-xs font-accent-light text-gray-400 -mt-1 tracking-wider">
                  LIFE
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {filteredNavigation.map(item => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm lg:text-base font-accent-light transition-all duration-300 ${
                    item.current
                      ? 'bg-white text-black shadow-lg transform scale-105'
                      : 'text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10 ring-2 ring-white/20 hover:ring-white/40 transition-all">
                        <AvatarImage
                          src={user?.profile?.avatar_url || ''}
                          alt={user?.profile?.full_name || ''}
                        />
                        <AvatarFallback className="bg-gray-800 text-white font-accent">
                          {user?.profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 glass border-gray-700 backdrop-blur-xl"
                    align="end"
                    forceMount
                  >
                    <div className="flex items-center justify-start gap-2 p-3">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-accent-light text-white">
                          {user?.profile?.full_name || 'User'}
                        </p>
                        <p className="w-[200px] truncate text-sm text-gray-400">{user?.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem
                      asChild
                      className="text-gray-300 hover:text-white hover:bg-gray-800/50"
                    >
                      <Link to="/dashboard">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={signOut}
                      className="text-gray-300 hover:text-white hover:bg-gray-800/50 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleAuthClick('signin')}
                    className="text-gray-300 hover:text-white hover:bg-white/10 font-accent-light"
                  >
                    Sign In
                  </Button>
                  <Button onClick={() => handleAuthClick('signup')} className="btn-primary">
                    SIGN UP
                  </Button>
                </div>
              )}
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden glass backdrop-blur-xl border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {filteredNavigation.map(item => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-accent-light transition-colors ${
                    item.current
                      ? 'bg-white text-black'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {!isAuthenticated && (
                <div className="px-3 py-2 space-y-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleAuthClick('signin');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start text-gray-300 hover:text-white font-accent-light"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      handleAuthClick('signup');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full btn-primary"
                  >
                    SIGN UP
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">{children}</main>

      <Footer />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}
