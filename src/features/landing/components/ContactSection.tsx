'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import EnquiryForm from './EnquiryForm';
import { ContactBackground } from './SectionBackgrounds';

const contactInfo = [
  {
    icon: <MapPin className="text-primary" size={24} />,
    title: "Our Location",
    content: "Elenthikkara, Puthenveli, Ernakulam-683594, Kerala"
  },
  {
    icon: <Phone className="text-primary" size={24} />,
    title: "Phone Number",
    content: "+1 (555) 123-4567"
  },
  {
    icon: <Mail className="text-primary" size={24} />,
    title: "Email Address",
    content: "info@safedrive.com"
  },
  {
    icon: <Clock className="text-primary" size={24} />,
    title: "Working Hours",
    content: "Mon - Sat: 8:00 AM - 6:00 PM"
  }
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-blue-50/50 z-0 hidden lg:block rounded-r-[100px]"></div>
      <ContactBackground />

      <div className="container mx-auto px-4 md:px-6 z-10 relative">
        <div className="mb-16">
          <div className="mb-2 text-primary font-bold tracking-wider uppercase text-sm">Get In Touch</div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Start Your Journey Today
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          <div className="lg:w-1/3 space-y-10">
            <p className="text-gray-600 text-lg leading-relaxed">
              Have questions about our pricing, schedules, or vehicles? Reach out to our friendly team. We&apos;re here to help you get behind the wheel.
            </p>
            
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-primary">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{info.title}</h4>
                    <p className="text-gray-600">{info.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Map Placeholder */}
            <div className="w-full h-48 bg-gray-200 rounded-3xl overflow-hidden relative shadow-inner border border-gray-100">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                <span className="text-gray-500 font-medium flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <MapPin size={20} className="text-red-500" /> Serving Downtown & Suburbs
                </span>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 lg:-mt-10 z-20">
            <EnquiryForm />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
