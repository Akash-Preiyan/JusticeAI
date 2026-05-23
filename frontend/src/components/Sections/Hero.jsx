import React from 'react';
import { Link } from 'react-router-dom';


export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-orange-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Revolutionizing Indian Legal System
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Intelligent Technology for{' '}
              <span className="text-red-900">Justice</span>{' '}
              <span className="text-orange-600">Delivery</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              AI-powered platform designed specifically for the Indian legal ecosystem. 
              Reduce case analysis time by 90% with predictive analytics and comprehensive legal research.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
              to="/signup" 
              className="bg-red-900 text-white px-8 py-3 rounded-lg hover:bg-red-800 transition-colors flex items-center justify-center font-medium"
            >
              Start Now
            </Link>
            </div>
            

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl font-bold text-red-900 mb-1">1000+</div>
                <div className="text-sm text-gray-600">Indian Law Sections</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-900 mb-1">95%</div>
                <div className="text-sm text-gray-600">Prediction Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-900 mb-1">100K+</div>
                <div className="text-sm text-gray-600">Legal Documents Parsed for Training</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop"
                alt="Lady Justice with sunset and courthouse"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: '4/3' }}
              />
              {/* Overlay gradient for better visual */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 to-orange-900/20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}