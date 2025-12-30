import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Gem, Award, Ruler } from 'lucide-react';

const Guides = () => {
  const { type } = useParams();

  if (!type) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center" style={{fontFamily: 'Playfair Display'}}>
            Jewellery Buying Guides
          </h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Expert insights to help you make informed decisions about your jewelry purchase
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/guides/diamond" className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#C9A961]/10 rounded-full flex items-center justify-center mb-4">
                <Gem className="h-8 w-8 text-[#C9A961]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Diamond Guide</h3>
              <p className="text-sm text-gray-600">Learn about the 4Cs and how to choose the perfect diamond</p>
            </Link>

            <Link to="/guides/gemstone" className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#C9A961]/10 rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-[#C9A961]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gemstone Guide</h3>
              <p className="text-sm text-gray-600">Explore precious and semi-precious gemstones</p>
            </Link>

            <Link to="/guides/metal" className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#C9A961]/10 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-[#C9A961]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Metal Guide</h3>
              <p className="text-sm text-gray-600">Understanding gold purity, karats, and metal colors</p>
            </Link>

            <Link to="/guides/ring-size" className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#C9A961]/10 rounded-full flex items-center justify-center mb-4">
                <Ruler className="h-8 w-8 text-[#C9A961]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ring Size Guide</h3>
              <p className="text-sm text-gray-600">Find your perfect ring size with our easy guide</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const guides = {
    diamond: {
      title: 'Diamond Buying Guide',
      content: [
        {
          heading: 'The 4Cs of Diamonds',
          text: 'Understanding Cut, Color, Clarity, and Carat weight is essential for choosing the perfect diamond.'
        },
        {
          heading: 'Cut',
          text: 'The cut determines how well a diamond reflects light. Excellent and Very Good cuts offer maximum brilliance.'
        },
        {
          heading: 'Color',
          text: 'Diamonds are graded from D (colorless) to Z (light yellow). D-F grades are considered colorless and most valuable.'
        },
        {
          heading: 'Clarity',
          text: 'Clarity refers to internal inclusions. FL (Flawless) to IF (Internally Flawless) are the highest grades.'
        },
        {
          heading: 'Carat',
          text: 'Carat measures the weight of the diamond. Larger diamonds are rarer and more valuable per carat.'
        }
      ]
    },
    gemstone: {
      title: 'Gemstone Guide',
      content: [
        {
          heading: 'Popular Gemstones',
          text: 'Ruby, Sapphire, Emerald, and Pearl are among the most sought-after gemstones for jewelry.'
        },
        {
          heading: 'Ruby',
          text: 'Known as the "King of Gems," rubies symbolize passion and are perfect for special occasions.'
        },
        {
          heading: 'Sapphire',
          text: 'Available in various colors, blue sapphire is the most popular and symbolizes wisdom.'
        },
        {
          heading: 'Emerald',
          text: 'Prized for their rich green color, emeralds represent growth and renewal.'
        }
      ]
    },
    metal: {
      title: 'Metal & Purity Guide',
      content: [
        {
          heading: 'Gold Purity',
          text: '24K is pure gold (99.9%), while 22K, 18K, and 14K have varying percentages of other metals for durability.'
        },
        {
          heading: '22 Karat Gold',
          text: '91.6% pure gold - ideal for traditional Indian jewelry and investment pieces.'
        },
        {
          heading: '18 Karat Gold',
          text: '75% pure gold - offers a good balance of purity and strength for intricate designs.'
        },
        {
          heading: 'Metal Colors',
          text: 'Yellow gold is traditional, white gold is modern and versatile, rose gold offers a romantic appeal.'
        },
        {
          heading: 'Silver',
          text: '925 sterling silver is the standard for jewelry, containing 92.5% pure silver.'
        }
      ]
    },
    'ring-size': {
      title: 'Ring Size Guide',
      content: [
        {
          heading: 'Measuring at Home',
          text: 'Measure an existing ring that fits well or use a string to measure your finger circumference.'
        },
        {
          heading: 'Best Time to Measure',
          text: 'Measure your finger at the end of the day when it is at its largest size.'
        },
        {
          heading: 'Temperature Matters',
          text: 'Fingers can swell in heat and shrink in cold. Measure in normal room temperature.'
        },
        {
          heading: 'Visit Our Store',
          text: 'For the most accurate sizing, visit any of our stores for professional measurement.'
        }
      ]
    }
  };

  const guide = guides[type];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/guides" className="text-[#C9A961] hover:underline mb-4 inline-block">
          ← Back to all guides
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-8" style={{fontFamily: 'Playfair Display'}}>
          {guide.title}
        </h1>

        <div className="space-y-8">
          {guide.content.map((section, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>
              <p className="text-gray-700 leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#C9A961]/10 p-8 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Need More Help?</h3>
          <p className="text-gray-700 mb-4">
            Our jewelry experts are here to guide you through your purchase. Book a consultation for personalized advice.
          </p>
          <Link to="/book-appointment" className="btn-gold px-6 py-3 text-white inline-block">
            Book Consultation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Guides;
