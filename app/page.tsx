'use client';
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import Header from './components/Header';
import { 
  Star, Truck, Shield, Clock, ArrowRight, Sparkles, 
  TrendingUp, ChevronLeft, ChevronRight, Heart, 
  Eye, ShoppingBag, Zap, Users, Award, CheckCircle,
  Play, Pause
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  images: string[];
  features: string[];
  specifications: Record<string, string>;
  colors: string[];
  sizes: string[];
  category: string;
  featured: boolean;
}

export interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  gradient: string;
  video?: string;
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

export interface Stat {
  number: string;
  label: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
}

// Constants
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Classic Cotton T-Shirt",
    description: "Premium quality cotton t-shirt for everyday comfort",
    price: 25.99,
    originalPrice: 35.99,
    discount: 28,
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    stockCount: 50,
    images: ["/images/img2.jpg"],
    features: ["100% Cotton", "Machine Wash", "Premium Fit"],
    specifications: { "Material": "Cotton", "Fit": "Regular" },
    colors: ["black", "white", "gray"],
    sizes: ["S", "M", "L", "XL"],
    category: "clothing",
    featured: true
  },
  {
    id: "2",
    name: "Premium Denim Jacket",
    description: "Stylish denim jacket for a casual yet sophisticated look",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    stockCount: 25,
    images: ["/images/img3.jpg"],
    features: ["100% Cotton", "Classic Fit", "Durable"],
    specifications: { "Material": "Denim", "Style": "Jacket" },
    colors: ["blue", "black"],
    sizes: ["S", "M", "L", "XL"],
    category: "clothing",
    featured: true
  },
  {
    id: "3",
    name: "Urban Style Sneakers",
    description: "Comfortable and trendy sneakers for urban lifestyle",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.7,
    reviewCount: 256,
    inStock: true,
    stockCount: 30,
    images: ["/images/img5.jpg"],
    features: ["Comfort Fit", "Durable Sole", "Breathable"],
    specifications: { "Type": "Sneakers", "Sole": "Rubber" },
    colors: ["white", "black"],
    sizes: ["38", "39", "40", "41", "42"],
    category: "footwear",
    featured: true
  },
  {
    id: "4",
    name: "Designer Handbag",
    description: "Elegant handbag for modern women",
    price: 129.99,
    originalPrice: 159.99,
    discount: 19,
    rating: 4.6,
    reviewCount: 178,
    inStock: true,
    stockCount: 15,
    images: ["/images/img6.jpg"],
    features: ["Genuine Leather", "Multiple Compartments", "Adjustable Strap"],
    specifications: { "Material": "Leather", "Style": "Handbag" },
    colors: ["brown", "black", "beige"],
    sizes: ["One Size"],
    category: "accessories",
    featured: true
  }
];

export const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    image: "/images/img6.jpg",
    title: "Summer Collection",
    subtitle: "New Arrivals",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: 2,
    image: "/images/img2.jpg",
    title: "Electronics Sale",
    subtitle: "Up to 50% Off",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: 3,
    image: "/images/img3.jpg",
    title: "Home & Living",
    subtitle: "Modern Designs",
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    id: 4,
    image: "/images/img4.jpg",
    title: "Premium Accessories",
    subtitle: "Limited Edition",
    gradient: "from-orange-500/20 to-red-500/20"
  }
];

export const FEATURES: Feature[] = [
  {
    icon: <Truck className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Free Shipping",
    description: "Free shipping on all orders over 1000rs",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Shield className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Secure Payment",
    description: "100% secure payment processing with encryption",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: <Clock className="w-6 h-6 md:w-8 md:h-8" />,
    title: "24/7 Support",
    description: "Round-the-clock customer support service",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: <Star className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Quality Guarantee",
    description: "30-day money back quality guarantee",
    gradient: "from-orange-500 to-red-500"
  }
];

// Loading Skeleton
const SkeletonLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
    <div className="h-16 lg:h-20 bg-white border-b border-gray-200 animate-pulse"></div>
    <div className="h-[500px] md:h-[600px] lg:h-[700px] bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white/10 rounded-3xl p-6 md:p-8 h-32 animate-pulse"></div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

