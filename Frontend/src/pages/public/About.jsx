// import { 
//   Code, 
//   Coffee, 
//   Rocket, 
//   Target, 
//   Heart,
//   Zap,
//   Shield,
//   Users,
//   Calendar,
//   GraduationCap
// } from 'lucide-react';

// export default function About() {
//   const journey = [
//     {
//       year: "Sept 2023",
//       title: "The Beginning",
//       description: "Started building Proofin as a college project with a vision to solve certificate fraud",
//       icon: <Code className="w-6 h-6" />
//     },
//     {
//       year: "Oct 2023",
//       title: "First Prototype",
//       description: "Developed initial MVP with basic certificate issuance and verification features",
//       icon: <Coffee className="w-6 h-6" />
//     },
//     {
//       year: "Nov 2023",
//       title: "Platform Development",
//       description: "Built full-stack application with React, Node.js, and MongoDB",
//       icon: <Rocket className="w-6 h-6" />
//     },
//     {
//       year: "Dec 2023",
//       title: "Beta Testing",
//       description: "Currently testing with early users and gathering feedback for improvements",
//       icon: <Target className="w-6 h-6" />
//     },
//     {
//       year: "2024",
//       title: "Future Vision",
//       description: "Planning to launch publicly and onboard educational institutions",
//       icon: <Zap className="w-6 h-6" />
//     }
//   ];

//   const features = [
//     {
//       icon: <Shield className="w-8 h-8" />,
//       title: "Secure by Design",
//       description: "Built with security-first approach using modern encryption techniques"
//     },
//     {
//       icon: <Zap className="w-8 h-8" />,
//       title: "Lightning Fast",
//       description: "Instant verification with optimized algorithms and efficient code"
//     },
//     {
//       icon: <Users className="w-8 h-8" />,
//       title: "User Friendly",
//       description: "Simple interface designed for both technical and non-technical users"
//     },
//     {
//       icon: <GraduationCap className="w-8 h-8" />,
//       title: "Education Focused",
//       description: "Specifically built to solve problems in educational certificate management"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 lg:py-24">
//         <div className="absolute inset-0 bg-black/10"></div>
//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl lg:text-5xl font-bold mb-6">
//             About Proofin
//           </h1>
//           <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
//             A passionate project built by a college student to revolutionize how we verify digital certificates
//           </p>
//           <div className="flex flex-wrap justify-center gap-4 text-blue-100">
//             <div className="flex items-center">
//               <Code className="w-5 h-5 mr-2" />
//               <span>Built with Passion</span>
//             </div>
//             <div className="flex items-center">
//               <Heart className="w-5 h-5 mr-2" />
//               <span>100% Solo Developed</span>
//             </div>
//             <div className="flex items-center">
//               <Rocket className="w-5 h-5 mr-2" />
//               <span>In Development</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Founder Story */}
//       <section className="py-16 lg:py-20">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//             <div className="order-2 lg:order-1">
//               <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
//                 One Developer, One Vision
//               </h2>
//               <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
//                 <p>
//                   <strong>Hi, I'm Vishnu Raghav</strong> - a college student and full-stack developer passionate about solving real-world problems through technology.
//                 </p>
//                 <p>
//                   Proofin started as a simple idea during my college days when I noticed the challenges in certificate verification. What began as a side project quickly turned into a mission to create a reliable, secure, and easy-to-use platform for digital credentials.
//                 </p>
//                 <p>
//                   As a solo developer, I've built every aspect of Proofin - from the frontend interfaces to the backend APIs, database design, and security implementation.
//                 </p>
//                 <p>
//                   This project represents countless hours of learning, coding, and problem-solving - all driven by the belief that certificate verification should be simple, secure, and accessible to everyone.
//                 </p>
//               </div>
//             </div>
//             <div className="order-1 lg:order-2">
//               <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 lg:p-10 text-white text-center">
//                 <div className="w-24 h-24 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">
//                   👨‍💻
//                 </div>
//                 <h3 className="text-2xl lg:text-3xl font-bold mb-4">
//                   Vishnu Raghav
//                 </h3>
//                 <div className="text-blue-100 font-medium mb-4">
//                   Founder & Solo Developer
//                 </div>
//                 <p className="text-blue-100 text-lg leading-relaxed">
//                   College Student • Full-Stack Developer • Problem Solver
//                 </p>
//                 <div className="mt-6 flex justify-center space-x-4">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold">100%</div>
//                     <div className="text-blue-200 text-sm">Solo Built</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold">4+</div>
//                     <div className="text-blue-200 text-sm">Months</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold">1</div>
//                     <div className="text-blue-200 text-sm">Vision</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Development Journey */}
//       <section className="py-16 bg-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
//               Development Journey
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               From idea to implementation - the story of building Proofin
//             </p>
//           </div>

