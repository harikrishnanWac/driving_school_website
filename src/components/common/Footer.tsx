import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Car } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white mb-6">
              <div className="bg-primary p-2 rounded-xl">
                <Car size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight">SafeDrive</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Empowering students with the skills and confidence to drive safely. Join thousands of successful learners today.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About Us', href: '#about' },
                { name: 'Driving Packages', href: '#packages' },
                { name: 'Instructors', href: '#instructors' },
                { name: 'Testimonials', href: '#testimonials' },
                { name: 'Blog', href: '/blog' },
                { name: 'Contact Us', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-secondary transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Our Courses</h4>
            <ul className="space-y-3">
              {['Beginner Training', 'Highway Driving', 'Defensive Driving', 'Refresh Course', 'Car Renting (Test)'].map((course) => (
                <li key={course}>
                  <a href="#packages" className="text-gray-400 hover:text-secondary transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
                    {course}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 group">
                <div className="bg-gray-800 p-2.5 rounded-lg group-hover:bg-primary transition-colors text-gray-400 group-hover:text-white mt-0.5">
                  <MapPin size={18} />
                </div>
                <div>
                  <h5 className="text-white text-sm font-medium mb-1">Our Location</h5>
                  <p className="text-gray-400 text-sm">Elenthikkara, Puthenveli, Ernakulam-683594, Kerala</p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="bg-gray-800 p-2.5 rounded-lg group-hover:bg-primary transition-colors text-gray-400 group-hover:text-white mt-0.5">
                  <Phone size={18} />
                </div>
                <div>
                  <h5 className="text-white text-sm font-medium mb-1">Phone Number</h5>
                  <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="bg-gray-800 p-2.5 rounded-lg group-hover:bg-primary transition-colors text-gray-400 group-hover:text-white mt-0.5">
                  <Mail size={18} />
                </div>
                <div>
                  <h5 className="text-white text-sm font-medium mb-1">Email Address</h5>
                  <p className="text-gray-400 text-sm">info@safedrive.com</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-sm">
          <p>&copy; {new Date().getFullYear()} SafeDrive Driving School. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
