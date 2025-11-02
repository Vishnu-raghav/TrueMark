// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Eye, EyeOff, User, Mail, Lock, Phone, Calendar, Book, CheckCircle, Shield, Zap, Globe, Award, Clock, Users, ArrowRight, Star, Building } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../../features/auth/authslice.js";

// export default function MemberSignUp() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     dateOfBirth: "",
//     educationLevel: "",
//     organizationDomain: "", 
//   });
  
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [domainSuggestions, setDomainSuggestions] = useState([]); 
  
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoading: reduxLoading, isSuccess, message } = useSelector(state => state.auth);

//   // Education levels
//   const educationLevels = [
//     "High School",
//     "Associate Degree",
//     "Bachelor's Degree", 
//     "Master's Degree",
//     "Doctorate",
//     "Diploma",
//     "Certificate",
//     "Other"
//   ];

//   // ✅ NEW: Extract domain from email and suggest organizations
//   useEffect(() => {
//     if (formData.email && formData.email.includes('@')) {
//       const emailDomain = formData.email.split('@')[1];
      
//       // Auto-fill organization domain if empty
//       if (!formData.organizationDomain) {
//         setFormData(prev => ({
//           ...prev,
//           organizationDomain: emailDomain
//         }));
//       }
      
//       // Simulate domain suggestions (in real app, you'd fetch from API)
//       const suggestions = getDomainSuggestions(emailDomain);
//       setDomainSuggestions(suggestions);
//     } else {
//       setDomainSuggestions([]);
//     }
//   }, [formData.email, formData.organizationDomain]);

//   // ✅ NEW: Get domain suggestions (simulated)
//   const getDomainSuggestions = (domain) => {
//     const commonDomains = {
//       'gmail.com': [],
//       'yahoo.com': [],
//       'outlook.com': [],
//       'hotmail.com': []
//     };
    
//     if (commonDomains[domain]) {
//       return [];
//     }
    
//     // Simulate finding organizations with this domain
//     return [
//       `We found organizations with domain: ${domain}`,
//       "Your account will be automatically connected if domain matches"
//     ];
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ""
//       }));
//     }
//   };

//   const validateStep1 = () => {
//     const newErrors = {};
    
//     if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
//     if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
//     // ✅ NEW: Validate organization domain
//     if (!formData.organizationDomain.trim()) {
//       newErrors.organizationDomain = "Organization domain is required";
//     } else if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.organizationDomain)) {
//       newErrors.organizationDomain = "Please enter a valid domain (e.g., company.com)";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateStep2 = () => {
//     const newErrors = {};
    
