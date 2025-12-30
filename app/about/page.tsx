// app/about/page.tsx
"use client";

import { motion } from 'framer-motion';
import { 
  Heart, 
  Shield, 
  Truck, 
  Users, 
  Star, 
  Award, 
  Globe,
  Clock,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  Sparkles,
  Gem,
  Crown,
  Scissors,
  Eye,
  Palette,
  Feather,
  BookOpen,
  Lightbulb,
  Target,
  Compass,
  ShoppingCart,
  Zap,
  Utensils,
  Gamepad2,
  Home,
  Shirt
} from 'lucide-react';
import Header from '../components/Header';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer Love",
      description: "We put our customers at the heart of everything we do"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality First",
      description: "Never compromise on quality, across all product categories"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Selection",
      description: "Curating the best products from around the world for you"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Innovation",
      description: "Constantly evolving to bring you the latest and greatest"
    }
  ];

  const categories = [
    {
      icon: <Shirt className="w-10 h-10" />,
      title: "Fashion & Apparel",
      description: "From everyday wear to luxury fashion pieces",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Electronics",
      description: "Cutting-edge gadgets, home appliances, and tech innovations",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Utensils className="w-10 h-10" />,
      title: "Food & Groceries",
      description: "Fresh produce, gourmet items, and daily essentials",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Gamepad2 className="w-10 h-10" />,
      title: "Toys & Games",
      description: "Entertainment for all ages, from educational to fun",
      image: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=300&fit=crop",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: <Home className="w-10 h-10" />,
      title: "Home & Living",
      description: "Everything to make your house a home",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      color: "from-rose-500 to-red-500"
    },
    {
      icon: <Sparkles className="w-10 h-10" />,
      title: "Beauty & Wellness",
      description: "Self-care products for your health and beauty needs",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
      color: "from-violet-500 to-purple-500"
    }
  ];

  const platformFeatures = [
    {
      number: "01",
      title: "Unified Shopping",
      description: "One platform for all your needs - from groceries to gadgets"
    },
    {
      number: "02",
      title: "Quality Assured",
      description: "Rigorous quality checks across all product categories"
    },
    {
      number: "03",
      title: "Fast Delivery",
      description: "Quick and reliable shipping for all your orders"
    },
    {
      number: "04",
      title: "Best Prices",
      description: "Competitive pricing with regular deals and discounts"
    }
  ];

  const philosophyPrinciples = [
    {
      icon: <Compass className="w-12 h-12" />,
      title: "Universal Excellence",
      description: "Maintaining the highest standards across all product categories we offer.",
      gradient: "from-purple-600 to-blue-600"
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Diverse Selection",
      description: "Curating the perfect blend of everyday essentials and luxury items.",
      gradient: "from-emerald-600 to-cyan-600"
    },
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: "Innovative Platform",
      description: "Creating seamless shopping experiences through technology and innovation.",
      gradient: "from-amber-600 to-orange-600"
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Trust & Reliability",
      description: "Building relationships based on consistent quality and service excellence.",
      gradient: "from-rose-600 to-pink-600"
    }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 mt-10 pb-16 bg-gradient-to-br from-purple-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-2xl opacity-20"></div>
                <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center">
                  <Crown className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Complete <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Shopping Destination</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Welcome to <span className="font-semibold text-purple-600">RS-LEGACY</span>, where quality meets convenience across every category. 
              From daily essentials to luxury items, we bring the world's best products to your doorstep.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/Product"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Explore All Categories
              </Link>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300">
                Our Story
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-100 rounded-2xl -z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-100 rounded-2xl -z-10"></div>
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=600&fit=crop"
                  alt="Our Marketplace"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <p className="text-sm opacity-90">One platform, endless possibilities</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 text-purple-600 mb-4">
                <Gem className="w-6 h-6" />
                <span className="font-semibold">Our Vision</span>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900">
                Redefining <span className="text-purple-600">E-Commerce</span> Excellence
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                RS-LEGACY is more than just a marketplace—it's your trusted partner for all shopping needs. 
                We've created a platform where quality, variety, and convenience come together to deliver 
                exceptional experiences across every product category.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Truck className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Fast Delivery</h4>
                      <p className="text-sm text-gray-600">Across all categories</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Quality Assured</h4>
                      <p className="text-sm text-gray-600">100% verified products</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Our <span className="text-purple-600">Categories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need, all in one place. Discover our carefully curated selection across multiple categories
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-20`}></div>
                    <div className="absolute top-4 left-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-white`}>
                        {category.icon}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{category.description}</p>
                    <button className="mt-4 text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                      Shop Now →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-purple-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our multi-category marketplace
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100"
              >
                <div className="text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-purple-600">RS-LEGACY</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference of a truly comprehensive shopping platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {platformFeatures.map((feature, index) => (
              <motion.div
                key={feature.number}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="text-4xl font-bold text-purple-600 mb-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  {feature.number}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-purple-600">Philosophy</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Guiding principles that shape our multi-category marketplace
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {philosophyPrinciples.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group text-center"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-100 rounded-2xl transform rotate-6 group-hover:rotate-3 transition-transform duration-500"></div>
                  <div className={`relative bg-gradient-to-r ${principle.gradient} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {principle.icon}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{principle.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{principle.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Philosophy Quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
              <ShoppingCart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <blockquote className="text-2xl font-light text-gray-700 italic mb-4">
                "Great shopping isn't about finding what you need—it's about discovering what you love, all in one place."
              </blockquote>
              <p className="text-gray-500 font-semibold">— RS-LEGACY Shopping Philosophy</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Reach Statement */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Globe className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              "One Platform, Endless Possibilities"
            </h2>
            <p className="text-xl text-purple-200 mb-8">
              From daily groceries to luxury electronics, from children's toys to home essentials— 
              RS-LEGACY brings the world's marketplace to your fingertips with uncompromising quality and service.
            </p>
            <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "500K+", label: "Happy Customers", icon: <Users className="w-8 h-8" /> },
              { number: "50+", label: "Product Categories", icon: <ShoppingBag className="w-8 h-8" /> },
              { number: "1M+", label: "Products Available", icon: <Sparkles className="w-8 h-8" /> },
              { number: "4.9/5", label: "Customer Rating", icon: <Star className="w-8 h-8" /> }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300 inline-flex">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Explore <span className="text-yellow-300">RS-LEGACY</span>?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have discovered the convenience of comprehensive shopping
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/Product"
                className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop All Categories
              </Link>
              <Link
                href="/contact"
                className="border border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 RS-LEGACY. Your complete shopping destination for quality products across all categories.
          </p>
        </div>
      </section>
    </>
  );
}