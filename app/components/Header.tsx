"use client";
import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, Search, User, Menu, X, ChevronDown, Sparkles, Star, Gem, Crown, Zap, Cloud, Clock, LogOut, Settings, Loader2, Home, Package, Layers, Mail, Heart, Bell, Sun, Moon, LogIn } from 'lucide-react';
import { useCart } from '../lib/cart-context';
import { useAuth } from '../lib/auth-context';
import { productService, Product } from '../services/productService';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: string;
  profileImage?: string;
}

interface SearchProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
  slug?: string;
}

// Modern navigation items with larger sizing
const NAVIGATION_ITEMS = [
  { 
    name: 'Home', 
    href: '/', 
    icon: Home,
    description: 'Modern luxury',
    color: 'bg-gradient-to-r from-blue-500 to-cyan-400',
    accentColor: 'text-blue-400'
  },
  { 
    name: 'Products', 
    href: '/Product', 
    icon: Package,
    description: 'Premium collection',
    color: 'bg-gradient-to-r from-purple-500 to-pink-400',
    accentColor: 'text-purple-400'
  },
  { 
    name: 'Categories', 
    href: '/categories', 
    icon: Layers,
    description: 'Curated styles',
    color: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    accentColor: 'text-emerald-400'
  },
  { 
    name: 'Contact', 
    href: '/contact', 
    icon: Mail,
    description: 'Get in touch',
    color: 'bg-gradient-to-r from-amber-500 to-orange-400',
    accentColor: 'text-amber-400'
  },
];

// Site metadata
const SITE_METADATA = {
  name: 'RS-LEGACY',
  description: 'Modern Luxury & Premium Fashion',
  tagline: 'Elevated Style'
};

// Memoized Skeleton Loader with proper sizing
const HeaderSkeleton = memo(() => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
      <div className="flex justify-between items-center h-20">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-xl animate-pulse" />
          <div className="hidden sm:flex flex-col">
            <div className="h-8 w-32 bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse mt-2" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-slate-800 rounded-full animate-pulse" />
          <div className="w-12 h-12 bg-slate-800 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  </header>
));

HeaderSkeleton.displayName = 'HeaderSkeleton';

