import React from 'react';
import { FileX, Clock, Users, AlertCircle } from 'lucide-react';

export default function Crisis() {
  const crisisStats = [
    {
      icon: FileX,
      number: '4.5 Crore',
      label: 'Pending Cases',
      description: 'Creating a massive justice delivery crisis across India'
    },
    {
      icon: Clock,
      number: '5-7 Years',
      label: 'Average Resolution Time',
      description: 'Denying timely justice to millions of citizens'
    },
    {
      icon: Users,
      number: '70%',
      label: "Can't Afford Legal Aid",
      description: 'Limited access to justice for most Indians'
    },
    {
      icon: AlertCircle,
      number: '90%',
      label: 'Manual Processes',
      description: 'System overwhelmed by repetitive, time-consuming work'
    }
  ];

  const impactFramework = [
    {
      title: 'Backlog Reduction',
      description: 'AI-assisted prioritization and intelligent case triage',
      side: 'left'
    },
    {
      title: 'Time Optimization',
      description: 'Automate research and documentation processes',
      side: 'right'
    },
    {
      title: 'Access Expansion',
      description: 'AI-powered guidance for self-representation',
      side: 'left'
    },
    {
      title: 'Quality Improvement',
      description: 'Data-driven consistency in judicial decisions',
      side: 'right'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The Justice Delivery Crisis
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            India's legal system faces unprecedented challenges that demand innovative solutions
          </p>
        </div>

        {/* Crisis Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {crisisStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-3">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Impact Framework */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              JusticeAI Impact Framework
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {impactFramework.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-xl font-bold text-red-900">
                  {item.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}