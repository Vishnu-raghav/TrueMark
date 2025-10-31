import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram,
  FaShieldAlt,
  FaRocket,
  FaHeadset,
  FaAward
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 pt-20 pb-8">
      {/* Main Footer Content */}
      <div className="w-full max-w-7xl mx-auto px-6">
        {/* Top Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 pb-12 border-b border-gray-800">
          {[
            { icon: FaAward, number: "50K+", label: "Certificates Verified" },
            { icon: FaShieldAlt, number: "500+", label: "Organizations" },
            { icon: FaRocket, number: "99.9%", label: "Uptime" },
            { icon: FaHeadset, number: "24/7", label: "Support" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">✓</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Proofin</h3>
                <p className="text-sm text-blue-400 font-medium">by Vishnu</p>
              </div>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              A secure SaaS platform for organizations to issue and verify certificates with absolute confidence and trust.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebookF, href: "https://www.facebook.com/profile.php?id=100083036200150" },
                { icon: FaTwitter, href: "https://x.com/VishnuR77165713" },
                { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/vishnu-raghav-093017261/" },
                { icon: FaInstagram, href: "https://www.instagram.com/just.vishu_/" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          {/* <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Solutions</h4>
            <ul className="space-y-3 text-gray-400">
              {[
                { name: "Education", href: "/solutions/education" },
                { name: "Corporate", href: "/solutions/corporate" },
                { name: "Training", href: "/solutions/training" },
                { name: "Government", href: "/solutions/government" },
                { name: "Healthcare", href: "/solutions/healthcare" }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full mr-3 group-hover:bg-blue-400"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <ul className="space-y-3 text-gray-400">
              {[
                { name: "About Us", href: "/about" },
                { name: "Pricing", href: "/pricing" },
                { name: "Careers", href: "/careers" },
                { name: "Blog", href: "/blog" },
                { name: "Press", href: "/press" }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full mr-3 group-hover:bg-blue-400"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <ul className="space-y-3 text-gray-400">
              {[
                { name: "Help Center", href: "/help" },
                { name: "Contact Us", href: "/contact" },
                { name: "Documentation", href: "/docs" },
                { name: "API Status", href: "/status" },
                { name: "Community", href: "/community" }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full mr-3 group-hover:bg-blue-400"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 mb-12 border border-gray-700">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated with Proofin
            </h3>
            <p className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto">
              Get the latest updates on new features, security enhancements, and industry insights delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your work email"
                className="flex-1 px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button 
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Subscribe
              </button>
            </form>
            <p className="text-gray-500 text-sm mt-4">
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <div className="text-gray-500 text-sm mb-4 lg:mb-0">
            &copy; {new Date().getFullYear()} Proofin. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-gray-500 text-sm">
            {[
              { name: "Privacy Policy", href: "/privacy" },
              { name: "Terms of Service", href: "/terms" },
              { name: "Cookie Policy", href: "/cookies" },
              { name: "Security", href: "/security" },
              { name: "Compliance", href: "/compliance" }
            ].map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="hover:text-blue-400 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}