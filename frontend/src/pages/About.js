import React from 'react';
import { Award, Shield, Heart, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{fontFamily: 'Playfair Display'}}>
            About The Golden Era
          </h1>
          <p className="text-lg text-gray-600">
            Celebrating the art of fine jewelry with heritage craft and modern elegance since our inception.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6" style={{fontFamily: 'Playfair Display'}}>Our Story</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              The Golden Era was born from a passion for timeless jewelry and a commitment to excellence. We believe that every piece of jewelry tells a story, celebrates a moment, and becomes a cherished heirloom for generations to come.
            </p>
            <p>
              Our journey began with a simple vision: to create jewelry that combines traditional craftsmanship with contemporary design. Today, we are proud to be one of India's most trusted jewelry brands, serving customers across the country with our commitment to purity, transparency, and exceptional service.
            </p>
            <p>
              Every piece in our collection is crafted with meticulous attention to detail by skilled artisans who have honed their craft over decades. We source only the finest materials and ensure that every diamond, gemstone, and piece of gold meets our stringent quality standards.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{fontFamily: 'Playfair Display'}}>Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C9A961]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-[#C9A961]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Authenticity</h3>
              <p className="text-sm text-gray-600">100% certified gold and diamonds with complete transparency</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C9A961]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[#C9A961]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Excellence</h3>
              <p className="text-sm text-gray-600">Uncompromising quality in every piece we create</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C9A961]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-[#C9A961]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Trust</h3>
              <p className="text-sm text-gray-600">Building lasting relationships with our customers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C9A961]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#C9A961]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Service</h3>
              <p className="text-sm text-gray-600">Dedicated to exceeding customer expectations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6" style={{fontFamily: 'Playfair Display'}}>Our Craftsmanship</h2>
          <p className="text-gray-700 mb-6">
            Each piece of jewelry is a testament to the skill and dedication of our master craftsmen. Combining time-honored techniques with modern technology, we create pieces that are both beautiful and durable. From the initial design sketch to the final polish, every step is executed with precision and care.
          </p>
          <p className="text-gray-700">
            Our commitment to sustainability and ethical sourcing ensures that our jewelry not only looks beautiful but also aligns with your values. We believe in creating jewelry that you can wear with pride, knowing it was made with integrity and respect for both people and the planet.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
