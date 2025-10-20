import VerifyCertificate from "../../components/VerifyCertificate";
import { motion } from "framer-motion";
import { Shield, Zap, Users, CheckCircle, ArrowRight, Star } from "lucide-react";

export default function Home() {
  return (
    <main className="space-y-32 overflow-hidden">

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-between gap-16 px-6 max-w-7xl mx-auto py-20">
        {/* Left - Hero Content */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <Star className="w-4 h-4" />
            Trusted by 500+ Organizations
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight"
          >
            Verify Certificates with{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Absolute Confidence
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl leading-relaxed"
          >
            A secure SaaS platform for organizations to issue and verify certificates using advanced blockchain technology. 
            Ensure every certificate is <span className="font-semibold text-blue-600">100% authentic</span> and tamper-proof.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-600 transition-all duration-300">
              Schedule Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-8 pt-8 max-w-md"
          >
            <div className="text-center lg:text-left">
              <div className="text-2xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-600">Certificates</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Organizations</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
          </motion.div>
        </div>

        {/* Right - Verify Certificate Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 w-full max-w-lg"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Verify Certificate</h3>
              <p className="text-gray-600 mt-2">Enter Nano ID to check authenticity</p>
            </div>
            <VerifyCertificate />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-bold text-gray-900"
          >
            Why Choose Our Platform
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Built for organizations that value security, efficiency, and trust
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: "Military-Grade Security",
              description: "Every certificate is secured with unique hash and Nano ID technology",
              color: "text-green-600"
            },
            {
              icon: Zap,
              title: "Instant Verification",
              description: "Verify any certificate in seconds with our lightning-fast system",
              color: "text-blue-600"
            },
            {
              icon: Users,
              title: "Easy Organization Setup",
              description: "Register your organization and start issuing certificates in minutes",
              color: "text-purple-600"
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 space-y-4 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 ${feature.color} bg-blue-50 rounded-2xl flex items-center justify-center`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20 rounded-3xl">
        <div className="px-6 max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl lg:text-4xl font-bold text-gray-900"
            >
              How It Works
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Simple, secure, and efficient certificate management
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Organization Registration",
                description: "Sign up your organization and get verified"
              },
              {
                step: "02",
                title: "Issue Certificates",
                description: "Create and issue certificates to employees/students"
              },
              {
                step: "03",
                title: "Share Nano ID",
                description: "Recipients get unique Nano ID for verification"
              },
              {
                step: "04",
                title: "Instant Verification",
                description: "Anyone can verify certificates using Nano ID"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full mx-auto flex items-center justify-center text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 max-w-4xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
            Ready to Secure Your Certificates?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join hundreds of organizations worldwide who trust our platform for authentic certificate verification.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2">
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-600 transition-all duration-300">
            Contact Sales
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-6 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            No credit card required
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Setup in 10 minutes
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Free support
          </div>
        </motion.div>
      </section>

    </main>
  );
}