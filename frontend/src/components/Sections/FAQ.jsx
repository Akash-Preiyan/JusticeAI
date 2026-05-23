import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does JusticeAI handle conflicting precedents?",
      answer: "Our AI analyzes the entire precedent chain, identifies binding vs persuasive authorities, and presents them in chronological order with their current legal status. The system highlights when cases have been overruled or distinguished, and provides the most recent authoritative position on any legal principle."
    },
    {
      question: "What happens when laws change or new judgments override old ones?",
      answer: "JusticeAI maintains a daily synchronization with official legal databases. Our version control system automatically tracks amendments, updates, and new judgments. Users receive notifications when relevant laws or precedents affecting their cases are modified, ensuring they always work with current legal positions."
    },
    {
      question: "How is regional language support implemented technically?",
      answer: "We use advanced Natural Language Processing (NLP) models fine-tuned for 10+ Indian languages including Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Punjabi, Urdu, Malayalam, Kannada, and Odia. The system can translate queries, search multilingual databases, and provide summaries in the user's preferred language while maintaining legal terminology accuracy."
    },
    {
      question: "How does this affect lawyer-client privilege?",
      answer: "JusticeAI is built with lawyer-client privilege as a foundational principle. All client data is encrypted, isolated per law firm, and there is zero cross-client access. The system includes automated conflict checking and maintains complete audit trails. We comply fully with Bar Council regulations on confidentiality."
    },
    {
      question: "What about Bar Council rules on technology use?",
      answer: "JusticeAI is designed in consultation with legal ethics experts to ensure full compliance with Bar Council of India rules. The system serves as an assistance tool where the lawyer maintains complete control and responsibility. We provide detailed documentation on ethical use and regularly update our platform to align with evolving professional conduct standards."
    },
    {
      question: "How is confidential client information protected?",
      answer: "We implement enterprise-grade security: AES-256 encryption at rest, TLS 1.3 in transit, role-based access control, and hosting on Indian servers (AWS Mumbai) for data sovereignty. All data is isolated per law firm with configurable auto-deletion post-case closure. We maintain SOC 2 compliance and undergo regular security audits."
    },
    {
      question: "How long does it take to see productivity improvements?",
      answer: "Most users report immediate time savings on their first legal research task. Full productivity gains typically materialize within 2-4 weeks as users become familiar with advanced features. On average, firms report 60-70% time savings on research and 40% faster case strategy development within the first month."
    },
    {
      question: "What's the learning curve for non-technical lawyers?",
      answer: "JusticeAI is designed for legal professionals, not technologists. The interface uses familiar legal terminology and workflows. We provide personalized onboarding, video tutorials, and 24/7 support. Most users become proficient with core features within 2-3 sessions. Our average user rating for ease of use is 4.7/5."
    },
    {
      question: "How are predictions updated as cases progress?",
      answer: "The prediction engine continuously learns from new case outcomes. As your case progresses through different stages, you can input new developments and the system recalculates probabilities based on the updated facts and recent similar cases. This creates a dynamic, evolving assessment rather than a one-time prediction."
    },
    {
      question: "What support is available during actual court proceedings?",
      answer: "We offer mobile access for real-time precedent lookup during hearings, 24/7 technical support, and a rapid-response legal research team for urgent queries. Premium plans include dedicated account managers who can provide prioritized assistance during critical court appearances."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">
            Comprehensive answers to common concerns about JusticeAI
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-red-50 transition-colors group"
              >
                <span className="font-semibold text-gray-800 pr-4 group-hover:text-red-600 transition-colors">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`flex-shrink-0 w-5 h-5 text-gray-500 group-hover:text-red-600 transition-all duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="px-6 py-5 bg-gray-50 border-t-2 border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;