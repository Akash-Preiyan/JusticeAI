import React from 'react';
import { Database, MapPin, Target, Shield, Server, CheckCircle, X } from 'lucide-react';

export default function Comparison() {
  const differentiators = [
    {
      icon: Database,
      title: 'Legal Database Foundation',
      justiceAI: 'Licensed access to SCC, Manupatra, Indian Kanoon databases',
      genericAI: 'Web-scale general knowledge, no legal database licensing',
      impact: 'Verified citations vs hallucinated references'
    },
    {
      icon: MapPin,
      title: 'Indian Legal Specialization',
      justiceAI: 'Exclusive focus on Indian Constitution, IPC, CrPC, CPC, Evidence Act',
      genericAI: 'Global legal principles with Indian law as minor component',
      impact: 'Procedural accuracy vs conceptual confusion'
    },
    {
      icon: Target,
      title: 'Prediction Capability',
      justiceAI: 'ML models trained on 100,000+ case outcome patterns',
      genericAI: 'No training on case outcomes, cannot predict probabilities',
      impact: 'Strategic planning vs generic advice'
    },
    {
      icon: Shield,
      title: 'Ethical Compliance',
      justiceAI: 'Built around Bar Council of India guidelines',
      genericAI: 'General ethics, not legal professional conduct rules',
      impact: 'Professional compliance vs ethical risks'
    },
    {
      icon: Server,
      title: 'Data Sovereignty',
      justiceAI: 'Indian servers, compliant with data protection regulations',
      genericAI: 'US-based servers, subject to foreign jurisdiction',
      impact: 'Client confidentiality protection vs privacy risks'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose JusticeAI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Critical differentiators that set us apart from generic AI solutions
          </p>
        </div>

        {/* Differentiators List */}
        <div className="space-y-6">
          {differentiators.map((diff, idx) => {
            const Icon = diff.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-red-900 transition-colors"
              >
                <div className="grid lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-3 bg-gray-50 p-6 lg:p-8 flex items-center border-b lg:border-b-0 lg:border-r border-gray-200">
                    <div className="flex items-center lg:flex-col lg:items-start w-full">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-red-100 rounded-xl flex items-center justify-center mb-0 lg:mb-4 mr-4 lg:mr-0 flex-shrink-0">
                        <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-red-900" />
                      </div>
                      <h3 className="text-lg lg:text-xl font-bold text-gray-900">
                        {diff.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-4 p-6 lg:p-8 bg-yellow-50 border-b lg:border-b-0 lg:border-r-2 border-yellow-200">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0" />
                      <span className="font-semibold text-yellow-800">JusticeAI</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {diff.justiceAI}
                    </p>
                  </div>
                  
                  {/* Generic AI Column */}
                  <div className="lg:col-span-5 p-6 lg:p-8 bg-white">
                    <div className="flex items-center mb-3">
                      <X className="w-5 h-5 text-red-600 mr-2 flex-shrink-0" />
                      <span className="font-semibold text-gray-800">Generic AI</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {diff.genericAI}
                    </p>
                  </div>
                </div>
                
                {/* Impact Footer */}
                <div className="border-t border-gray-200 bg-gray-50 px-6 lg:px-8 py-4">
                  <span className="text-sm font-semibold text-red-900">Impact: </span>
                  <span className="text-sm text-gray-600">{diff.impact}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}