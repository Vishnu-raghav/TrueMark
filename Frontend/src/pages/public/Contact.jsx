import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  Users, 
  Globe,
  Shield,
  Zap,
  Github,
  Linkedin,
  BookOpen
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        college: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 4000);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Us",
      description: "We'll respond within hours",
      contact: "v.raghav.js@gamil.com",
      action: "mailto:v.raghav@college.edu",
      color: "bg-blue-500"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Call Vishnu",
      description: "Available for project discussions",
      contact: "+91 97112 08294",
      action: "tel:+919711208294",
      color: "bg-green-500"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "College Lab",
      description: "Meet us at computer lab",
      contact: "Room S17, CS Dept",
      action: "#",
      color: "bg-purple-500"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Location",
      description: "Our college campus",
      contact: "Faridabad, Haryana",
      action: "#",
      color: "bg-orange-500"
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'project', label: 'Project Details' },
    { value: 'technical', label: 'Technical Help' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'other', label: 'Other' }
  ];

  const teamInfo = [
    {
      name: "Vishnu Raghav",
      role: "Full Stack Developer",
      email: "v.raghav@college.edu",
      phone: "+91 97112 08294",
      focus: "Backend & Security"
    },
    {
      name: "Yash Singhal", 
      role: "UI/UX Designer",
      email: "yash@college.edu",
      phone: "Available on request",
      focus: "Design & User Experience"
    },
    {
      name: "Vishal Sorout",
      role: "Frontend Developer", 
      email: "vishal@college.edu",
      phone: "Available on request",
      focus: "React Components"
    },
    {
      name: "Aditya Verma",
      role: "Research & Docs",
      email: "aditya@college.edu",
      phone: "Available on request", 
      focus: "Documentation & Testing"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section - Realistic for College Project */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="absolute inset-0 bg-white/5"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Contact Our Team
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            Got questions about our 3rd semester project? We're students building Proofin and would love to hear from you!
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-blue-100">
            <div className="flex items-center bg-white/10 px-3 py-1 rounded-lg">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">4 Student Team</span>
            </div>
            <div className="flex items-center bg-white/10 px-3 py-1 rounded-lg">
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="text-sm">3rd Semester Project</span>
            </div>
            <div className="flex items-center bg-white/10 px-3 py-1 rounded-lg">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">Faridabad, Haryana</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods - Realistic for Students */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              How to Reach Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're computer science students working on this project. Feel free to contact any team member!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                <div className={`w-10 h-10 ${method.color} rounded-lg flex items-center justify-center text-white mb-3`}>
                  {method.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {method.title}
                </h3>
                <p className="text-gray-600 text-xs mb-2">
                  {method.description}
                </p>
                <p className="text-blue-600 font-medium text-sm">
                  {method.contact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Team Info */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Send us a Message
                </h2>
                <p className="text-gray-600 text-sm">
                  Have questions about our project or want to collaborate? We'll respond quickly!
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    Thanks for reaching out. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      College/Organization
                    </label>
                    <input
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                      placeholder="Your college or organization"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Inquiry Type *
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                    >
                      {inquiryTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none text-sm"
                      placeholder="Tell us what you're thinking..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2 text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Team Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  👨‍💻 Our Student Team
                </h3>
                <div className="space-y-4">
                  {teamInfo.map((member, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{member.name}</h4>
                          <p className="text-blue-600 text-sm">{member.role}</p>
                        </div>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {member.focus}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {member.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {member.phone}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">📚 About This Project</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>3rd Semester Computer Science Project - MERN Stack</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>Based in Faridabad, Haryana 121003</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>Working on this during college hours and lab sessions</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>Passionate students learning full-stack development</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  🎯 Project Status
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Development:</span>
                    <span className="font-semibold text-green-600">In Progress</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Phase:</span>
                    <span className="font-semibold">Beta Testing</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tech Stack:</span>
                    <span className="font-semibold">MERN</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Semester:</span>
                    <span className="font-semibold">3rd</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="py-12 bg-gray-100">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
      Interested in Our Project?
    </h2>
    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
      We're always excited to discuss our work, get feedback, or collaborate with other students and educators.
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <a 
        href="mailto:v.raghav.js@gmail.com"
        className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-2"
      >
        <Mail className="w-4 h-4" />
        Email Vishnu
      </a>
      <a 
        href="https://github.com/Vishnu-raghav/TrueMark"
        target="_blank"
        rel="noopener noreferrer"
        className="border border-gray-400 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center justify-center gap-2"
      >
        <Github className="w-4 h-4" />
        View Project Code
      </a>
    </div>
  </div>
</section>
    </div>
  );
}