//           <div className="relative">
//             {/* Timeline line */}
//             <div className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 w-1 bg-blue-200 h-full"></div>
            
//             <div className="space-y-8 lg:space-y-12">
//               {journey.map((item, index) => (
//                 <div key={index} className="relative flex items-start lg:items-center">
//                   {/* Timeline dot */}
//                   <div className="absolute left-0 lg:left-1/2 transform lg:-translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full border-4 border-white z-10 flex items-center justify-center text-white">
//                     {item.icon}
//                   </div>
                  
//                   {/* Content */}
//                   <div className={`ml-12 lg:ml-0 lg:w-5/12 ${index % 2 === 0 ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'}`}>
//                     <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-200 hover:border-blue-300 transition-colors duration-300">
//                       <div className="text-blue-600 font-bold text-lg mb-2 flex items-center">
//                         <Calendar className="w-5 h-5 mr-2" />
//                         {item.year}
//                       </div>
//                       <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3">
//                         {item.title}
//                       </h3>
//                       <p className="text-gray-600 leading-relaxed">
//                         {item.description}
//                       </p>
//                     </div>
//                   </div>
                  
//                   {/* Spacer for alternate side */}
//                   <div className="hidden lg:block lg:w-5/12"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* What Makes Proofin Special */}
//       <section className="py-16 lg:py-20">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
//               Why Proofin Stands Out
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Built with care, focused on solving real problems
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
//             {features.map((feature, index) => (
//               <div key={index} className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
//                 <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-4">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Tech Stack */}
//       <section className="py-16 bg-gray-900 text-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl lg:text-4xl font-bold mb-4">
//               Built With Modern Technology
//             </h2>
//             <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//               Carefully chosen tech stack for performance and scalability
//             </p>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
//             {[
//               { name: "React", desc: "Frontend Framework" },
//               { name: "Node.js", desc: "Backend Runtime" },
//               { name: "MongoDB", desc: "Database" },
//               { name: "Tailwind", desc: "CSS Framework" },
//               { name: "Express", desc: "Server Framework" },
//               { name: "JWT", desc: "Authentication" },
//               { name: "Cloudinary", desc: "File Storage" },
//               { name: "Redux", desc: "State Management" }
//             ].map((tech, index) => (
//               <div key={index} className="bg-gray-800 rounded-2xl p-6 text-center hover:bg-gray-700 transition-colors duration-300">
//                 <div className="text-2xl font-bold text-blue-400 mb-2">
//                   {tech.name}
//                 </div>
//                 <div className="text-gray-300 text-sm">
//                   {tech.desc}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Future Plans */}
//       <section className="py-16 lg:py-20">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
//             The Road Ahead
//           </h2>
//           <p className="text-xl text-gray-600 mb-8 leading-relaxed">
//             Proofin is continuously evolving. Future plans include mobile apps, advanced analytics, 
//             blockchain integration, and partnerships with educational institutions.
//           </p>
//           <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
//             <h3 className="text-2xl font-bold mb-4">
//               Currently in Active Development
//             </h3>
//             <p className="text-blue-100 text-lg">
//               Working on new features and improvements based on user feedback
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }











