import React from 'react';
import { Brain, Database, Zap, Lock } from 'lucide-react';

export default function Techstack() {
  const techStack = [
    {
      icon: Brain,
      title: 'Advanced AI Models',
      points: [
        'GPT-4, Claude-3, Gemini Pro base models',
        'Fine-tuned on 50,000+ Indian legal documents',
        'Specialized for legal reasoning and statutory interpretation',
        'Optimized for real-time court use with reduced latency'
      ]
    },
    {
      icon: Database,
      title: 'Vector Database',
      points: [
        'Legal-BERT fine-tuned on Indian case law',
        '10+ million legal document vectors stored',
        'Sub-second semantic search across entire corpus',
        'Cloud-native architecture for nationwide deployment'
      ]
    },
    {
      icon: Zap,
      title: 'Machine Learning Pipeline',
      points: [
        'XGBoost, Random Forest, Neural Networks ensemble',
        'Trained on 100,000+ cases with outcomes',
        'Features: case facts, provisions, judge history, location',
        'Cross-validated with legal expert review'
      ]
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      points: [
        'AES-256 encryption at rest, TLS 1.3 in transit',
        'Indian hosting (AWS Mumbai) for data sovereignty',
        'Role-based access control for legal teams',
        'Immutable audit trails for compliance'
      ]
    }
  ];

  const ethicalFramework = [
    {
      title: 'Transparency Protocol',
      points: [
        'SHAP values for feature importance explanation',
        'Every recommendation linked to source judgments',
        'Clear probability and uncertainty indicators',
        'Step-by-step legal reasoning display'
      ]
    },
    {
      title: 'Fairness Monitoring',
      points: [
        'Case outcome analysis by demographics',
        'Statistical testing for disparate impact',
        'Counterfactual "what-if" scenarios',
        'Quarterly fairness assessment reports'
      ]
    }
  ];

  return (
    <section id="technology" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Technology Stack
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built on cutting-edge AI infrastructure designed specifically for legal applications
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {techStack.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                    <Icon className="w-7 h-7 text-red-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {tech.title}
                  </h3>
                </div>
                
                <ul className="space-y-3">
                  {tech.points.map((point, i) => (
                    <li key={i} className="flex items-start text-gray-600">
                      <span className="text-yellow-600 mr-3 flex-shrink-0">→</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Ethical Framework */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              Ethical AI Framework
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {ethicalFramework.map((framework, idx) => (
              <div key={idx}>
                <h4 className="text-xl font-bold text-red-900 mb-6">
                  {framework.title}
                </h4>
                <ul className="space-y-3">
                  {framework.points.map((point, i) => (
                    <li key={i} className="flex items-start text-gray-600">
                      <span className="text-gray-400 mr-3 flex-shrink-0">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}