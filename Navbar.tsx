
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, BookOpen, Compass, Archive, LogIn, LogOut, Menu, X, Coffee, Info, LineChart, Calendar } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import AnimatedTransition from './AnimatedTransition';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navItems = [{
    name: 'Journal',
    path: '/',
    icon: <BookOpen className="w-5 h-5" />
  }, {
    name: 'Meditations',
    path: '/meditations',
    icon: <Compass className="w-5 h-5" />
  }, {
    name: 'Archive',
    path: '/archive',
    icon: <Archive className="w-5 h-5" />
  }, {
    name: 'Insights',
    path: '/insights',
    icon: <LineChart className="w-5 h-5" />
  }, {
    name: '12-Week Year',
    path: '/twelve-week',
    icon: <Calendar className="w-5 h-5" />
  }];

  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", 
    scrolled ? "py-2 bg-white/80 backdrop-blur-md shadow-sm border-b border-amber-100" : "py-4 bg-transparent")}>
      <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between">
        <AnimatedTransition delay={100}>
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-medium text-amber-800">enfocus: <span className="text-emerald-700">align your intentions</span></span>
          </Link>
        </AnimatedTransition>
        
        <AnimatedTransition delay={200} className="flex items-center space-x-4">
          <nav className="hidden sm:flex items-center space-x-1">
            {navItems.map(item => <Link key={item.path} to={item.path} className={cn(
              "px-3 py-2 rounded-lg text-sm font-medium transition-colors", 
              location.pathname === item.path 
                ? "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800" 
                : "text-gray-600 hover:text-amber-700 hover:bg-amber-50/50"
            )}>
                <span className="flex items-center space-x-1.5">
                  {item.icon}
                  <span>{item.name}</span>
                </span>
              </Link>)}
          </nav>
          
          <div className="hidden sm:flex items-center space-x-2">
            <Button variant="outline" size="sm" asChild className="flex items-center gap-1 bg-[#FF5E5B] text-white hover:bg-[#FF5E5B]/90 border-[#FF5E5B]">
              <a href="https://ko-fi.com/48axiom" target="_blank" rel="noopener noreferrer">
                <Coffee className="w-4 h-4" />
                <span>Support</span>
              </a>
            </Button>
            
            {user ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={signOut} 
                className="flex items-center gap-1 border-amber-300 text-amber-800 hover:bg-amber-50"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                asChild
                className="flex items-center gap-1 border-amber-300 text-amber-800 hover:bg-amber-50"
              >
                <Link to="/auth">
                  <LogIn className="w-4 h-4" />
                  <span>Log in (Optional)</span>
                </Link>
              </Button>
            )}
          </div>
          
          <div className="flex sm:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-amber-700">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="border-l-amber-200">
                <SheetHeader>
                  <SheetTitle className="text-amber-800">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map(item => <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)} className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors", 
                    location.pathname === item.path 
                      ? "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800" 
                      : "text-gray-600 hover:text-amber-700 hover:bg-amber-50/50"
                  )}>
                      <span className="flex items-center space-x-1.5">
                        {item.icon}
                        <span>{item.name}</span>
                      </span>
                    </Link>)}
                  
                  <a href="https://ko-fi.com/48axiom" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-lg text-sm font-medium bg-[#FF5E5B] text-white flex items-center space-x-1.5" onClick={() => setMobileMenuOpen(false)}>
                    <Coffee className="w-5 h-5" />
                    <span>Support on Ko-fi</span>
                  </a>
                  
                  {user ? (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }} 
                      className="mt-4 w-full justify-start border-amber-300 text-amber-800 hover:bg-amber-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Sign out</span>
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="mt-4 w-full justify-start border-amber-300 text-amber-800 hover:bg-amber-50"
                      asChild
                    >
                      <Link to="/auth">
                        <LogIn className="w-4 h-4 mr-2" />
                        <span>Log in (Optional)</span>
                      </Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </AnimatedTransition>
      </div>
    </header>;
};

export default Navbar;
