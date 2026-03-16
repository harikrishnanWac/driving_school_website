'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Check } from 'lucide-react';
import { PricingBackground } from './SectionBackgrounds';

const plans = [
  {
    name: "Beginner Plan",
    price: "$299",
    description: "Perfect for completely new learners",
    features: [
      "10 Driving Sessions",
      "Basic Road Training",
      "Traffic Rules Theory",
      "Parking Practice",
      "Dual Control Vehicle"
    ],
    popular: false
  },
  {
    name: "Standard Plan",
    price: "$499",
    description: "Our most chosen comprehensive package",
    features: [
      "20 Driving Sessions",
      "Highway Training",
      "Parking + Reverse Driving",
      "Night Driving Basics",
      "Mock Driving Test"
    ],
    popular: true
  },
  {
    name: "Premium Plan",
    price: "$699",
    description: "End-to-end guidance until you get licensed",
    features: [
      "30 Driving Sessions",
      "Highway + City Driving",
      "Test Preparation",
      "License Guidance & Support",
      "Pick & Drop Service"
    ],
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section id="packages" className="py-24 bg-gray-50 relative overflow-hidden">
      <PricingBackground />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-2 text-primary font-bold tracking-wider uppercase text-sm">Driving Packages</div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose the Right Plan for You
          </h2>
          <p className="text-gray-600 text-lg">
            We offer flexible and affordable packages tailored to your current experience level. All plans include one-on-one training with certified instructors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`relative ${plan.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                  <span className="bg-secondary text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    Most Popular
                  </span>
                </div>
              )}
              <Card hoverEffect className={`h-full flex flex-col ${plan.popular ? 'border-2 border-secondary shadow-xl relative z-0' : ''}`}>
                <div className="p-8 pb-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mb-6">{plan.description}</p>
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50/50 p-8 flex-grow flex flex-col justify-between border-t border-gray-100 mt-4">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1 bg-green-100 text-green-600 rounded-full p-0.5">
                          <Check size={14} strokeWidth={3} />
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a href="#contact" onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('select-plan', { detail: plan.name }));
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    <Button
                      variant={plan.popular ? 'primary' : 'outline'}
                      size="lg"
                      fullWidth
                      className={plan.popular ? 'shadow-lg shadow-primary/25' : 'bg-white'}
                    >
                      Enroll in {plan.name}
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
