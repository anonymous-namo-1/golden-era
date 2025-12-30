import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, RefreshCw, Sparkles, Star } from 'lucide-react';
import { initScrollAnimations } from '../utils/scrollAnimations';

const Home = () => {
  useEffect(() => {
    const observer = initScrollAnimations();
    return () => observer.disconnect();
  }, []);

  const categories = [
    { name: 'Gold', img: 'https://images.pexels.com/photos/10117812/pexels-photo-10117812.jpeg', link: '/shop?metal=Gold' },
    { name: 'Silver', img: 'https://images.pexels.com/photos/8084610/pexels-photo-8084610.jpeg', link: '/shop?metal=Silver' },
    { name: 'Diamond', img: 'https://images.pexels.com/photos/10117812/pexels-photo-10117812.jpeg', link: '/shop?metal=Diamond' },
    { name: 'Bridal', img: 'https://images.pexels.com/photos/8084610/pexels-photo-8084610.jpeg', link: '/shop?occasion=Wedding' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="hero-section relative px-4">
        <div className="hero-bg" />
        <div className="max-w-7xl mx-auto text-center relative z-10 py-24 md:py-40 backdrop-blur-[2px] bg-white/5 rounded-3xl px-6">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg animate-slide-up">
            <Star className="h-4 w-4 text-[#C9A961] fill-current" />
            <span className="text-sm font-medium text-gray-700">Trusted by 50,000+ customers</span>
            <Star className="h-4 w-4 text-[#C9A961] fill-current" />
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight animate-slide-up" style={{fontFamily: 'Playfair Display', animationDelay: '0.2s'}} data-testid="hero-heading">
            Heritage Craft.<br />Modern Elegance.
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '0.4s'}}>
            Discover timeless jewelry crafted with passion, celebrating your most precious moments with unmatched artistry.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{animationDelay: '0.6s'}}>
            <Link to="/shop?metal=Gold" className="btn-primary text-white font-medium inline-flex items-center justify-center group" data-testid="shop-gold-btn">
              Shop Gold 
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/shop?metal=Silver" className="btn-secondary text-gray-900 font-medium inline-block" data-testid="shop-silver-btn">
              Shop Silver
            </Link>
            <Link to="/book-appointment" className="btn-outline inline-block">
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-4 section-luxury-bg relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-animate">
            <div className="decorative-line"></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{fontFamily: 'Playfair Display'}}>
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our curated collections crafted for every occasion and style
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((cat, idx) => (
              <Link 
                key={idx} 
                to={cat.link} 
                className={`category-card group relative aspect-square shadow-lg scroll-animate-scale stagger-${idx + 1}`}
                data-testid={`category-${cat.name.toLowerCase()}`}
              >
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 z-10">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 group-hover:mb-4 transition-all" style={{fontFamily: 'Playfair Display'}}>{cat.name}</h3>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[#C9A961] text-sm font-medium inline-flex items-center">
                      Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-4 section-with-overlay relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 scroll-animate">
            <div className="decorative-line"></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{fontFamily: 'Playfair Display'}}>
              The Golden Era Assurance
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every piece comes with our unwavering commitment to quality and authenticity
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Purity Guarantee', desc: '100% certified authentic gold and diamonds', delay: '0.1s' },
              { icon: Award, title: 'Transparent Pricing', desc: 'Complete price breakup with every purchase', delay: '0.2s' },
              { icon: Sparkles, title: 'Lifetime Maintenance', desc: 'Free cleaning and polishing services', delay: '0.3s' },
              { icon: RefreshCw, title: 'Easy Returns', desc: '30-day hassle-free return policy', delay: '0.4s' }
            ].map((item, idx) => (
              <div key={idx} className="premium-card text-center scroll-animate" style={{transitionDelay: item.delay}}>
                <div className="icon-wrapper mx-auto mb-6">
                  <item.icon className="h-8 w-8 text-[#C9A961]" />
                </div>
                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-animate">
            <div className="decorative-line"></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{fontFamily: 'Playfair Display'}}>
              Experience Excellence
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive services designed to make your jewelry journey seamless
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { to: '/stores', title: 'Store Locator', desc: 'Find our stores near you' },
              { to: '/book-appointment', title: 'Book Appointment', desc: 'Personalized consultation' },
              { to: '/gold-exchange', title: 'Old Gold Exchange', desc: 'Get best value for your gold' },
              { to: '/guides', title: 'Jewellery Guides', desc: 'Expert buying guides' }
            ].map((service, idx) => (
              <Link 
                key={idx}
                to={service.to} 
                className={`premium-card hover:bg-gradient-to-br hover:from-[#C9A961]/5 hover:to-transparent scroll-animate-scale stagger-${idx + 1}`}
              >
                <h3 className="font-bold text-xl mb-3">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{service.desc}</p>
                <span className="text-[#C9A961] text-sm font-medium inline-flex items-center group">
                  Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
