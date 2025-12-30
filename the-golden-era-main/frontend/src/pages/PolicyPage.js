import React from 'react';

const PolicyPage = ({ type }) => {
  const policies = {
    shipping: {
      title: 'Shipping & Delivery Policy',
      content: [
        {
          heading: 'Shipping',
          text: 'We offer free shipping on all orders across India. All orders are insured during transit for your peace of mind.'
        },
        {
          heading: 'Delivery Timeline',
          text: 'Orders are typically delivered within 5-7 business days. For custom or made-to-order pieces, delivery may take 2-3 weeks.'
        },
        {
          heading: 'Tracking',
          text: 'You will receive a tracking number via email once your order is shipped. You can track your order status anytime.'
        },
        {
          heading: 'Store Pickup',
          text: 'Choose store pickup at checkout to collect your order from any of our stores at your convenience.'
        }
      ]
    },
    returns: {
      title: 'Returns & Exchange Policy',
      content: [
        {
          heading: '30-Day Return Policy',
          text: 'We offer a hassle-free 30-day return policy on all products. Items must be in original condition with tags and certificates.'
        },
        {
          heading: 'Exchange',
          text: 'Exchange your jewelry for a different size, design, or product within 30 days of purchase.'
        },
        {
          heading: 'Refund Process',
          text: 'Refunds are processed within 7-10 business days after we receive the returned item. Original payment method will be credited.'
        },
        {
          heading: 'Custom Orders',
          text: 'Custom-made or personalized items cannot be returned or exchanged unless there is a manufacturing defect.'
        }
      ]
    },
    privacy: {
      title: 'Privacy Policy',
      content: [
        {
          heading: 'Information Collection',
          text: 'We collect information necessary to process your orders and provide better service, including name, contact details, and shipping address.'
        },
        {
          heading: 'Data Security',
          text: 'Your personal information is encrypted and stored securely. We never share your data with third parties without consent.'
        },
        {
          heading: 'Cookies',
          text: 'We use cookies to enhance your browsing experience and analyze website traffic. You can disable cookies in your browser settings.'
        },
        {
          heading: 'Your Rights',
          text: 'You have the right to access, modify, or delete your personal information at any time by contacting us.'
        }
      ]
    },
    terms: {
      title: 'Terms & Conditions',
      content: [
        {
          heading: 'Acceptance of Terms',
          text: 'By using our website and services, you agree to these terms and conditions.'
        },
        {
          heading: 'Product Information',
          text: 'We strive to display accurate product information. However, slight variations in color and design may occur.'
        },
        {
          heading: 'Pricing',
          text: 'All prices are in Indian Rupees and include GST. Prices are subject to change without notice based on gold rates.'
        },
        {
          heading: 'Payment',
          text: 'We accept various payment methods. All transactions are processed securely.'
        },
        {
          heading: 'Limitation of Liability',
          text: 'The Golden Era is not liable for any indirect or consequential damages arising from the use of our products or services.'
        }
      ]
    }
  };

  const policy = policies[type];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8" style={{fontFamily: 'Playfair Display'}}>
          {policy.title}
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {policy.content.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>
              <p className="text-gray-700 leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Have questions about our policies?</p>
          <a href="/contact" className="text-[#C9A961] hover:underline font-medium">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