// <section className="relative bg-white py-20 lg:py-24 border-b">
//   <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//     <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
//       About Proofin
//     </h1>
//     <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
//       A 3rd Semester College Project - Revolutionizing Digital Certificate Verification using MERN Stack
//     </p>
//     <div className="flex flex-wrap justify-center gap-6 text-gray-600">
//       <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
//         <Users className="w-5 h-5 mr-2" />
//         <span>4 Member Team</span>
//       </div>
//       <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
//         <Code className="w-5 h-5 mr-2" />
//         <span>MERN Stack</span>
//       </div>
//       <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
//         <Rocket className="w-5 h-5 mr-2" />
//         <span>Academic Project</span>
//       </div>
//     </div>
//   </div>
// </section>












// <section className="relative bg-gray-50 py-20 lg:py-24">
//   <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//     <div className="bg-white rounded-3xl p-8 lg:p-12 text-center shadow-xl border">
//       <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
//         About Proofin
//       </h1>
//       <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
//         A 3rd Semester College Project - Revolutionizing Digital Certificate Verification using MERN Stack
//       </p>
//       <div className="flex flex-wrap justify-center gap-6">
//         <div className="flex items-center text-gray-700">
//           <Users className="w-5 h-5 mr-2" />
//           <span>4 Member Team</span>
//         </div>
//         <div className="flex items-center text-gray-700">
//           <Code className="w-5 h-5 mr-2" />
//           <span>MERN Stack</span>
//         </div>
//         <div className="flex items-center text-gray-700">
//           <Rocket className="w-5 h-5 mr-2" />
//           <span>Academic Project</span>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>











import { 
  Code, 
  Rocket, 
  Target, 
  Users,
  Palette,
  Search,
  BookOpen,
  Database,
  Shield,
  Zap,
  Calendar,
  GraduationCap
} from 'lucide-react';

