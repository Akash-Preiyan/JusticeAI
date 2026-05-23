import React from 'react';
import { CheckCircle } from 'lucide-react';
import Legalresearch from '../../assets/research-icon.jpg'
import Decision from "../../assets/decision-icon.jpg"
import prediction from '../../assets/prediction-icon.jpg'

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      badge: 'Feature 1',
      title: 'Case Prediction Engine',
      subtitle: 'Data-driven outcome forecasting with 95% accuracy',
      points: [
        'Predict case outcomes based on 100,000+ Indian judgments',
        'Settlement strategy with probability-based positions',
        'Resource planning with timeline-based forecasting',
        'Client management with realistic expectations'
      ],
      stat: '95%',
      statLabel: 'Prediction Accuracy',
      imageBg: 'bg-gradient-to-br from-amber-700 to-red-900',
      imageAlt: prediction
    },
    {
      id: 2,
      badge: 'Feature 2',
      title: 'Legal Research Assistant',
      subtitle: 'Comprehensive research in minutes, not hours',
      points: [
        'Semantic search across entire Indian case law corpus',
        'Multi-language NLP for regional judgments',
        'Automated citation validation and relevance scoring',
        'Get AI-Based Legal assistance'
      ],
      stat: '90%',
      statLabel: 'Time Saved',
      imageBg: 'bg-gradient-to-br from-amber-700 to-red-900',
      imageAlt: Legalresearch,
    },
    {
      id: 3,
      badge: 'Feature 3',
      title: 'Judicial Decision Support',
      subtitle: 'AI-powered assistance for faster, consistent judgments',
      points: [
        'Precedent matrix with similar case outcomes',
        'Real-time precedent access during hearings',
        'Sentencing analytics from comparable cases',
        '2x more cases processed daily'
      ],
      stat: '2x',
      statLabel: 'Efficiency Gain',
      imageBg: 'bg-gradient-to-br from-amber-700 to-red-900',
      imageAlt: Decision
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Three Core Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive AI solutions designed specifically for Indian legal professionals
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-16">
          {features.map((feature, idx) => {
            const isReverse = idx % 2 === 1;
            
            return (
              <div 
                key={feature.id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
              >
                <div className={`grid lg:grid-cols-2 gap-0 ${isReverse ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Content Side */}
                  <div className={`p-8 md:p-12 ${isReverse ? 'lg:order-2' : ''}`}>
                    <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                      {feature.badge}
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-lg text-gray-600 mb-6">
                      {feature.subtitle}
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      {feature.points.map((point, i) => (
                        <div key={i} className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{point}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 flex items-end justify-between">
                      <div>
                        <div className="text-5xl font-bold text-red-900 mb-1">
                          {feature.stat}
                        </div>
                        <div className="text-gray-600">
                          {feature.statLabel}
                        </div>
                      </div>
                      
                      <button className="border-2 border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg hover:border-red-900 hover:text-red-900 transition-colors flex items-center font-medium">
                        Learn More
                        <span className="ml-2">→</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Image Side */}
                  <div className={`${feature.imageBg} p-8 md:p-12 flex items-center justify-center ${isReverse ? 'lg:order-1' : ''}`}>
                    <div className="w-full max-w-md aspect-square flex items-center justify-center">
                      <img 
                        src={feature.imageAlt}
                        alt={feature.imageAlt}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}