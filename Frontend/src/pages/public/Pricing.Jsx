import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckIcon, XMarkIcon, StarIcon } from "@heroicons/react/24/outline";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small institutions and startups",
      price: {
        monthly: 0,
        annual: 0
      },
      duration: "Forever free",
      features: [
        "Up to 50 certificates per month",
        "Basic verification system",
        "Standard certificate templates",
        "Email support",
        "1 organization admin",
        "Basic analytics"
      ],
      limitations: [
        "No digital signatures",
        "No custom branding",
        "Limited template customization",
        "Standard verification only"
      ],
      cta: "Get Started Free",
      popular: false,
      gradient: "from-gray-100 to-gray-50",
      border: "border-gray-200"
    },
    {
      name: "Professional",
      description: "For growing organizations and educational institutions",
      price: {
        monthly: 999,
        annual: 899
      },
      duration: "per month",
      features: [
        "Unlimited certificates",
        "Advanced digital signatures",
        "Custom certificate templates",
        "Priority email & chat support",
        "Up to 5 team members",
        "Advanced analytics dashboard",
        "QR code verification",
        "Bulk certificate issuance",
        "Custom domain support",
        "API access (limited)"
      ],
      limitations: [],
      cta: "Start Professional Trial",
      popular: true,
      gradient: "from-blue-50 to-indigo-50",
      border: "border-blue-200"
    },
    {
      name: "Enterprise",
      description: "For large corporations and government organizations",
      price: {
        monthly: 2499,
        annual: 1999
      },
      duration: "per month",
      features: [
        "Everything in Professional",
        "White-label solutions",
        "Full API access",
        "Dedicated account manager",
        "Unlimited team members",
        "SLA guarantee (99.9% uptime)",
        "Advanced security features",
        "Custom integrations",
        "On-premise deployment options",
        "Training & onboarding support"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
      gradient: "from-purple-50 to-pink-50",
      border: "border-purple-200"
    }
  ];

  const features = [
    {
      category: "Certificate Management",
      items: [
        "Unlimited certificate issuance",
        "Bulk upload & processing",
        "Custom certificate templates",
        "Auto-expiry & renewal"
      ]
    },
    {
      category: "Verification System",
      items: [
        "Nano ID + Hash verification",
        "QR code integration",
        "Digital signature validation",
        "Public verification portal"
      ]
    },
    {
      category: "Security & Compliance",
      items: [
        "End-to-end encryption",
        "Blockchain-based verification",
        "GDPR compliant",
        "Data export capabilities"
      ]
    },
    {
      category: "Support & Integration",
      items: [
        "24/7 priority support",
        "REST API access",
        "Webhook integrations",
        "Custom development"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50">
      {/* Header */}
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <StarIcon className="w-4 h-4" />
            Trusted by 500+ organizations worldwide
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Simple, Transparent{" "}
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Pricing
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Start free, scale as you grow. No hidden fees, no surprise charges. 
            Everything you need to issue and verify certificates with enterprise-grade security.
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <span className={`text-lg font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
              <span className="ml-2 bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border-2 ${plan.border} bg-gradient-to-b ${plan.gradient} p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'scale-105 ring-2 ring-blue-500 ring-opacity-50' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gray-900">
                    ₹{isAnnual ? plan.price.annual : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-gray-600 ml-2">{plan.duration}</span>
                  )}
                </div>
                
                {plan.price.monthly === 0 ? (
                  <div className="text-green-600 font-semibold">No credit card required</div>
                ) : isAnnual ? (
                  <div className="text-green-600 font-semibold">Billed annually</div>
                ) : (
                  <div className="text-gray-600">Billed monthly</div>
                )}
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                
                {/* Limitations */}
                {plan.limitations.map((limitation, limitationIndex) => (
                  <div key={limitationIndex} className="flex items-start gap-3 opacity-60">
                    <XMarkIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{limitation}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                to={plan.name === "Enterprise" ? "/contact" : "/signup"}
                className={`block w-full text-center py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
                    : "bg-white text-gray-900 border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Compare Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to make an informed decision for your organization
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-8 font-semibold text-gray-900 text-lg">
                    Feature Breakdown
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.name} className="text-center p-8">
                      <div className="font-bold text-gray-900 text-lg mb-2">{plan.name}</div>
                      <div className="text-gray-600">
                        {plan.price.monthly === 0 ? 'Free' : `₹${isAnnual ? plan.price.annual : plan.price.monthly}/mo`}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((category, categoryIndex) => (
                  <tr key={categoryIndex} className="border-b border-gray-100">
                    <td colSpan={4} className="p-4 bg-gray-50">
                      <h3 className="font-semibold text-gray-900 text-lg">{category.category}</h3>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Get answers to common questions about our pricing and plans
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            {[
              {
                question: "Can I change plans later?",
                answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately."
              },
              {
                question: "Is there a setup fee?",
                answer: "No, there are no setup fees or hidden charges. You only pay the monthly subscription fee."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, UPI, net banking, and offer invoice-based billing for enterprise customers."
              },
              {
                question: "Do you offer discounts for educational institutions?",
                answer: "Yes, we offer special pricing for educational institutions and non-profit organizations. Contact us for details."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
              Join 500+ organizations that trust CertiVerify for their certificate management needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:scale-105 transition-transform duration-200"
              >
                Start Free Trial
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Schedule a Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}