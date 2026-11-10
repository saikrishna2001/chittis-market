import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { toast } from 'sonner';

import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [activeFaq, setActiveFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Message sent successfully! 🌱', {
      description: 'Our customer support team will get back to you within 2 business hours.',
    });
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const faqs = [
    {
      q: 'How do you ensure produce is truly 100% organic and fresh?',
      a: 'We partner directly with certified organic farms (NPOP / Jaivik Bharat accredited). We test random batches for 200+ chemical pesticide residues every month. Produce is harvested at 5:00 AM daily and stored in climate-controlled hubs without carbide.',
    },
    {
      q: 'What is your delivery timing and charges?',
      a: 'We deliver within 45 to 60 minutes for express orders, and offer 3 scheduled daily slots (Morning 7-10 AM, Afternoon 1-4 PM, Evening 5-8 PM). Delivery is 100% FREE on all orders above ₹499.',
    },
    {
      q: 'What if I receive a bruised fruit or spoiled vegetable?',
      a: 'We offer an unconditional 100% Happiness Guarantee. Simply drop a message on WhatsApp or click "Help" on your order within 24 hours with a quick photo. We issue an instant replacement or full credit with zero questions asked.',
    },
    {
      q: 'Can I customize the contents of the Fruit and Vegetable Baskets?',
      a: 'Yes! When ordering a weekly basket or celebratory hamper, you can add notes in the special instructions box (e.g. "replace papaya with extra oranges" or "include extra baby spinach").',
    },
  ];

  return (
    <div className="min-h-screen py-8 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Contact Us & Customer Support' }]} />

        <div className="my-6 pb-4 border-b border-emerald-100">
          <h1 className="text-3xl font-extrabold text-brand-dark font-serif">
            Get in Touch With Us
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
            We are always here to help with your grocery orders, farm questions, or corporate gifting
          </p>
        </div>

        {/* 2-Column: Left Info & Form (8 Cols) + Right FAQ (4 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
          {/* Left Column: Form & Contact details (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Quick Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-soft-sm space-y-1">
                <Phone className="w-5 h-5 text-brand-primary mb-2" />
                <h4 className="font-bold text-xs text-brand-dark">Direct Phone Line</h4>
                <p className="text-[11px] text-brand-muted">+91 (040) 8000-CHITTI</p>
                <p className="text-[10px] text-emerald-700 font-semibold">6 AM - 10 PM Daily</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-soft-sm space-y-1">
                <Mail className="w-5 h-5 text-brand-fresh mb-2" />
                <h4 className="font-bold text-xs text-brand-dark">Email Support</h4>
                <p className="text-[11px] text-brand-muted">care@chittismarket.com</p>
                <p className="text-[10px] text-emerald-700 font-semibold">Quick 2hr Response</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-soft-sm space-y-1">
                <MapPin className="w-5 h-5 text-brand-orange mb-2" />
                <h4 className="font-bold text-xs text-brand-dark">Flagship Hub</h4>
                <p className="text-[11px] text-brand-muted">Jubilee Hills, Rd 36</p>
                <p className="text-[10px] text-emerald-700 font-semibold">Hyderabad, TS 500033</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-soft-sm space-y-4">
              <h3 className="font-bold text-xl text-brand-dark font-serif">
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Your Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sravan Kumar"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Email Address *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Phone Number</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91..."
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Subject</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Question about Mango Pre-orders"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you need help with..."
                    className="w-full p-3 text-xs rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-fresh"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="rounded-full gap-2 px-8 font-bold shadow-fresh">
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column: FAQs (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-soft-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-emerald-100">
                <HelpCircle className="w-5 h-5 text-brand-primary" />
                <h3 className="font-bold text-lg text-brand-dark font-serif">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-3" id="faqs">
                {faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-emerald-100 rounded-2xl overflow-hidden bg-brand-surface"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full p-3.5 text-left flex items-center justify-between text-xs font-bold text-brand-dark hover:text-brand-primary transition-colors"
                      >
                        <span className="pr-2">{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-brand-primary shrink-0 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-3.5 pb-3.5 text-xs text-brand-muted leading-relaxed border-t border-emerald-100/60 pt-2">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
