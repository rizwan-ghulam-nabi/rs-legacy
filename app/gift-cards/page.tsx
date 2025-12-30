// app/gift-cards/page.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gift, CreditCard, Zap, Sparkles, 
  Star, Crown, Palette, Music,
  Coffee, ShoppingBag, Plane, Utensils,
  Smartphone, Headphones, Camera, Gamepad
} from "lucide-react";
import Image from "next/image";

// Gift card data with categories
const giftCards = [
  {
    id: 1,
    name: "Premium Fashion Collection",
    category: "fashion",
    price: 5000,
    originalPrice: 6000,
    image: "/images/gift-fashion.jpg",
    colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
    gradient: "from-pink-500 to-purple-600",
    icon: ShoppingBag,
    description: "Elevate your style with our premium fashion collection",
    tags: ["Fashion", "Style", "Premium"]
  },
  {
    id: 2,
    name: "Gourmet Dining Experience",
    category: "dining",
    price: 3000,
    originalPrice: 3500,
    image: "/images/gift-dining.jpg",
    colors: ["#FF9F1C", "#FFBF69", "#CBF3F0"],
    gradient: "from-orange-500 to-red-500",
    icon: Utensils,
    description: "Savor exquisite culinary experiences",
    tags: ["Food", "Fine Dining", "Experience"]
  },
  {
    id: 3,
    name: "Tech & Gadgets Bundle",
    category: "tech",
    price: 10000,
    originalPrice: 12000,
    image: "/images/gift-tech.jpg",
    colors: ["#0077B6", "#00B4D8", "#90E0EF"],
    gradient: "from-blue-500 to-cyan-500",
    icon: Smartphone,
    description: "Latest tech gadgets and accessories",
    tags: ["Technology", "Gadgets", "Innovation"]
  },
  {
    id: 4,
    name: "Entertainment Package",
    category: "entertainment",
    price: 2500,
    originalPrice: 3000,
    image: "/images/gift-entertainment.jpg",
    colors: ["#7209B7", "#3A0CA3", "#4361EE"],
    gradient: "from-purple-600 to-blue-600",
    icon: Headphones,
    description: "Movies, music, and entertainment galore",
    tags: ["Movies", "Music", "Streaming"]
  },
  {
    id: 5,
    name: "Travel & Adventure",
    category: "travel",
    price: 15000,
    originalPrice: 18000,
    image: "/images/gift-travel.jpg",
    colors: ["#2A9D8F", "#E9C46A", "#F4A261"],
    gradient: "from-green-500 to-yellow-500",
    icon: Plane,
    description: "Unforgettable travel experiences",
    tags: ["Travel", "Adventure", "Explore"]
  },
  {
    id: 6,
    name: "Creative Arts Package",
    category: "creative",
    price: 4000,
    originalPrice: 4800,
    image: "/images/gift-creative.jpg",
    colors: ["#E63946", "#F1FAEE", "#A8DADC"],
    gradient: "from-red-500 to-pink-500",
    icon: Palette,
    description: "Unleash your creative potential",
    tags: ["Art", "Design", "Creativity"]
  },
  {
    id: 7,
    name: "Gaming Universe",
    category: "gaming",
    price: 3500,
    originalPrice: 4200,
    image: "/images/gift-gaming.jpg",
    colors: ["#9D4EDD", "#7B2CBF", "#5A189A"],
    gradient: "from-violet-600 to-purple-900",
    icon: Gamepad,
    description: "Ultimate gaming experience",
    tags: ["Gaming", "eSports", "Entertainment"]
  },
  {
    id: 8,
    name: "Music & Audio",
    category: "music",
    price: 4500,
    originalPrice: 5200,
    image: "/images/gift-music.jpg",
    colors: ["#F72585", "#B5179E", "#7209B7"],
    gradient: "from-pink-600 to-purple-700",
    icon: Music,
    description: "High-quality audio equipment",
    tags: ["Music", "Audio", "Sound"]
  }
];

