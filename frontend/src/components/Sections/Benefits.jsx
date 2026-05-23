import React, { useState } from 'react';
import { Briefcase, Gavel, Users, TrendingUp, Clock, Shield } from 'lucide-react';

export default function Benefits() {
  const [activeTab, setActiveTab] = useState('advocates');

  const tabs = [
    { id: 'advocates', label: 'Advocates', icon: Briefcase },
    { id: 'judges', label: 'Judges', icon: Gavel },
    { id: 'citizens', label: 'Citizens', icon: Users }
  ];

  const benefits = {
    advocates: [
      {
        icon: TrendingUp,
        title: 'Economic Benefits',
        points: [
          'Save ₹70,000 annually on database subscriptions',
          'Handle 3x more cases with same team size',
          '30% better win rates with data-driven strategy',
          'Improved client retention through realistic expectations'
        ]
      },
      {
        icon: Clock,
        title: 'Efficiency Transformation',
        points: [
          'Reduce research time from 15 hours to 2 hours per case',
          'Data-driven case selection and viability assessment',
          'Accurate time estimates for client proposals',
          'Pattern recognition in successful case types'
        ]
      },
      {
        icon: Shield,
        title: 'Competitive Advantage',
        points: [
          'Early adopter of legal AI technology',
          'More comprehensive research than competitors',
          'Data-backed advice builds client trust',
          'Faster turnaround without quality compromise'
        ]
      }
    ],
    judges: [
      {
        icon: Gavel,
        title: 'Workload Management',
        points: [
          'Process 2x more cases daily',
          '70% less time on research and documentation',
          'Reduced appeal rates through better reasoning',
          'Access expert knowledge beyond personal experience'
        ]
      },
      {
        icon: Shield,
        title: 'Decision Quality',
        points: [
          'Access entire case law database instantly',
          'Identify consistent principles across jurisdictions',
          'Objective analysis of decision patterns',
          'Track legal principle evolution over time'
        ]
      },
      {
        icon: TrendingUp,
        title: 'Administration',
        points: [
          'Intelligent case triage for mediation vs trial',
          'Data-driven assessment of court time needs',
          'Objective performance metrics',
          "Learning tool from senior judges' patterns"
        ]
      }
    ],
    citizens: [
      {
        icon: Users,
        title: 'Access to Justice',
        points: [
          'Free preliminary legal guidance',
          'Plain language explanations of legal rights',
          'Step-by-step guidance through procedures',
          'Probability-based outcome assessments'
        ]
      },
      {
        icon: Shield,
        title: 'Demographic Inclusion',
        points: [
          'Support for 10+ Indian regional languages',
          'Simple interface for first-time users',
          'Free basic services with affordable premium',
          'Available nationwide without physical offices'
        ]
      },
      {
        icon: TrendingUp,
        title: 'System Engagement',
        points: [
          'Understand case strategy and implications',
          'Track case progress and requirements',
          'Automated matching with legal aid',
          'Rate and review legal service quality'
        ]
      }
    ]
  };

  return (
    <section id="benefits" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Comprehensive Benefits
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tailored advantages for every stakeholder in the legal ecosystem
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-xl shadow-md p-1 border border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {benefits[activeTab].map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-red-900" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {benefit.title}
                </h3>
                
                <ul className="space-y-4">
                  {benefit.points.map((point, i) => (
                    <li key={i} className="flex items-start text-gray-600">
                      <span className="text-yellow-600 mr-3 flex-shrink-0">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}