//     if (!formData.password) newErrors.password = "Password is required";
//     else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
//     if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm password";
//     else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    
//     if (!agreeTerms) newErrors.terms = "You must agree to terms and conditions";
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = () => {
//     if (currentStep === 1 && validateStep1()) {
//       setCurrentStep(2);
//     }
//   };

//   const handleBack = () => {
//     setCurrentStep(1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateStep2()) return;
    
//     setIsLoading(true);
    
//     try {
//       const submitData = {
//         firstName: formData.firstName.trim(),
//         lastName: formData.lastName.trim(),
//         email: formData.email.trim().toLowerCase(),
//         password: formData.password,
//         phone: formData.phone?.trim() || "",
//         dateOfBirth: formData.dateOfBirth || "",
//         educationLevel: formData.educationLevel || "",
//         organizationDomain: formData.organizationDomain.trim().toLowerCase(), // ✅ NEW: Include domain
//       };
      
//       console.log("Submitting data:", submitData);
      
//       const result = await dispatch(registerUser(submitData)).unwrap();
      
//       // Success - redirect to dashboard
//       setTimeout(() => {
//         navigate("/member/dashboard", { 
//           state: { message: "Account created successfully!" } 
//         });
//       }, 2000);
      
//     } catch (error) {
//       console.error("Registration failed:", error);
//       setErrors({ submit: error });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const passwordStrength = (password) => {
//     if (!password) return { strength: 0, text: "Very Weak", color: "bg-red-500" };
    
//     let strength = 0;
//     if (password.length >= 6) strength += 1;
//     if (/[a-z]/.test(password)) strength += 1;
//     if (/[A-Z]/.test(password)) strength += 1;
//     if (/[0-9]/.test(password)) strength += 1;
//     if (/[^A-Za-z0-9]/.test(password)) strength += 1;

//     const strengthMap = {
//       0: { text: "Very Weak", color: "bg-red-500" },
//       1: { text: "Weak", color: "bg-red-400" },
//       2: { text: "Fair", color: "bg-yellow-500" },
//       3: { text: "Good", color: "bg-blue-500" },
//       4: { text: "Strong", color: "bg-green-500" },
//       5: { text: "Very Strong", color: "bg-green-600" }
//     };

//     return { strength, ...strengthMap[strength] };
//   };

//   const pwdStrength = passwordStrength(formData.password);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
//       <div className="max-w-6xl w-full">
//         {/* Header - UNCHANGED */}
//         <div className="text-center mb-8">
//           <Link to="/" className="inline-flex items-center space-x-3 mb-6">
//             <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
//               <span className="text-white text-xl font-bold">✓</span>
//             </div>
//             <div className="flex flex-col text-left">
//               <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
//                 CertiVerify
//               </span>
//               <span className="text-xs text-gray-500 font-medium -mt-1">
//                 by TrueMark
//               </span>
//             </div>
//           </Link>
          
//           <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
//             Join as a Member
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Create your account to receive and manage verified certificates
//           </p>
//         </div>

//         {/* Progress Steps - UNCHANGED */}
//         <div className="flex justify-center mb-8">
//           <div className="flex items-center space-x-4">
//             {[1, 2].map((step) => (
//               <div key={step} className="flex items-center">
//                 <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
//                   step === currentStep 
//                     ? "bg-blue-600 text-white shadow-lg scale-110" 
//                     : step < currentStep 
//                     ? "bg-green-500 text-white" 
//                     : "bg-gray-200 text-gray-600"
//                 }`}>
//                   {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
//                 </div>
//                 {step < 2 && (
//                   <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
//                     step < currentStep ? "bg-green-500" : "bg-gray-200"
//                   }`} />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Form Container - UNCHANGED */}
//         <motion.div 
//           className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="grid grid-cols-1 lg:grid-cols-3">
//             {/* Left Side - Benefits - UNCHANGED */}
//             <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 lg:p-10">
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-xl font-bold mb-4">Why Join as Member?</h3>
//                   <div className="space-y-4">
//                     {[
//                       { icon: "📜", text: "Receive verified digital certificates" },
//                       { icon: "🔍", text: "Instant certificate verification" },
//                       { icon: "💼", text: "Build professional portfolio" },
//                       { icon: "🌐", text: "Global recognition of credentials" },
//                       { icon: "📊", text: "Track all your achievements" },
//                       { icon: "🔒", text: "Secure and private storage" },
//                     ].map((benefit, index) => (
//                       <div key={index} className="flex items-center space-x-3">
//                         <span className="text-lg">{benefit.icon}</span>
//                         <span className="text-sm text-blue-100">{benefit.text}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
                
//                 {/* Stats - UNCHANGED */}
//                 <div className="pt-6 border-t border-blue-500">
//                   <div className="grid grid-cols-2 gap-4 text-center">
//                     <div>
//                       <div className="text-2xl font-bold">50K+</div>
//                       <div className="text-xs text-blue-200">Certificates</div>
//                     </div>
//                     <div>
//                       <div className="text-2xl font-bold">10K+</div>
//                       <div className="text-xs text-blue-200">Members</div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="text-center pt-4">
//                   <div className="inline-flex items-center gap-2 text-sm text-blue-100">
//                     <Shield className="w-4 h-4" />
//                     Your data is securely encrypted
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Form - UPDATED */}
//             <div className="lg:col-span-2 p-8 lg:p-10">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Step 1: Personal Details - UPDATED */}
//                 {currentStep === 1 && (
//                   <motion.div
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     className="space-y-6"
//                   >
//                     <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                       <User className="w-5 h-5 text-blue-600" />
//                       Personal Information
//                     </h3>

//                     {/* Name Fields - UNCHANGED */}
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           First Name *
//                         </label>
//                         <div className="relative">
//                           <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                           <input
//                             type="text"
//                             name="firstName"
//                             value={formData.firstName}
//                             onChange={handleChange}
//                             className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
//                               errors.firstName ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Enter your first name"
//                           />
//                         </div>
//                         {errors.firstName && (
//                           <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Last Name *
//                         </label>
//                         <div className="relative">
//                           <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                           <input
//                             type="text"
//                             name="lastName"
//                             value={formData.lastName}
//                             onChange={handleChange}
//                             className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
//                               errors.lastName ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Enter your last name"
//                           />
//                         </div>
//                         {errors.lastName && (
//                           <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Email - UNCHANGED */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Email Address *
//                       </label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleChange}
//                           className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
//                             errors.email ? "border-red-500" : "border-gray-300"
//                           }`}
//                           placeholder="your.email@example.com"
//                         />
//                       </div>
//                       {errors.email && (
//                         <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//                       )}
//                     </div>