export default function About() {
  const teamMembers = [
    {
      name: "Vishnu Raghav",
      role: "Full Stack Developer",
      description: "Led the complete MERN stack development, backend APIs, database design, and system architecture",
      contribution: "End-to-end development, security implementation, deployment",
      icon: "👨‍💻",
      tech: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
      name: "Yash Singhal",
      role: "UI/UX Designer",
      description: "Designed the complete user interface and user experience flow for the platform",
      contribution: "Wireframing, prototyping, visual design, user research",
      icon: "🎨",
      tech: ["Figma", "Adobe XD", "User Research"]
    },
    {
      name: "Vishal Sorout", 
      role: "Frontend Developer",
      description: "Implemented responsive UI components and frontend functionality",
      contribution: "Component development, styling, frontend logic",
      icon: "💻",
      tech: ["React", "Tailwind CSS", "JavaScript"]
    },
    {
      name: "Aditya Verma",
      role: "Research & Documentation",
      description: "Conducted market research, competitive analysis, and project documentation",
      contribution: "Requirements gathering, documentation, feature planning",
      icon: "📚",
      tech: ["Research", "Documentation", "Analysis"]
    }
  ];

  const techStack = [
    {
      category: "Frontend",
      technologies: ["React", "Tailwind CSS", "Redux", "JavaScript"],
      icon: <Palette className="w-6 h-6" />
    },
    {
      category: "Backend", 
      technologies: ["Node.js", "Express.js", "JWT", "REST APIs"],
      icon: <Database className="w-6 h-6" />
    },
    {
      category: "Database",
      technologies: ["MongoDB", "Mongoose", "Cloudinary"],
      icon: <Database className="w-6 h-6" />
    },
    {
      category: "Security",
      technologies: ["JWT Auth", "Bcrypt", "Input Validation"],
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const projectJourney = [
    {
      semester: "3rd Semester",
      period: "Sept 2025 - Present", 
      title: "College Project Initiation",
      description: "Started as a 3rd semester academic project to solve real-world certificate verification challenges",
      achievements: ["Idea Validation", "Team Formation", "Tech Stack Selection"],
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      semester: "Development Phase", 
      period: "Oct - Nov 2025",
      title: "Development",
      description: "Implemented the complete full-stack application using MERN stack with weekly sprints",
      achievements: ["MVP Development", "Feature Implementation", "Testing"],
      icon: <Code className="w-6 h-6" />
    },
    {
      semester: "Current Status",
      period: "Dec 2025", 
      title: "Beta Testing & Refinement",
      description: "Currently in testing phase with continuous improvements based on feedback",
      achievements: ["User Testing", "Bug Fixing", "Performance Optimization"],
      icon: <Target className="w-6 h-6" />
    }
  ];

  const projectFeatures = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Verification",
      description: "Built with JWT authentication and secure APIs to prevent certificate fraud"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Validation", 
      description: "Quick certificate verification with optimized database queries and caching"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Dual Platform",
      description: "Separate interfaces for organizations and students with role-based access"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Education Focused",
      description: "Specifically designed for educational institutions and student certificate management"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
     {/* Hero Section */}

{/* Hero Section */}
<section className="relative bg-gradient-to-br from-blue-500 to-blue-700 text-white py-20 lg:py-24">
  <div className="absolute inset-0 bg-white/5"></div>
  <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 className="text-4xl lg:text-5xl font-bold mb-6">
      About Proofin
    </h1>
    <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
      A 3rd Semester College Project - Revolutionizing Digital Certificate Verification using MERN Stack
    </p>
    <div className="flex flex-wrap justify-center gap-6 text-blue-100">
      <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
        <Users className="w-5 h-5 mr-2" />
        <span>4 Member Team</span>
      </div>
      <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
        <Code className="w-5 h-5 mr-2" />
        <span>MERN Stack</span>
      </div>
      <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
        <Rocket className="w-5 h-5 mr-2" />
        <span>Academic Project</span>
      </div>
    </div>
  </div>
</section>


      {/* Project Overview */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Project Overview
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proofin is our 3rd semester academic project focused on solving real-world certificate 
              verification challenges using modern web technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 Project Vision</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                To create a secure, efficient, and user-friendly platform that eliminates certificate 
                fraud and simplifies the verification process for educational institutions and employers.
              </p>
              <p className="text-gray-600 leading-relaxed">
                As computer science students, we wanted to apply our learning to build something 
                meaningful that addresses a genuine problem in the education sector.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">🚀 Technical Approach</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Full-stack MERN application</li>
                <li>• Responsive design with Tailwind CSS</li>
                <li>• Secure JWT authentication</li>
                <li>• RESTful API architecture</li>
                <li>• Cloud-based file storage</li>
                <li>• Real-time verification system</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Four passionate computer science students working together to build Proofin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl text-white mx-auto mb-4">
                  {member.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <div className="text-blue-600 font-medium mb-3">
                  {member.role}
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {member.description}
                </p>
                <div className="text-xs text-gray-500 mb-3">
                  <strong>Contribution:</strong> {member.contribution}
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Journey */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Project Timeline
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our journey from concept to implementation as a 3rd semester project
            </p>
          </div>

          <div className="space-y-8">
            {projectJourney.map((phase, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 hover:border-blue-300 transition-colors duration-300">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div className="flex items-center mb-3 lg:mb-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mr-4">
                      {phase.icon}
                    </div>
                    <div>
                      <div className="text-blue-600 font-bold text-lg">{phase.semester}</div>
                      <div className="text-gray-500 text-sm">{phase.period}</div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3">
                  {phase.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {phase.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {phase.achievements.map((achievement, achievementIndex) => (
                    <span key={achievementIndex} className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Technology Stack
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Modern technologies used to build this full-stack application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {techStack.map((stack, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-colors duration-300">
                <div className="flex items-center mb-4">
                  <div className="text-blue-400 mr-3">
                    {stack.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{stack.category}</h3>
                </div>
                <div className="space-y-2">
                  {stack.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              What makes Proofin stand out as a certificate verification platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projectFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Context */}
   <section className="py-16 bg-white">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-10 border border-blue-100 shadow-lg">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
        🎓 Academic Project
      </h2>
      <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
        This project represents our learning journey in web development, database management, 
        and software engineering principles during our 3rd semester of Computer Science.
      </p>
      <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm">
        <p className="text-gray-900 text-lg font-semibold flex items-center justify-center gap-2">
          <span className="text-red-500">❤️</span>
          Built with passion by Computer Science Students
          <span className="text-red-500">❤️</span>
        </p>
      </div>
      
      {/* Additional academic details */}
      <div className="mt-8 flex flex-wrap justify-center gap-6 text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>3rd Semester Project</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>MERN Stack Application</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Real-world Problem Solving</span>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
}