const categories = [
  { id: "all", name: "All Categories", icon: Sparkles, count: giftCards.length },
  { id: "fashion", name: "Fashion", icon: ShoppingBag, count: giftCards.filter(card => card.category === "fashion").length },
  { id: "dining", name: "Dining", icon: Utensils, count: giftCards.filter(card => card.category === "dining").length },
  { id: "tech", name: "Technology", icon: Smartphone, count: giftCards.filter(card => card.category === "tech").length },
  { id: "entertainment", name: "Entertainment", icon: Headphones, count: giftCards.filter(card => card.category === "entertainment").length },
  { id: "travel", name: "Travel", icon: Plane, count: giftCards.filter(card => card.category === "travel").length },
  { id: "creative", name: "Creative", icon: Palette, count: giftCards.filter(card => card.category === "creative").length },
  { id: "gaming", name: "Gaming", icon: Gamepad, count: giftCards.filter(card => card.category === "gaming").length },
  { id: "music", name: "Music", icon: Music, count: giftCards.filter(card => card.category === "music").length }
];

// Blender-inspired grid component
const BlenderGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,0.05)_25%,rgba(68,68,68,0.05)_50%,transparent_50%,transparent_75%,rgba(68,68,68,0.05)_75%)] bg-[length:10px_10px]"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Animated gradient card
const GradientCard = ({ 
  card, 
  index 
}: { 
  card: typeof giftCards[0];
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <motion.div
        whileHover={{ 
          scale: 1.02,
          rotateY: 5,
          rotateX: -2
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 cursor-pointer"
      >
        {/* Animated Gradient Background */}
        <motion.div
          animate={{
            background: isHovered 
              ? `linear-gradient(135deg, ${card.colors[0]}, ${card.colors[1]})`
              : `linear-gradient(135deg, ${card.colors[0]}20, ${card.colors[1]}20)`
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        />
        
        {/* Content */}
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-3 rounded-2xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm"
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
            
            {/* Price Tag */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="text-right"
            >
              <div className="text-2xl font-bold text-white">
                Rs {card.price.toLocaleString()}
              </div>
              {card.originalPrice > card.price && (
                <div className="text-sm text-white/70 line-through">
                  Rs {card.originalPrice.toLocaleString()}
                </div>
              )}
            </motion.div>
          </div>

          {/* Card Details */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white leading-tight">
              {card.name}
            </h3>
            
            <p className="text-white/80 text-sm leading-relaxed">
              {card.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {card.tags.map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + tagIndex * 0.1 }}
                  className="px-2 py-1 bg-white/20 rounded-full text-xs text-white backdrop-blur-sm"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Purchase Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-white font-semibold transition-all duration-300 border border-white/20 hover:border-white/40"
          >
            Purchase Gift Card
          </motion.button>
        </div>

        {/* Decorative Elements */}
        <motion.div
          animate={{ 
            rotate: isHovered ? 180 : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.5 }}
          className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full backdrop-blur-sm"
        />
        <motion.div
          animate={{ 
            rotate: isHovered ? -180 : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full backdrop-blur-sm"
        />
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl -z-10"
      />
    </motion.div>
  );
};

export default function GiftCardsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter gift cards based on selection and search
  const filteredCards = giftCards.filter(card => {
    const matchesCategory = selectedCategory === "all" || card.category === selectedCategory;
    const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <BlenderGrid>
        {/* Header Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            {/* Animated Background Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full blur-3xl opacity-10"
            />

            {/* Main Content */}
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 mb-8"
              >
                <Gift className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Perfect Gifts for Every Occasion
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent"
              >
                Gift Cards
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                Give the perfect gift with our curated collection of premium gift cards. 
                From fashion to technology, find something special for everyone.
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-md mx-auto relative"
              >
                <input
                  type="text"
                  placeholder="Search gift cards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl shadow-purple-500/25"
                      : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category.id
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}>
                    {category.count}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Gift Cards Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredCards.map((card, index) => (
                <GradientCard
                  key={card.id}
                  card={card}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredCards.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Gift className="w-10 h-10 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">
                No gift cards found
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Zap,
                title: "Instant Delivery",
                description: "Digital gift cards delivered immediately via email"
              },
              {
                icon: CreditCard,
                title: "Secure Payment",
                description: "Bank-level security for all your transactions"
              },
              {
                icon: Crown,
                title: "Premium Selection",
                description: "Curated collection of the best brands and experiences"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </BlenderGrid>
    </div>
  );
}

// Search icon component (missing from imports)
const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);