export default function Header() {
  const { state } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();
  
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  
  // Enhanced Search States
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  // Performance optimization
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Refs
  const searchRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Modern refs
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const actionButtonsRef = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);
  const underlineRef = useRef<HTMLDivElement>(null);
  const glassEffectRef = useRef<HTMLDivElement>(null);
  const magneticRefs = useRef<(HTMLButtonElement | HTMLAnchorElement)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  // Initialize client-side
  useEffect(() => {
    setIsClient(true);
    setHasLoaded(true);
    
    // Modern cursor effect
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out"
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Floating elements animation
    if (floatingElementsRef.current) {
      const elements = floatingElementsRef.current.children;
      Array.from(elements).forEach((el, i) => {
        gsap.to(el, {
          y: gsap.utils.random(-10, 10),
          rotation: gsap.utils.random(-5, 5),
          duration: gsap.utils.random(2, 4),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3
        });
      });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Modern GSAP animations with ScrollTrigger
  useEffect(() => {
    if (!isClient || !hasLoaded) return;

    const ctx = gsap.context(() => {
      // Header entrance with modern slide-in
      gsap.fromTo(headerRef.current,
        { 
          y: -100, 
          opacity: 0,
          scale: 0.98 
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2
        }
      );

      // Logo animation with modern effects
      gsap.fromTo(logoRef.current,
        { 
          scale: 0.8, 
          opacity: 0,
          filter: "blur(10px)" 
        },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "elastic.out(1.2, 0.5)",
          delay: 0.4
        }
      );

      // Scroll-triggered header transformation
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          
          // Modern header effects based on scroll
          if (headerRef.current) {
            const blurAmount = 8 + progress * 8;
            const yOffset = progress * -5;
            
            gsap.to(headerRef.current, {
              backdropFilter: `blur(${blurAmount}px)`,
              y: yOffset,
              duration: 0.3,
              ease: "power2.out"
            });
            
            // Make header more compact on scroll
            if (progress > 0.1) {
              gsap.to(headerRef.current, {
                height: "4.5rem",
                duration: 0.3
              });
            } else {
              gsap.to(headerRef.current, {
                height: "5.5rem",
                duration: 0.3
              });
            }
          }
          
          // Progress indicator
          if (scrollProgressRef.current) {
            gsap.to(scrollProgressRef.current, {
              width: `${progress * 100}%`,
              duration: 0.3,
              ease: "power2.out"
            });
          }
          
          // Glass effect intensity
          if (glassEffectRef.current) {
            gsap.to(glassEffectRef.current, {
              opacity: 0.2 + progress * 0.3,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      });

      // Magnetic button effects
      magneticRefs.current.forEach((button) => {
        if (!button) return;
        
        button.addEventListener('mousemove', (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const rect = button.getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left - rect.width / 2;
          const y = mouseEvent.clientY - rect.top - rect.height / 2;
          
          gsap.to(button, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)"
          });
        });
      });

      // Active section detection with Intersection Observer
      const sections = document.querySelectorAll('section[id], main > div > section');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0.5 }
      );

      sections.forEach((section) => observer.observe(section));

      return () => observer.disconnect();
    });

    return () => ctx.revert();
  }, [isClient, hasLoaded]);

  // Cart badge animation
  useEffect(() => {
    if (state.itemCount > 0) {
      // Create floating particle effect
      for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full';
        headerRef.current?.appendChild(particle);
        
        const rect = document.querySelector('[data-cart-button]')?.getBoundingClientRect();
        if (rect) {
          gsap.set(particle, {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            scale: 0
          });
          
          gsap.to(particle, {
            x: `+=${gsap.utils.random(-20, 20)}`,
            y: `+=${gsap.utils.random(-20, 20)}`,
            scale: 1,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => particle.remove()
          });
        }
      }
    }
  }, [state.itemCount]);

  // Scroll progress indicator
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }));
    };

    updateDateTime();
    const timeInterval = setInterval(updateDateTime, 60000);

    return () => clearInterval(timeInterval);
  }, []);

  // Search functionality
  const convertToSearchProduct = useCallback((product: Product): SearchProduct => ({
    id: product.id.toString(),
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    category: product.category,
    inStock: true,
    rating: product.rating,
    slug: product.name.toLowerCase().replace(/\s+/g, '-')
  }), []);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    try {
      const foundProducts = await productService.searchProducts(query);
      const searchProducts = foundProducts.map(convertToSearchProduct);
      
      setSearchResults(searchProducts);
      setShowSearchResults(true);
      
      if (searchContainerRef.current) {
        const items = searchContainerRef.current.querySelectorAll('.search-result-item');
        gsap.fromTo(items,
          { 
            x: -20, 
            opacity: 0,
            scale: 0.95 
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "power3.out"
          }
        );
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [convertToSearchProduct]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(query);
    }, 300);
  }, [performSearch]);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (searchResults.length > 0) {
      const firstResult = searchResults[0];
      router.push(`/products/${firstResult.slug || firstResult.id}`);
    } else {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
    
    closeSearch();
  }, [searchQuery, searchResults, router]);

  // Modern search animations
  const animateSearchOpen = useCallback(() => {
    if (!searchRef.current) return;
    
    gsap.to(headerRef.current, {
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      duration: 0.3,
      ease: "power2.out"
    });
    
    gsap.fromTo(searchRef.current,
      { 
        y: -30, 
        opacity: 0,
        scale: 0.9 
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      }
    );
  }, []);

  const animateSearchClose = useCallback(() => {
    if (!searchRef.current) return;
    
    gsap.to(searchRef.current, {
      y: -20,
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(headerRef.current, {
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          duration: 0.3
        });
      }
    });
  }, []);

  const closeSearch = useCallback(() => {
    if (isSearchOpen) {
      animateSearchClose();
      setTimeout(() => {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
        setShowSearchResults(false);
        setIsSearching(false);
      }, 300);
    }
  }, [isSearchOpen, animateSearchClose]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        closeSearch();
      }
      
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node) && isUserDropdownOpen) {
        setIsUserDropdownOpen(false);
      }
      
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen, isUserDropdownOpen, isMenuOpen, closeSearch]);

  // User data helpers
  const getUserInitials = useCallback(() => 
    user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : 'GU'
  , [user]);

  const getUserFullName = useCallback(() => 
    user ? `${user.firstName} ${user.lastName}` : 'Guest'
  , [user]);

  const getUserProfileImage = useCallback(() => 
    user ? user.avatar || user.profileImage || null : null
  , [user]);

  // Core functions
  const closeAllMenus = useCallback(() => {
    setIsMenuOpen(false);
    setIsUserDropdownOpen(false);
    closeSearch();
  }, [closeSearch]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
    setIsUserDropdownOpen(false);
    closeSearch();
  }, [closeSearch]);

  const toggleUserDropdown = useCallback(() => {
    setIsUserDropdownOpen(prev => !prev);
    setIsMenuOpen(false);
    closeSearch();
  }, [closeSearch]);

  const toggleSearch = useCallback(() => {
    if (isSearchOpen) {
      closeSearch();
    } else {
      closeAllMenus();
      setIsSearchOpen(true);
      setTimeout(() => {
        animateSearchOpen();
        searchInputRef.current?.focus();
      }, 10);
    }
  }, [isSearchOpen, closeAllMenus, animateSearchOpen, closeSearch]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
    document.documentElement.classList.toggle('dark');
  }, []);

  const handleNavigation = useCallback((href: string) => {
    // Ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'absolute w-2 h-2 bg-white/30 rounded-full pointer-events-none';
    ripple.style.left = `${window.innerWidth / 2}px`;
    ripple.style.top = `${window.innerHeight / 2}px`;
    document.body.appendChild(ripple);
    
    gsap.to(ripple, {
      scale: 100,
      opacity: 0,
      duration: 0.6,
      ease: "power4.out",
      onComplete: () => ripple.remove()
    });
    
    closeAllMenus();
    setTimeout(() => router.push(href), 400);
  }, [router, closeAllMenus]);

  // Handle login click
  const handleLoginClick = useCallback(() => {
    closeAllMenus();
    router.push('/auth/login');
  }, [router, closeAllMenus]);

  // Handle signup click
  const handleSignupClick = useCallback(() => {
    closeAllMenus();
    router.push('/auth/signup');
  }, [router, closeAllMenus]);

  // Memoized modern components with PROPER SIZING
  const Logo = memo(() => (
    <Link 
      ref={logoRef}
      href="/" 
      className={`flex items-center space-x-4 group relative ${
        isSearchOpen ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      onClick={(e) => {
        e.preventDefault();
        handleNavigation('/');
      }}
      aria-label="RS-LEGACY"
    >
      {/* Modern logo mark - LARGER */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
        <div className="relative w-14 h-14 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 rounded-xl flex items-center justify-center border-2 border-slate-700/50 group-hover:border-blue-500/50 transition-all duration-500">
          <Crown className="w-7 h-7 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
          {/* Animated accent */}
          <div className="absolute -inset-2 rounded-xl border-2 border-blue-500/20 group-hover:border-blue-400/40 transition-all duration-500" />
        </div>
      </div>
      
      {/* Modern logo text - LARGER */}
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
          RS-LEGACY
        </span>
        <span className="text-sm text-slate-400 font-medium tracking-wider">
          {SITE_METADATA.tagline}
        </span>
      </div>
    </Link>
  ));

  Logo.displayName = 'Logo';

  const NavigationLink = memo(({ 
    item, 
    isMobile = false, 
    index = 0 
  }: { 
    item: typeof NAVIGATION_ITEMS[0], 
    isMobile?: boolean, 
    index?: number 
  }) => {
    const Icon = item.icon;
    const isActive = pathname === item.href;
    const [isHovered, setIsHovered] = useState(false);

    if (isMobile) {
      return (
        <Link
          href={item.href}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation(item.href);
          }}
          className={`group relative w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
            isActive
              ? 'bg-slate-800/50 text-white'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/30'
          }`}
        >
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.color} transition-transform duration-300 group-hover:scale-110`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{item.name}</span>
            <span className="text-sm text-slate-400">{item.description}</span>
          </div>
        </Link>
      );
    }

    return (
      <Link
        ref={el => { 
          if (el) {
            navItemsRef.current[index] = el;
            magneticRefs.current[index] = el;
          }
        }}
        href={item.href}
        className="relative px-5 py-3 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          e.preventDefault();
          handleNavigation(item.href);
        }}
      >
        <span className={`relative z-10 text-base font-semibold transition-colors duration-300 ${
          isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
        }`}>
          {item.name}
        </span>
        
        {/* Modern hover effect */}
        <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${
          isHovered ? 'bg-slate-800/30 backdrop-blur-sm' : ''
        }`} />
        
        {/* Animated underline - THICKER */}
        <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 rounded-full transition-all duration-500 ${
          isActive || isHovered 
            ? `w-full ${item.color}`
            : 'w-0 bg-transparent'
        }`} />
        
        {/* Floating icon on hover - LARGER */}
        <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-xl ${item.color} flex items-center justify-center transition-all duration-500 ${
          isHovered 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-2 scale-90'
        }`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </Link>
    );
  });

  NavigationLink.displayName = 'NavigationLink';

  const UserAvatar = memo(({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
      sm: 'w-10 h-10 text-sm',
      md: 'w-12 h-12 text-base',
      lg: 'w-16 h-16 text-lg'
    };

    const profileImage = getUserProfileImage();

    if (profileImage) {
      return (
        <img
          src={profileImage}
          alt={getUserFullName()}
          className={`${sizeClasses[size]} rounded-full object-cover border-2 border-slate-700`}
        />
      );
    }

    if (user) {
      return (
        <div 
          className={`${sizeClasses[size]} bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold`}
        >
          {getUserInitials()}
        </div>
      );
    }

    // Guest avatar
    return (
      <div 
        className={`${sizeClasses[size]} bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center text-slate-300 font-bold`}
      >
        <User className="w-6 h-6" />
      </div>
    );
  });

  UserAvatar.displayName = 'UserAvatar';

  const SearchInterface = memo(() => (
    <div 
      ref={searchRef} 
      className="absolute top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="h-20 flex items-center">
          <form 
            onSubmit={handleSearchSubmit} 
            className="w-full relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-xl blur-xl" />
              
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search products, brands, collections..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="relative w-full px-6 py-4 pl-14 pr-14 rounded-2xl border-2 border-slate-700/50 bg-slate-900/80 backdrop-blur-xl text-white placeholder-slate-400 focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-300 text-base"
                autoFocus
              />
              
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              
              {isSearching && (
                <div className="absolute right-14 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
                </div>
              )}
              
              <button
                type="button"
                onClick={closeSearch}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 p-1.5 text-slate-400 hover:text-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ));

  SearchInterface.displayName = 'SearchInterface';

  const ScrollProgress = memo(() => (
    <div ref={scrollProgressRef} className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
  ));

  ScrollProgress.displayName = 'ScrollProgress';

  // Loading state
  if (!isClient || isLoading) {
    return <HeaderSkeleton />;
  }

  return (
    <>
      {/* Modern cursor - LARGER */}
      {isClient && (
        <>
          <div 
            ref={cursorRef}
            className="fixed w-12 h-12 pointer-events-none z-[9999] mix-blend-difference"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
              filter: 'blur(1px)'
            }}
          />
          <div 
            ref={floatingElementsRef}
            className="fixed inset-0 pointer-events-none z-30"
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(59, 130, 246, 0.03), transparent 70%)`,
                  opacity: 0.3
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Modern Glass Effect Layer */}
      <div 
        ref={glassEffectRef}
        className="fixed inset-0 bg-gradient-to-b from-blue-900/5 via-transparent to-cyan-900/5 pointer-events-none z-40"
      />

      {/* MAIN HEADER - PROPER HEIGHT */}
      <header 
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 transition-all duration-500 h-20"
        style={{
          '--scroll-progress': scrollProgress
        } as React.CSSProperties}
      >
        {/* Scroll Progress Indicator */}
        <ScrollProgress />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            {!isSearchOpen && (
              <nav className="hidden lg:flex items-center space-x-2">
                {NAVIGATION_ITEMS.map((item, index) => (
                  <NavigationLink key={item.name} item={item} index={index} />
                ))}
              </nav>
            )}

            {/* Modern Action Buttons - LARGER */}
            <div className={`flex items-center space-x-3 transition-all duration-300 ${
              isSearchOpen ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}>
              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" /> 
                ) : (
                  <Moon className="w-5 h-5" /> 
                )}
              </button>

              {/* Search */}
              <button
                onClick={toggleSearch}
                className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart - Visible for both logged in and guest users */}
              <Link
                href="/cart"
                className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300 relative"
                data-cart-button
              >
                <ShoppingCart className="w-5 h-5" />
                {state.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-slate-900">
                    {state.itemCount}
                  </span>
                )}
              </Link>

              {/* Wishlist - Only for logged in users */}
              {user && (
                <Link
                  href="/wishlist"
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
                >
                  <Heart className="w-5 h-5" />
                </Link>
              )}

              {/* Notifications - Only for logged in users */}
              {user && (
                <button className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300 relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-rose-500 rounded-full animate-pulse" />
                </button>
              )}

              {/* User Menu */}
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-slate-800/50 transition-all duration-300"
                  aria-label="User menu"
                >
                  <UserAvatar size="md" />
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                    isUserDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-slate-900/95 backdrop-blur-xl rounded-2xl border-2 border-slate-800/50 shadow-2xl shadow-black/30 py-3 z-50 overflow-hidden">
                    {user ? (
                      // Logged-in user menu
                      <>
                        <div className="px-5 py-4 border-b border-slate-800/50 bg-gradient-to-r from-slate-900/50 to-transparent">
                          <div className="flex items-center space-x-4">
                            <UserAvatar size="lg" />
                            <div className="flex-1 min-w-0">
                              <p className="text-base font-semibold text-white truncate">
                                {getUserFullName()}
                              </p>
                              <p className="text-sm text-slate-400 truncate">
                                {user.email}
                              </p>
                              <div className="flex items-center space-x-2 mt-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-sm text-emerald-400">Online</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="py-2">
                          <Link
                            href="/profile"
                            className="flex items-center space-x-3 px-5 py-3 text-base text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 group"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            <span>Profile</span>
                          </Link>
                          
                          <Link
                            href="/settings"
                            className="flex items-center space-x-3 px-5 py-3 text-base text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 group"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <Settings className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            <span>Settings</span>
                          </Link>
                          
                          <div className="border-t border-slate-800/50 my-2" />
                          
                          <button
                            onClick={() => {
                              setIsUserDropdownOpen(false);
                              logout();
                              router.push('/');
                            }}
                            className="w-full flex items-center space-x-3 px-5 py-3 text-base text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all duration-300 group"
                          >
                            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      // Guest user menu with login/signup options
                      <>
                        <div className="px-5 py-4 border-b border-slate-800/50">
                          <p className="text-base font-semibold text-white">
                            Welcome to RS-LEGACY
                          </p>
                          <p className="text-sm text-slate-400 mt-1">
                            Sign in to access your account
                          </p>
                        </div>

                        <div className="py-2">
                          <button
                            onClick={handleLoginClick}
                            className="w-full flex items-center space-x-3 px-5 py-3 text-base text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 group"
                          >
                            <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            <span>Sign In</span>
                          </button>
                          
                          <button
                            onClick={handleSignupClick}
                            className="w-full flex items-center space-x-3 px-5 py-3 text-base text-white hover:bg-blue-500/10 transition-all duration-300 group mt-2"
                          >
                            <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                              Create Account
                            </span>
                          </button>
                          
                          <div className="border-t border-slate-800/50 my-2" />
                          
                          <Link
                            href="/cart"
                            className="flex items-center space-x-3 px-5 py-3 text-base text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 group"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            <span>View Cart</span>
                            {state.itemCount > 0 && (
                              <span className="ml-auto w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                {state.itemCount}
                              </span>
                            )}
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden w-11 h-11 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Search Interface */}
          {isSearchOpen && <SearchInterface />}
        </div>

        {/* Modern Mobile Navigation - LARGER */}
        {isMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={closeAllMenus}
              aria-hidden="true"
            />
            
            <div 
              ref={mobileMenuRef}
              className="lg:hidden fixed inset-y-0 right-0 w-96 bg-slate-900/95 backdrop-blur-xl border-l-2 border-slate-800/50 shadow-2xl z-50"
            >
              <div className="h-full flex flex-col">
                {/* Mobile header */}
                <div className="p-8 border-b border-slate-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <UserAvatar size="lg" />
                      <div>
                        <p className="text-lg font-semibold text-white">
                          {user ? getUserFullName() : 'Welcome'}
                        </p>
                        <p className="text-sm text-slate-400">
                          {user ? user.email : 'Sign in to continue'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={closeAllMenus}
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-3">
                    {NAVIGATION_ITEMS.map((item, index) => (
                      <NavigationLink key={item.name} item={item} isMobile={true} index={index} />
                    ))}
                  </div>

                  {/* Additional mobile actions */}
                  <div className="mt-8 pt-8 border-t border-slate-800/50">
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/cart"
                        className="p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 flex flex-col items-center justify-center space-y-2 relative"
                        onClick={closeAllMenus}
                      >
                        <ShoppingCart className="w-7 h-7 text-slate-300" />
                        <span className="text-sm text-slate-400">Cart</span>
                        {state.itemCount > 0 && (
                          <span className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-bold rounded-full flex items-center justify-center border-2 border-slate-900">
                            {state.itemCount}
                          </span>
                        )}
                      </Link>
                      
                      {user && (
                        <Link
                          href="/wishlist"
                          className="p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 flex flex-col items-center justify-center space-y-2"
                          onClick={closeAllMenus}
                        >
                          <Heart className="w-7 h-7 text-slate-300" />
                          <span className="text-sm text-slate-400">Wishlist</span>
                        </Link>
                      )}
                      
                      {!user && (
                        <button
                          onClick={handleSignupClick}
                          className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-400/10 hover:from-blue-500/20 hover:to-cyan-400/20 transition-all duration-300 flex flex-col items-center justify-center space-y-2"
                        >
                          <User className="w-7 h-7 text-blue-400" />
                          <span className="text-sm text-blue-400">Sign Up</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile footer */}
                <div className="p-6 border-t border-slate-800/50">
                  {user ? (
                    <button
                      onClick={() => {
                        closeAllMenus();
                        logout();
                        router.push('/');
                      }}
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-slate-700 text-rose-400 hover:text-rose-300 transition-all duration-300 flex items-center justify-center space-x-3"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="text-base font-medium">Sign Out</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleLoginClick}
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 flex items-center justify-center space-x-3"
                    >
                      <LogIn className="w-5 h-5" />
                      <span className="text-base font-medium">Sign In</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Search Results Dropdown - LARGER */}
      {showSearchResults && searchQuery.trim() && (
        <div 
          ref={searchContainerRef}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-slate-900/95 backdrop-blur-xl rounded-2xl border-2 border-slate-800/50 shadow-2xl z-40 overflow-hidden mt-3"
        >
          <div className="max-h-96 overflow-y-auto">
            {searchResults.length > 0 ? (
              <>
                <div className="px-6 py-4 border-b border-slate-800/50">
                  <p className="text-base text-slate-400">
                    Found {searchResults.length} results for "<span className="text-white">{searchQuery}</span>"
                  </p>
                </div>
                
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      router.push(`/products/${product.slug || product.id}`);
                      closeSearch();
                    }}
                    className="w-full flex items-center space-x-4 px-6 py-4 text-left hover:bg-slate-800/30 transition-all duration-300 group border-b border-slate-800/30 last:border-b-0 search-result-item"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800/50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium text-white truncate">
                        {product.name}
                      </p>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-slate-400 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <ChevronDown className="w-5 h-5 text-slate-400 transform -rotate-90 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                ))}
              </>
            ) : !isSearching && (
              <div className="px-6 py-10 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-400/10 flex items-center justify-center">
                  <Search className="w-7 h-7 text-slate-400" />
                </div>
                <p className="text-base text-slate-300">
                  No results found for "{searchQuery}"
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% auto;
        }
        
        /* Custom scrollbar - LARGER */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3B82F6, #06B6D4);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563EB, #0891B2);
        }
        
        /* Selection color */
        ::selection {
          background: rgba(59, 130, 246, 0.3);
          color: white;
        }
        
        /* Smooth transitions */
        * {
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, ::before, ::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Glass effect */
        .glass-effect {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </>
  );
}