// Enhanced ProductCard with GSAP
const ProductCard = React.memo(({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product) => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.8,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
          once: true
        }
      });

      // Hover animations
      const card = cardRef.current;
      if (!card) return;

      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -20,
          scale: 1.02,
          duration: 0.4,
          ease: "power2.out"
        });
        
        gsap.to(imageRef.current, {
          scale: 1.1,
          duration: 0.6,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
        
        gsap.to(imageRef.current, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        });
      });

      // Magnetic button effect
      if (buttonRef.current) {
        const button = buttonRef.current;
        button.addEventListener('mousemove', (e) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const deltaX = (x - centerX) * 0.2;
          const deltaY = (y - centerY) * 0.2;
          
          gsap.to(button, {
            x: deltaX,
            y: deltaY,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleAddToCart = () => {
    onAddToCart(product);
    
    if (buttonRef.current) {
      const tl = gsap.timeline();
      tl.to(buttonRef.current, {
        scale: 0.9,
        duration: 0.1
      })
      .to(buttonRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "elastic.out(1.2, 0.5)"
      });
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    
    const heart = document.querySelector(`#heart-${product.id}`);
    if (heart) {
      gsap.to(heart, {
        scale: 1.5,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative flex-shrink-0 w-80 lg:w-96 bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 group cursor-pointer"
    >
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          FEATURED
        </div>
      </div>

      <div className="relative overflow-hidden h-64 md:h-80 bg-gradient-to-br from-gray-100 to-gray-200">
        {product.images[0] && (
          <Image
            ref={imageRef}
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-full object-cover"
            priority={false}
            loading="lazy"
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

        <button
          id={`heart-${product.id}`}
          onClick={handleLike}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {product.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-300 text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({product.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {product.discount && (
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
              -{product.discount}%
            </span>
          )}
        </div>

        <button
          ref={buttonRef}
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 group/btn relative overflow-hidden"
        >
          <span className="relative z-10">Add to Cart</span>
          <ShoppingBag className="w-4 h-4 relative z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  );
});

// Horizontal Scroll Container with GSAP
const HorizontalScrollContainer = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode;
  className?: string;
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const leftArrowRef = useRef<HTMLButtonElement>(null);
  const rightArrowRef = useRef<HTMLButtonElement>(null);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    // Animate scroll
    gsap.to(container, {
      scrollLeft: newScrollLeft,
      duration: 0.8,
      ease: "power3.out",
      onStart: () => {
        // Animate arrow
        const arrow = direction === 'left' ? leftArrowRef.current : rightArrowRef.current;
        if (arrow) {
          gsap.to(arrow, {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Animate children on mount
    const children = container.children;
    gsap.from(children, {
      opacity: 0,
      x: 50,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    });
  }, []);

  return (
    <div className="relative">
      <button
        ref={leftArrowRef}
        onClick={() => scroll('left')}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-2xl hover:scale-110 transition-all duration-300"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>

      <div
        ref={scrollContainerRef}
        className={`flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory ${className}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>

      <button
        ref={rightArrowRef}
        onClick={() => scroll('right')}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-2xl hover:scale-110 transition-all duration-300"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
};

// Stats Section with GSAP
const StatsSection = React.memo(({ 
  stats, 
  title = "Numbers That Speak",
  description = "Witness our growth in real-time with live statistics"
}: { 
  stats: Stat[]; 
  title?: string;
  description?: string;
}) => {
  const statsRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!statsRef.current) return;

    const ctx = gsap.context(() => {
      // Section entrance
      gsap.from(statsRef.current, {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });

      // Animate each stat box
      gsap.from(".stat-box", {
        opacity: 0,
        scale: 0.8,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".stat-box",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Floating animation for background elements
      gsap.to(".floating-bg", {
        y: 20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });
    }, statsRef);

    return () => ctx.revert();
  }, []);

  // Animate numbers
  useEffect(() => {
    numberRefs.current.forEach((ref, index) => {
      if (!ref || !stats[index]) return;
      
      const target = parseInt(stats[index].number.replace(/[+,]/g, '')) || 0;
      const obj = { value: 0 };
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(obj, {
                value: target,
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                  ref.textContent = `${Math.floor(obj.value).toLocaleString()}+`;
                }
              });
              observer.unobserve(ref);
            }
          });
        },
        { threshold: 0.5 }
      );
      
      observer.observe(ref);
    });
  }, [stats]);

  return (
    <section 
      ref={statsRef}
      className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-bg absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-20"></div>
        <div className="floating-bg absolute top-20 right-20 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-lg opacity-30"></div>
        <div className="floating-bg absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-xl opacity-15"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-semibold text-white">LIVE STATISTICS</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400">REAL-TIME</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {title}
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-box relative group cursor-pointer"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.05,
                  y: -10,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  y: 0,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
            >
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 md:p-8 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-[2px] bg-slate-900 rounded-3xl z-10"></div>
                
                <div className="relative z-20">
                  <div className="flex justify-center mb-4">
                    <div className={`p-2 rounded-full ${
                      stat.trend === 'up' ? 'bg-green-500/20 text-green-400' :
                      stat.trend === 'down' ? 'bg-red-500/20 text-red-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {stat.trend === 'up' && <TrendingUp className="w-5 h-5" />}
                      {stat.trend === 'down' && <TrendingUp className="w-5 h-5 rotate-180" />}
                      {stat.trend === 'stable' && <div className="w-2 h-2 bg-current rounded-full" />}
                    </div>
                  </div>

                  <div
                    ref={(el) => {
                      if (el && !numberRefs.current.includes(el)) {
                        numberRefs.current[index] = el;
                      }
                    }}
                    className="text-2xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-2"
                  >
                    0+
                  </div>

                  <div className="text-sm md:text-base text-gray-300 font-semibold flex items-center justify-center gap-2">
                    {stat.icon}
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

// Hero Carousel with GSAP
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout>();

  const nextSlide = useCallback(() => {
    const next = (currentSlide + 1) % CAROUSEL_SLIDES.length;
    animateSlideTransition(currentSlide, next);
    setCurrentSlide(next);
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    const prev = (currentSlide - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length;
    animateSlideTransition(currentSlide, prev);
    setCurrentSlide(prev);
  }, [currentSlide]);

  const animateSlideTransition = useCallback((from: number, to: number) => {
    const fromSlide = slideRefs.current[from];
    const toSlide = slideRefs.current[to];

    if (!fromSlide || !toSlide) return;

    const tl = gsap.timeline();

    // Exit current slide
    tl.to(fromSlide, {
      opacity: 0,
      scale: 1.1,
      duration: 0.8,
      ease: "power3.inOut"
    });

    // Enter next slide
    tl.fromTo(toSlide,
      {
        opacity: 0,
        scale: 0.9
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      },
      "-=0.5"
    );

    // Content animation
    tl.fromTo(toSlide.querySelectorAll('.slide-content > *'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)"
      },
      "-=0.3"
    );
  }, []);

  // Auto slide
  useEffect(() => {
    if (!isPlaying) return;
    
    intervalRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, nextSlide]);

  const goToSlide = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    animateSlideTransition(currentSlide, index);
    setCurrentSlide(index);
    if (isPlaying) {
      setTimeout(() => {
        intervalRef.current = setInterval(nextSlide, 5000);
      }, 5000);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <section 
      ref={carouselRef}
      className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 text-white overflow-hidden"
    >
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden">
        {CAROUSEL_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            // ref={(el) => slideRefs.current[index] = el}
            className={`absolute inset-0 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} backdrop-blur-[2px]`}></div>
            </div>
            
            <div className="slide-content relative h-full flex items-center justify-center">
              <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center mb-4 md:mb-6">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold flex items-center space-x-1 md:space-x-2">
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{slide.subtitle}</span>
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                  {slide.title}{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-400">
                    Collection
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed px-2">
                  Shop the latest trends with unbeatable prices. Quality guaranteed with 
                  fast shipping and excellent customer service.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
                  <Link 
                    href="/Product" 
                    className="carousel-btn bg-blue-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold flex items-center space-x-2 group text-sm md:text-base w-full sm:w-auto justify-center"
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                      });
                    }}
                  >
                    <span>Start Shopping</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                  <Link 
                    href="/categories" 
                    className="carousel-btn border-2 border-white text-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-base w-full sm:w-auto text-center"
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                      });
                    }}
                  >
                    Explore Categories
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation */}
        <button
          onClick={prevSlide}
          className="carousel-nav absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 md:p-3 z-10"
          aria-label="Previous slide"
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1.2,
              rotation: -360,
              duration: 0.5,
              ease: "back.out(1.7)"
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1,
              rotation: 0,
              duration: 0.5,
              ease: "power2.out"
            });
          }}
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="carousel-nav absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 md:p-3 z-10"
          aria-label="Next slide"
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1.2,
              rotation: 360,
              duration: 0.5,
              ease: "back.out(1.7)"
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1,
              rotation: 0,
              duration: 0.5,
              ease: "power2.out"
            });
          }}
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 md:p-3 z-10"
          aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {CAROUSEL_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`carousel-dot w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              onMouseEnter={(e) => {
                if (index !== currentSlide) {
                  gsap.to(e.currentTarget, {
                    scale: 1.5,
                    duration: 0.2,
                    ease: "power2.out"
                  });
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentSlide) {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                  });
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Section with GSAP
const FeaturesSection = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!featuresRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger animation
      gsap.from(".feature-card", {
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });

      // Hover animations
      gsap.utils.toArray(".feature-card").forEach((card: any) => {
        const icon = card.querySelector(".feature-icon");
        
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            duration: 0.3,
            ease: "power2.out"
          });

          gsap.to(icon, {
            scale: 1.1,
            rotate: 360,
            duration: 0.5,
            ease: "back.out(1.7)"
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });

          gsap.to(icon, {
            scale: 1,
            rotate: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        });
      });
    }, featuresRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={featuresRef} className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">RS-Legacy</span>?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            We provide the best shopping experience with premium services and customer care
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-white rounded-2xl p-6 md:p-8 text-center shadow-xl shadow-gray-200/50 border border-gray-100 cursor-pointer"
            >
              <div className={`feature-icon w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 md:mb-6 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Component
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [animatedStats, setAnimatedStats] = useState({
    customers: 0,
    products: 0,
    categories: 0,
    support: '24/7'
  });
  const mainRef = useRef<HTMLDivElement>(null);

  // Initialize GSAP animations
  useEffect(() => {
    if (!mainRef.current) return;

    const ctx = gsap.context(() => {
      // Page entrance animation
      gsap.from("main > section", {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.3,
        ease: "power4.out",
        delay: 0.5
      });

      // Floating animation for background elements
      gsap.to(".bg-float", {
        y: 30,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  // Initialize data
  useEffect(() => {
    fetchProducts();
    setTimeout(() => {
      setAnimatedStats({
        customers: 10000,
        products: 500,
        categories: 50,
        support: '24/7'
      });
    }, 1000);
  }, []);

  // Memoized stats
  const stats = useMemo((): Stat[] => [
    { 
      number: `${animatedStats.customers.toLocaleString()}+`, 
      label: 'Happy Customers',
      trend: 'up',
      icon: <Users className="w-5 h-5" />
    },
    { 
      number: `${animatedStats.products}+`, 
      label: 'Premium Products',
      trend: 'up',
      icon: <ShoppingBag className="w-5 h-5" />
    },
    { 
      number: `${animatedStats.categories}+`, 
      label: 'Categories',
      trend: 'up',
      icon: <Award className="w-5 h-5" />
    },
    { 
      number: animatedStats.support, 
      label: 'Support',
      trend: 'stable',
      icon: <Clock className="w-5 h-5" />
    }
  ], [animatedStats]);

  const fetchProducts = useCallback(async () => {
    try {
      setTimeout(() => {
        setProducts(MOCK_PRODUCTS);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    }
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    console.log('Added to cart:', product.name);
    
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    toast.textContent = `Added ${product.name} to cart!`;
    document.body.appendChild(toast);
    
    // Animate toast
    gsap.fromTo(toast,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "back.out(1.7)",
        onComplete: () => {
          setTimeout(() => {
            gsap.to(toast, {
              opacity: 0,
              y: -50,
              duration: 0.3,
              onComplete: () => toast.remove()
            });
          }, 2000);
        }
      }
    );
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div ref={mainRef} className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      <Header />
      
      <main className="pt-16 lg:pt-20">
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Stats Section */}
        <StatsSection stats={stats} />

        {/* Features Section */}
        <FeaturesSection />

        {/* Featured Products */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50/50 overflow-hidden">
          {/* Animated background elements */}
          <div className="bg-float absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="bg-float absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-6 py-3 mb-6 shadow-lg shadow-purple-500/25">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-semibold">FEATURED PRODUCTS</span>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
                  Featured
                </span>{' '}
                Products
              </h2>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Discover our handpicked selection of premium products loved by our customers
              </p>
            </div>

            <HorizontalScrollContainer className="py-4 px-2">
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                />
              ))}
            </HorizontalScrollContainer>

            <div className="text-center mt-12">
              <Link 
                href="/Product" 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-purple-500/25 group"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
              >
                <span>View All Products</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              Stay Updated with Latest Deals
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto px-2">
              Subscribe to our newsletter and be the first to know about exclusive offers and new arrivals
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto px-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white shadow-lg text-sm md:text-base"
              />
              <button 
                className="bg-white text-blue-600 px-4 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold shadow-lg text-sm md:text-base w-full sm:w-auto"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs sm:text-sm opacity-75 mt-3 md:mt-4">
              No spam ever. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}





