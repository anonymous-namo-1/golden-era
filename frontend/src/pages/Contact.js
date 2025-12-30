import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '../services/api';
import { toast } from '../hooks/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long')
});

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      await api.post(`/contact`, data);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setSubmitted(true);
      reset();
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center" style={{fontFamily: 'Playfair Display'}}>
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Have a question? We're here to help. Reach out to us and we'll get back to you as soon as possible.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-[#C9A961] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-gray-600">+91 1800 123 4567</p>
                    <p className="text-sm text-gray-500">Mon-Sat, 10 AM - 8 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-[#C9A961] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-gray-600">support@thegoldenera.in</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-[#C9A961] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Head Office</h3>
                    <p className="text-gray-600">123 Fashion Street, Fort<br />Mumbai - 400001, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Saturday</span>
                  <span className="font-medium">10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">11:00 AM - 7:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-gray-600">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`w-full border rounded px-4 py-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    {...register('email')}
                    className={`w-full border rounded px-4 py-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone *</label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className={`w-full border rounded px-4 py-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="10 digit number"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message *</label>
                  <textarea
                    {...register('message')}
                    rows="5"
                    className={`w-full border rounded px-4 py-2 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" className="w-full btn-gold px-6 py-3 text-white font-medium">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
