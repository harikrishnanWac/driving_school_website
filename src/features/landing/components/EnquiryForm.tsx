'use client';

import React, { useState, useRef } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const EnquiryForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      // Gather form data to send to our Next.js API route
      const formData = new FormData(formRef.current);
      const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        plan: formData.get('plan'),
        message: formData.get('message'),
      };

      const response = await fetch('/api/send-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send enquiry');
      }
      
      setStatus('success');
      formRef.current.reset();
      
      // Auto reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send your request. Please try again later.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-green-100 flex flex-col items-center justify-center text-center h-[500px]">
        <CheckCircle2 className="w-20 h-20 text-green-500 mb-6 drop-shadow-sm" />
        <h4 className="text-2xl font-bold text-gray-900 mb-3">Enquiry Sent!</h4>
        <p className="text-gray-600 max-w-sm">Thank you for reaching out. We have received your details and will contact you shortly to confirm your booking.</p>
        <Button 
          variant="outline" 
          className="mt-8"
          onClick={() => setStatus('idle')}
        >
          Send Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-50">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Your Session</h3>
        <p className="text-gray-600">Fill out the form below and our team will get back to you shortly.</p>
      </div>

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-red-700 text-sm">{errorMessage}</p>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            name="name"
            label="Full Name" 
            placeholder="John Doe" 
            disabled={status === 'loading'}
            required 
          />
          <Input 
            name="phone"
            label="Phone Number" 
            type="tel" 
            placeholder="(555) 123-4567" 
            disabled={status === 'loading'}
            required 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            name="email"
            label="Email Address" 
            type="email" 
            placeholder="john@example.com" 
            disabled={status === 'loading'}
            required 
          />
          
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 ml-1">Preferred Course</label>
            <select 
              name="plan"
              className="w-full px-4 py-3 rounded-xl border bg-gray-50/50 border-gray-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 appearance-none disabled:opacity-50 text-black"
              disabled={status === 'loading'}
              required
            >
              <option value="">Select a course</option>
              <option value="Beginner Plan">Beginner Plan</option>
              <option value="Standard Plan">Standard Plan</option>
              <option value="Premium Plan">Premium Plan</option>
              <option value="Trial Class">Trial Class</option>
            </select>
          </div>
        </div>
        
        <Input 
          name="message"
          label="Message" 
          placeholder="Tell us about your driving experience or any specific requirements..." 
          disabled={status === 'loading'}
          multiline 
          rows={4} 
          required
        />
        
        <Button 
          type="submit" 
          size="lg" 
          fullWidth 
          disabled={status === 'loading'}
          className="mt-2 text-white shadow-xl shadow-primary/20 gap-2 font-semibold tracking-wide disabled:opacity-80"
        >
          {status === 'loading' ? (
            <>Sending... <Loader2 size={18} className="animate-spin" /></>
          ) : (
            <>Submit Enquiry <Send size={18} /></>
          )}
        </Button>
      </form>
    </div>
  );
};

export default EnquiryForm;
