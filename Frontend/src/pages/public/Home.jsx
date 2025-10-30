import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Zap, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Award,
  Building,
  FileCheck,
  Lock,
  Globe,
  BarChart3,
  BadgeCheck,
  Sparkles
} from "lucide-react";
import VerifyCertificate from "../../components/VerifyCertificate";

export default function Home() {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: Shield,
      title: "Military-Grade Security",
      description: "Blockchain-verified certificates with cryptographic hashing",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "Instant Verification",
      description: "Real-time validation with sub-second response times",
      color: "from-green-500 to-green-600"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track certificate issuance and verification metrics",
      color: "from-purple-500 to-purple-600"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: "50,000+", label: "Certificates Verified" },
    { number: "500+", label: "Trusted Organizations" },
    { number: "99.9%", label: "System Uptime" },
    { number: "0", label: "Security Breaches" }
  ];

  const useCases = [
    {
      icon: Building,
      title: "Educational Institutions",
      description: "Issue verifiable degrees and certificates to students"
    },
    {
      icon: Users,
      title: "Corporate Training",
      description: "Validate employee training and skill certifications"
    },
    {
      icon: Award,
      title: "Professional Bodies",
      description: "Maintain credential integrity for members"
    }
  ];

  const currentFeatureData = features[currentFeature];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-full px-4 py-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  Trusted by Fortune 500 Companies
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Verify Certificates with{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                  Absolute Confidence
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                Enterprise-grade certificate verification platform that eliminates fraud and builds trust. 
                Issue, manage, and verify digital certificates with military-grade security.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/org/signup"
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-200"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a 
                  href="#demo" 
                  className="inline-flex items-center justify-center border border-gray-300 text-gray-700 px-6 py-3 lg:px-8 lg:py-4 rounded-xl font-semibold hover:border-gray-400 transition-colors"
                >
                  Watch Demo
                </a>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-xl lg:text-2xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-xs lg:text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Verification Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 lg:p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">Verify Certificate</h3>
                <p className="text-gray-300 text-sm lg:text-base">Enter Certificate ID to check authenticity</p>
              </div>
              <VerifyCertificate />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-3 -right-3 lg:-top-4 lg:-right-4 w-6 h-6 lg:w-8 lg:h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <BadgeCheck className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-20 bg-gray-50 rounded-3xl my-8">
        <div className="max-w-7xl mx-auto px-0">
          <div className="text-center space-y-4 mb-12 lg:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl lg:text-4xl font-bold text-gray-900"
            >
              Enterprise-Grade Features
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Built for organizations that demand security, scalability, and reliability
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Animated Feature Showcase */}
            <div className="relative h-80 lg:h-96">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute inset-0 space-y-6"
                >
                  <div className={`w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r ${currentFeatureData.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <currentFeatureData.icon className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                    {currentFeatureData.title}
                  </h3>
                  <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                    {currentFeatureData.description}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              {/* Feature Indicators */}
              <div className="absolute bottom-0 left-0 flex space-x-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all ${
                      index === currentFeature ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid gap-4 lg:gap-6">
              {[
                {
                  icon: Lock,
                  title: "End-to-End Encryption",
                  description: "All certificates are encrypted with AES-256 bit encryption"
                },
                {
                  icon: Globe,
                  title: "Global Verification",
                  description: "Verify certificates from anywhere in the world instantly"
                },
                {
                  icon: Users,
                  title: "Team Management",
                  description: "Manage multiple issuers with role-based access control"
                },
                {
                  icon: BarChart3,
                  title: "Real-time Analytics",
                  description: "Track verification patterns and certificate performance"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-4 lg:p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm lg:text-base mb-1 lg:mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-xs lg:text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="usecases" className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12 lg:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl lg:text-4xl font-bold text-gray-900"
            >
              Trusted Across Industries
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              From universities to multinational corporations
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {useCases.map((usecase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6">
                  <usecase.icon className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 lg:mb-4">{usecase.title}</h3>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed">{usecase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Final Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl my-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6 text-white"
          >
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold">
              Ready to Secure Your Certificates?
            </h2>
            <p className="text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of organizations worldwide who trust our platform for authentic certificate verification.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 lg:pt-8">
              <Link 
                to="/org/signup"
                className="inline-flex items-center justify-center space-x-2 bg-white text-blue-600 px-6 py-3 lg:px-8 lg:py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-200"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center border border-white/30 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                Contact Sales
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6 text-sm text-blue-200 pt-6 lg:pt-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Setup in 10 minutes
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}