//                     {/* ✅ NEW: Organization Domain Field */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Your Organization Domain *
//                       </label>
//                       <div className="relative">
//                         <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                         <input
//                           type="text"
//                           name="organizationDomain"
//                           value={formData.organizationDomain}
//                           onChange={handleChange}
//                           className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
//                             errors.organizationDomain ? "border-red-500" : "border-gray-300"
//                           }`}
//                           placeholder="e.g., eitfaridabad.co.in"
//                         />
//                       </div>
//                       {errors.organizationDomain && (
//                         <p className="mt-1 text-sm text-red-600">{errors.organizationDomain}</p>
//                       )}
                      
//                       {/* ✅ NEW: Domain Suggestions */}
//                       {domainSuggestions.length > 0 && (
//                         <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                           <p className="text-sm text-blue-800 font-medium mb-1">Domain Information:</p>
//                           {domainSuggestions.map((suggestion, index) => (
//                             <p key={index} className="text-xs text-blue-700 flex items-start gap-2 mb-1">
//                               <span className="text-blue-500 mt-0.5">•</span>
//                               {suggestion}
//                             </p>
//                           ))}
//                           <p className="text-xs text-blue-600 mt-2">
//                             <strong>Note:</strong> Your account will be automatically connected to organizations with matching domains
//                           </p>
//                         </div>
//                       )}
//                     </div>

//                     {/* Optional Fields - UNCHANGED */}
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Phone Number
//                         </label>
//                         <div className="relative">
//                           <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                           <input
//                             type="tel"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                             placeholder="+1 (555) 000-0000"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Date of Birth
//                         </label>
//                         <div className="relative">
//                           <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                           <input
//                             type="date"
//                             name="dateOfBirth"
//                             value={formData.dateOfBirth}
//                             onChange={handleChange}
//                             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Education Level - UNCHANGED */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Highest Education Level
//                       </label>
//                       <div className="relative">
//                         <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                         <select
//                           name="educationLevel"
//                           value={formData.educationLevel}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white"
//                         >
//                           <option value="">Select your education level</option>
//                           {educationLevels.map((level) => (
//                             <option key={level} value={level}>
//                               {level}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     {/* Next Button - UNCHANGED */}
//                     <button
//                       type="button"
//                       onClick={handleNext}
//                       className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
//                     >
//                       Continue to Security Setup
//                       <ArrowRight className="w-5 h-5" />
//                     </button>
//                   </motion.div>
//                 )}

//                 {/* Step 2: Security Setup - UNCHANGED */}
//                 {currentStep === 2 && (
//                   <motion.div
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     className="space-y-6"
//                   >
//                     <div className="flex items-center justify-between">
//                       <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                         <Shield className="w-5 h-5 text-blue-600" />
//                         Security Setup
//                       </h3>
//                       <button
//                         type="button"
//                         onClick={handleBack}
//                         className="text-sm text-blue-600 hover:text-blue-700 font-medium"
//                       >
//                         ← Back
//                       </button>
//                     </div>

//                     {/* Password - UNCHANGED */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Password *
//                       </label>
//                       <div className="relative">
//                         <input
//                           type={showPassword ? "text" : "password"}
//                           name="password"
//                           value={formData.password}
//                           onChange={handleChange}
//                           className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 pr-12 ${
//                             errors.password ? "border-red-500" : "border-gray-300"
//                           }`}
//                           placeholder="Create a strong password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                         >
//                           {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                         </button>
//                       </div>
                      
//                       {/* Password Strength - UNCHANGED */}
//                       {formData.password && (
//                         <div className="mt-3 space-y-2">
//                           <div className="flex justify-between items-center">
//                             <span className="text-xs text-gray-600">Password strength</span>
//                             <span className={`text-xs font-medium ${
//                               pwdStrength.strength <= 2 ? "text-red-600" :
//                               pwdStrength.strength <= 3 ? "text-yellow-600" :
//                               "text-green-600"
//                             }`}>
//                               {pwdStrength.text}
//                             </span>
//                           </div>
//                           <div className="w-full bg-gray-200 rounded-full h-2">
//                             <div 
//                               className={`h-2 rounded-full transition-all duration-300 ${pwdStrength.color}`}
//                               style={{ width: `${(pwdStrength.strength / 5) * 100}%` }}
//                             ></div>
//                           </div>
//                         </div>
//                       )}
                      
//                       {errors.password && (
//                         <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//                       )}
//                     </div>

//                     {/* Confirm Password - UNCHANGED */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Confirm Password *
//                       </label>
//                       <div className="relative">
//                         <input
//                           type={showConfirmPassword ? "text" : "password"}
//                           name="confirmPassword"
//                           value={formData.confirmPassword}
//                           onChange={handleChange}
//                           className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 pr-12 ${
//                             errors.confirmPassword ? "border-red-500" : "border-gray-300"
//                           }`}
//                           placeholder="Confirm your password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                         >
//                           {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                         </button>
//                       </div>
//                       {errors.confirmPassword && (
//                         <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
//                       )}
//                     </div>

//                     {/* Terms and Conditions - UNCHANGED */}
//                     <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
//                       <input
//                         id="terms"
//                         name="terms"
//                         type="checkbox"
//                         checked={agreeTerms}
//                         onChange={(e) => setAgreeTerms(e.target.checked)}
//                         className={`h-5 w-5 text-blue-600 focus:ring-blue-500 border rounded-md mt-0.5 transition-colors ${
//                           errors.terms ? "border-red-300" : "border-gray-300"
//                         }`}
//                       />
//                       <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
//                         I agree to the{" "}
//                         <a href="/terms" className="text-blue-600 hover:text-blue-500 font-medium">
//                           Terms of Service
//                         </a>{" "}
//                         and{" "}
//                         <a href="/privacy" className="text-blue-600 hover:text-blue-500 font-medium">
//                           Privacy Policy
//                         </a>
//                       </label>
//                     </div>
//                     {errors.terms && (
//                       <p className="text-sm text-red-600">{errors.terms}</p>
//                     )}

//                     {/* Submit Button - UNCHANGED */}
//                     <button
//                       type="submit"
//                       disabled={isLoading || reduxLoading}
//                       className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center gap-2"
//                     >
//                       {(isLoading || reduxLoading) ? (
//                         <>
//                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           Creating Your Account...
//                         </>
//                       ) : (
//                         <>
//                           Create Member Account
//                           <CheckCircle className="w-5 h-5" />
//                         </>
//                       )}
//                     </button>

//                     {errors.submit && (
//                       <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
//                         <p className="text-sm text-red-600 text-center">{errors.submit}</p>
//                       </div>
//                     )}

//                     {isSuccess && (
//                       <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
//                         <p className="text-sm text-green-600 text-center">{message}</p>
//                       </div>
//                     )}
//                   </motion.div>
//                 )}
//               </form>

//               {/* Footer Links - UNCHANGED */}
//               <div className="mt-6 pt-6 border-t border-gray-100 text-center">
//                 <p className="text-sm text-gray-600">
//                   Already have an account?{" "}
//                   <Link to="/signin" className="font-semibold text-blue-600 hover:text-blue-500">
//                     Sign in here
//                   </Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Security Footer - UNCHANGED */}
//         <div className="text-center mt-6">
//           <div className="inline-flex items-center gap-2 text-xs text-gray-500 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
//             <Shield className="w-3 h-3 text-green-500" />
//             Your personal data is securely encrypted and protected
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Mail, Lock, Phone, Calendar, Book, CheckCircle, Shield, Zap, Globe, Award, Clock, Users, ArrowRight, Star, Building } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authslice.js";

export default function MemberSignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
    educationLevel: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading: reduxLoading, isSuccess, message } = useSelector(state => state.auth);

  // Education levels
  const educationLevels = [
    "High School",
    "Associate Degree",
    "Bachelor's Degree", 
    "Master's Degree",
    "Doctorate",
    "Diploma",
    "Certificate",
    "Other"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    
    if (!agreeTerms) newErrors.terms = "You must agree to terms and conditions";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setIsLoading(true);
    
    try {
      const submitData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        phone: formData.phone?.trim() || "",
        dateOfBirth: formData.dateOfBirth || "",
        educationLevel: formData.educationLevel || "",
      };
      
      console.log("Submitting data:", submitData);
      
      const result = await dispatch(registerUser(submitData)).unwrap();
      
      // Success - redirect to dashboard
      setTimeout(() => {
        navigate("/member/dashboard", { 
          state: { message: "Account created successfully!" } 
        });
      }, 2000);
      
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ submit: error });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = (password) => {
    if (!password) return { strength: 0, text: "Very Weak", color: "bg-red-500" };
    
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    const strengthMap = {
      0: { text: "Very Weak", color: "bg-red-500" },
      1: { text: "Weak", color: "bg-red-400" },
      2: { text: "Fair", color: "bg-yellow-500" },
      3: { text: "Good", color: "bg-blue-500" },
      4: { text: "Strong", color: "bg-green-500" },
      5: { text: "Very Strong", color: "bg-green-600" }
    };

    return { strength, ...strengthMap[strength] };
  };

  const pwdStrength = passwordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">✓</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                CertiVerify
              </span>
              <span className="text-xs text-gray-500 font-medium -mt-1">
                by TrueMark
              </span>
            </div>
          </Link>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Join as a Member
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create your account to receive and manage verified certificates
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step === currentStep 
                    ? "bg-blue-600 text-white shadow-lg scale-110" 
                    : step < currentStep 
                    ? "bg-green-500 text-white" 
                    : "bg-gray-200 text-gray-600"
                }`}>
                  {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
                {step < 2 && (
                  <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                    step < currentStep ? "bg-green-500" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <motion.div 
          className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Side - Benefits */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 lg:p-10">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Why Join as Member?</h3>
                  <div className="space-y-4">
                    {[
                      { icon: "📜", text: "Receive verified digital certificates" },
                      { icon: "🔍", text: "Instant certificate verification" },
                      { icon: "💼", text: "Build professional portfolio" },
                      { icon: "🌐", text: "Global recognition of credentials" },
                      { icon: "📊", text: "Track all your achievements" },
                      { icon: "🔒", text: "Secure and private storage" },
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <span className="text-lg">{benefit.icon}</span>
                        <span className="text-sm text-blue-100">{benefit.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Stats */}
                <div className="pt-6 border-t border-blue-500">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">50K+</div>
                      <div className="text-xs text-blue-200">Certificates</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">10K+</div>
                      <div className="text-xs text-blue-200">Members</div>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <div className="inline-flex items-center gap-2 text-sm text-blue-100">
                    <Shield className="w-4 h-4" />
                    Your data is securely encrypted
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-2 p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Personal Details */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      Personal Information
                    </h3>

                    {/* Name Fields */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                              errors.firstName ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter your first name"
                          />
                        </div>
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                              errors.lastName ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter your last name"
                          />
                        </div>
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="your.email@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    {/* Optional Fields */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Education Level */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Highest Education Level
                      </label>
                      <div className="relative">
                        <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                          name="educationLevel"
                          value={formData.educationLevel}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white"
                        >
                          <option value="">Select your education level</option>
                          {educationLevels.map((level) => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Next Button */}
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      Continue to Security Setup
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Security Setup */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        Security Setup
                      </h3>
                      <button
                        type="button"
                        onClick={handleBack}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        ← Back
                      </button>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 pr-12 ${
                            errors.password ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Create a strong password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      
                      {/* Password Strength */}
                      {formData.password && (
                        <div className="mt-3 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">Password strength</span>
                            <span className={`text-xs font-medium ${
                              pwdStrength.strength <= 2 ? "text-red-600" :
                              pwdStrength.strength <= 3 ? "text-yellow-600" :
                              "text-green-600"
                            }`}>
                              {pwdStrength.text}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${pwdStrength.color}`}
                              style={{ width: `${(pwdStrength.strength / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 pr-12 ${
                            errors.confirmPassword ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                      )}
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className={`h-5 w-5 text-blue-600 focus:ring-blue-500 border rounded-md mt-0.5 transition-colors ${
                          errors.terms ? "border-red-300" : "border-gray-300"
                        }`}
                      />
                      <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                        I agree to the{" "}
                        <a href="/terms" className="text-blue-600 hover:text-blue-500 font-medium">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-blue-600 hover:text-blue-500 font-medium">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                    {errors.terms && (
                      <p className="text-sm text-red-600">{errors.terms}</p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading || reduxLoading}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      {(isLoading || reduxLoading) ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Creating Your Account...
                        </>
                      ) : (
                        <>
                          Create Member Account
                          <CheckCircle className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    {errors.submit && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-sm text-red-600 text-center">{errors.submit}</p>
                      </div>
                    )}

                    {isSuccess && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                        <p className="text-sm text-green-600 text-center">{message}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </form>

              {/* Footer Links */}
              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/signin" className="font-semibold text-blue-600 hover:text-blue-500">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Footer */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 text-xs text-gray-500 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
            <Shield className="w-3 h-3 text-green-500" />
            Your personal data is securely encrypted and protected
          </div>
        </div>
      </div>
    </div>
  );
}