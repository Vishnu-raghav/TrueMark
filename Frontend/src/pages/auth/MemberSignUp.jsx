// // import { useState, useEffect } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import { registerUser, resetAuthState } from "../../features/auth/authSlice";
// // import { Eye, EyeOff, User, Mail, Lock, Phone, Calendar, Book, CheckCircle, XCircle, Shield, Zap, Globe, Award, Clock, Users, ArrowRight } from "lucide-react";

// // export default function MemberSignUp() {
// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //     phone: "",
// //     dateOfBirth: "",
// //     educationLevel: "",
// //   });
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [agreeTerms, setAgreeTerms] = useState(false);
// //   const [formErrors, setFormErrors] = useState({});
// //   const [touchedFields, setTouchedFields] = useState({});

// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

// //   // Reset auth state when component mounts
// //   useEffect(() => {
// //     dispatch(resetAuthState());
// //   }, [dispatch]);

// //   // Redirect on successful registration
// //   useEffect(() => {
// //     if (isSuccess) {
// //       navigate("/member/dashboard");
// //     }
// //   }, [isSuccess, navigate]);

// //   // Handle field blur
// //   const handleBlur = (e) => {
// //     const { name } = e.target;
// //     setTouchedFields({
// //       ...touchedFields,
// //       [name]: true
// //     });

// //     const errors = validateField(name, formData[name]);
// //     if (errors[name]) {
// //       setFormErrors({
// //         ...formErrors,
// //         [name]: errors[name]
// //       });
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     });
    
// //     // Clear error when user starts typing
// //     if (formErrors[name] && touchedFields[name]) {
// //       setFormErrors({
// //         ...formErrors,
// //         [name]: ""
// //       });
// //     }

// //     // Real-time password matching
// //     if ((name === "password" || name === "confirmPassword") && formData.confirmPassword) {
// //       if (name === "password" && formData.confirmPassword && value !== formData.confirmPassword) {
// //         setFormErrors({
// //           ...formErrors,
// //           confirmPassword: "Passwords do not match"
// //         });
// //       } else if (name === "confirmPassword" && value !== formData.password) {
// //         setFormErrors({
// //           ...formErrors,
// //           confirmPassword: "Passwords do not match"
// //         });
// //       } else if (formErrors.confirmPassword === "Passwords do not match") {
// //         const newErrors = { ...formErrors };
// //         delete newErrors.confirmPassword;
// //         setFormErrors(newErrors);
// //       }
// //     }
// //   };

// //   const validateField = (fieldName, value) => {
// //     const errors = {};

// //     switch (fieldName) {
// //       case "firstName":
// //         if (!value.trim()) {
// //           errors.firstName = "First name is required";
// //         } else if (value.trim().length < 2) {
// //           errors.firstName = "First name must be at least 2 characters";
// //         }
// //         break;

// //       case "lastName":
// //         if (!value.trim()) {
// //           errors.lastName = "Last name is required";
// //         } else if (value.trim().length < 2) {
// //           errors.lastName = "Last name must be at least 2 characters";
// //         }
// //         break;

// //       case "email":
// //         if (!value.trim()) {
// //           errors.email = "Email is required";
// //         } else if (!/\S+@\S+\.\S+/.test(value)) {
// //           errors.email = "Please enter a valid email address";
// //         }
// //         break;

// //       case "password":
// //         if (!value) {
// //           errors.password = "Password is required";
// //         } else if (value.length < 8) {
// //           errors.password = "Password must be at least 8 characters";
// //         } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
// //           errors.password = "Must include uppercase, lowercase, and numbers";
// //         }
// //         break;

// //       case "confirmPassword":
// //         if (!value) {
// //           errors.confirmPassword = "Please confirm your password";
// //         } else if (value !== formData.password) {
// //           errors.confirmPassword = "Passwords do not match";
// //         }
// //         break;

// //       default:
// //         break;
// //     }

// //     return errors;
// //   };

// //   const validateForm = () => {
// //     const errors = {};

// //     Object.keys(formData).forEach(field => {
// //       const fieldErrors = validateField(field, formData[field]);
// //       Object.assign(errors, fieldErrors);
// //     });

// //     if (!agreeTerms) {
// //       errors.terms = "You must agree to the terms and conditions";
// //     }

// //     return errors;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     // Mark all fields as touched
// //     const allFields = {};
// //     Object.keys(formData).forEach(field => {
// //       allFields[field] = true;
// //     });
// //     setTouchedFields(allFields);
    
// //     const errors = validateForm();
// //     if (Object.keys(errors).length > 0) {
// //       setFormErrors(errors);
// //       return;
// //     }

// //     const registrationData = {
// //       firstName: formData.firstName.trim(),
// //       lastName: formData.lastName.trim(),
// //       email: formData.email.trim().toLowerCase(),
// //       password: formData.password,
// //       phone: formData.phone.trim(),
// //       dateOfBirth: formData.dateOfBirth || null,
// //       educationLevel: formData.educationLevel || ""
// //     };

// //     try {
// //       await dispatch(registerUser(registrationData));
// //     } catch (error) {
// //       console.error("Registration failed:", error);
// //     }
// //   };

// //   // 🛡️ ENHANCED ERROR MESSAGE HANDLER
// //   const getErrorMessage = () => {
// //     if (!isError || !message) return null;
    
// //     const errorMsg = message.toLowerCase();
    
// //     // Specific error cases handle karein
// //     if (errorMsg.includes('already exist') || 
// //         errorMsg.includes('already registered') ||
// //         errorMsg.includes('email exist') ||
// //         errorMsg.includes('user already') ||
// //         errorMsg.includes('email already') ||
// //         errorMsg.includes('duplicate') ||
// //         errorMsg.includes('already exists')) {
// //       return {
// //         type: 'email_exists',
// //         message: "An account with this email address already exists. Please try signing in or use a different email address."
// //       };
// //     }
    
// //     if (errorMsg.includes('password') || errorMsg.includes('weak password')) {
// //       return {
// //         type: 'password_error',
// //         message: "Please choose a stronger password with at least 8 characters including uppercase, lowercase letters and numbers."
// //       };
// //     }
    
// //     if (errorMsg.includes('network') || errorMsg.includes('connection') || errorMsg.includes('timeout')) {
// //       return {
// //         type: 'network_error',
// //         message: "Network connection issue. Please check your internet connection and try again."
// //       };
// //     }
    
// //     if (errorMsg.includes('validation') || errorMsg.includes('invalid')) {
// //       return {
// //         type: 'validation_error',
// //         message: "Please check your information and try again. Make sure all required fields are filled correctly."
// //       };
// //     }
    
// //     // Default case
// //     return {
// //       type: 'general_error',
// //       message: message || "Registration failed. Please try again."
// //     };
// //   };

// //   const educationLevels = [
// //     "High School",
// //     "Associate Degree",
// //     "Bachelor's Degree",
// //     "Master's Degree",
// //     "Doctorate",
// //     "Diploma",
// //     "Certificate",
// //     "Other"
// //   ];

// //   const passwordStrength = (password) => {
// //     if (!password) return { strength: 0, text: "", color: "" };
    
// //     let strength = 0;
// //     if (password.length >= 8) strength += 1;
// //     if (/[a-z]/.test(password)) strength += 1;
// //     if (/[A-Z]/.test(password)) strength += 1;
// //     if (/[0-9]/.test(password)) strength += 1;
// //     if (/[^A-Za-z0-9]/.test(password)) strength += 1;

// //     const strengthMap = {
// //       0: { text: "Very Weak", color: "bg-red-500" },
// //       1: { text: "Weak", color: "bg-red-400" },
// //       2: { text: "Fair", color: "bg-yellow-500" },
// //       3: { text: "Good", color: "bg-blue-500" },
// //       4: { text: "Strong", color: "bg-green-500" },
// //       5: { text: "Very Strong", color: "bg-green-600" }
// //     };

// //     return { strength, ...strengthMap[strength] };
// //   };

// //   const pwdStrength = passwordStrength(formData.password);
// //   const errorInfo = getErrorMessage();

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
// //       {/* Animated Background Elements */}
// //       <div className="absolute inset-0 overflow-hidden">
// //         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
// //         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
// //         <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
// //       </div>

// //       <div className="max-w-7xl w-full grid grid-cols-1 xl:grid-cols-2 gap-12 relative z-10">
        
// //         {/* Left Side - Hero Section */}
// //         <div className="flex flex-col justify-center space-y-8 text-white">
// //           <div className="space-y-6">
// //             <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
// //               <Award className="w-4 h-4" />
// //               <span className="text-sm font-medium">Trusted by 10,000+ Professionals</span>
// //             </div>
            
// //             <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
// //               Verify Certificates 
// //               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 block">
// //                 Instantly
// //               </span>
// //             </h1>
            
// //             <p className="text-xl text-gray-300 leading-relaxed">
// //               The world's most trusted platform for certificate verification and management. 
// //               Join professionals from top companies worldwide.
// //             </p>
// //           </div>

// //           {/* Features Grid */}
// //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
// //             {[
// //               {
// //                 icon: <Shield className="w-6 h-6" />,
// //                 title: "Bank-Level Security",
// //                 desc: "Military-grade encryption"
// //               },
// //               {
// //                 icon: <Zap className="w-6 h-6" />,
// //                 title: "Instant Verification",
// //                 desc: "Real-time validation"
// //               },
// //               {
// //                 icon: <Globe className="w-6 h-6" />,
// //                 title: "Global Recognition",
// //                 desc: "Accepted worldwide"
// //               },
// //               {
// //                 icon: <Users className="w-6 h-6" />,
// //                 title: "Enterprise Ready",
// //                 desc: "Trusted by companies"
// //               }
// //             ].map((feature, index) => (
// //               <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
// //                 <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
// //                   {feature.icon}
// //                 </div>
// //                 <div>
// //                   <h3 className="font-semibold text-white">{feature.title}</h3>
// //                   <p className="text-gray-400 text-sm">{feature.desc}</p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Stats */}
// //           <div className="flex space-x-8 pt-4">
// //             {[
// //               { number: "50K+", label: "Certificates" },
// //               { number: "10K+", label: "Users" },
// //               { number: "500+", label: "Companies" }
// //             ].map((stat, index) => (
// //               <div key={index} className="text-center">
// //                 <div className="text-2xl font-bold text-white">{stat.number}</div>
// //                 <div className="text-gray-400 text-sm">{stat.label}</div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Right Side - Signup Form */}
// //         <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
// //           <div className="text-center mb-8">
// //             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4">
// //               <Award className="w-8 h-8 text-white" />
// //             </div>
// //             <h2 className="text-3xl font-bold text-gray-900">
// //               Start Your Journey
// //             </h2>
// //             <p className="mt-2 text-gray-600">
// //               Join CertVerify in under 2 minutes
// //             </p>
// //           </div>

// //           <form className="space-y-6" onSubmit={handleSubmit} noValidate>
// //             {/* 🛡️ ENHANCED ERROR MESSAGE DISPLAY */}
// //             {errorInfo && (
// //               <div className={`flex items-start space-x-3 p-4 rounded-xl border text-sm ${
// //                 errorInfo.type === 'email_exists' 
// //                   ? 'bg-orange-50 border-orange-200 text-orange-800'
// //                   : errorInfo.type === 'network_error'
// //                   ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
// //                   : 'bg-red-50 border-red-200 text-red-700'
// //               }`}>
// //                 <XCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
// //                   errorInfo.type === 'email_exists' ? 'text-orange-600' :
// //                   errorInfo.type === 'network_error' ? 'text-yellow-600' :
// //                   'text-red-600'
// //                 }`} />
// //                 <div className="flex-1">
// //                   <p className="font-medium mb-1">
// //                     {errorInfo.type === 'email_exists' ? 'Account Already Exists' :
// //                      errorInfo.type === 'network_error' ? 'Connection Issue' :
// //                      'Registration Failed'}
// //                   </p>
// //                   <p>{errorInfo.message}</p>
                  
// //                   {/* Additional actions for specific errors */}
// //                   {errorInfo.type === 'email_exists' && (
// //                     <div className="mt-2">
// //                       <Link 
// //                         to="/signin" 
// //                         className="inline-flex items-center text-sm font-medium text-orange-700 hover:text-orange-800"
// //                       >
// //                         Sign in to your account →
// //                       </Link>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Name Fields */}
// //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //               <div>
// //                 <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
// //                   First Name *
// //                 </label>
// //                 <div className="relative">
// //                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
// //                   <input
// //                     id="firstName"
// //                     name="firstName"
// //                     type="text"
// //                     required
// //                     value={formData.firstName}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     className={`pl-10 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
// //                       formErrors.firstName ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
// //                     }`}
// //                     placeholder="John"
// //                   />
// //                 </div>
// //                 {formErrors.firstName && touchedFields.firstName && (
// //                   <p className="mt-2 flex items-center space-x-1 text-sm text-red-600">
// //                     <XCircle className="w-4 h-4" />
// //                     <span>{formErrors.firstName}</span>
// //                   </p>
// //                 )}
// //               </div>

// //               <div>
// //                 <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
// //                   Last Name *
// //                 </label>
// //                 <div className="relative">
// //                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
// //                   <input
// //                     id="lastName"
// //                     name="lastName"
// //                     type="text"
// //                     required
// //                     value={formData.lastName}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     className={`pl-10 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
// //                       formErrors.lastName ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
// //                     }`}
// //                     placeholder="Doe"
// //                   />
// //                 </div>
// //                 {formErrors.lastName && touchedFields.lastName && (
// //                   <p className="mt-2 flex items-center space-x-1 text-sm text-red-600">
// //                     <XCircle className="w-4 h-4" />
// //                     <span>{formErrors.lastName}</span>
// //                   </p>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Email */}
// //             <div>
// //               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
// //                 Email Address *
// //               </label>
// //               <div className="relative">
// //                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
// //                 <input
// //                   id="email"
// //                   name="email"
// //                   type="email"
// //                   required
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   onBlur={handleBlur}
// //                   className={`pl-10 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
// //                     formErrors.email ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
// //                   }`}
// //                   placeholder="john@company.com"
// //                 />
// //               </div>
// //               {formErrors.email && touchedFields.email && (
// //                 <p className="mt-2 flex items-center space-x-1 text-sm text-red-600">
// //                   <XCircle className="w-4 h-4" />
// //                   <span>{formErrors.email}</span>
// //                 </p>
// //               )}
// //             </div>

// //             {/* Phone & Date of Birth */}
// //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //               <div>
// //                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
// //                   Phone Number
// //                 </label>
// //                 <div className="relative">
// //                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
// //                   <input
// //                     id="phone"
// //                     name="phone"
// //                     type="tel"
// //                     value={formData.phone}
// //                     onChange={handleChange}
// //                     className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
// //                     placeholder="+1 (555) 123-4567"
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
// //                   Date of Birth
// //                 </label>
// //                 <div className="relative">
// //                   <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
// //                   <input
// //                     id="dateOfBirth"
// //                     name="dateOfBirth"
// //                     type="date"
// //                     value={formData.dateOfBirth}
// //                     onChange={handleChange}
// //                     className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Education Level */}
// //             <div>
// //               <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700 mb-2">
// //                 Highest Education Level
// //               </label>
// //               <div className="relative">
// //                 <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
// //                 <select
// //                   id="educationLevel"
// //                   name="educationLevel"
// //                   value={formData.educationLevel}
// //                   onChange={handleChange}
// //                   className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white hover:border-gray-400"
// //                 >
// //                   <option value="">Select Education Level</option>
// //                   {educationLevels.map((level) => (
// //                     <option key={level} value={level}>
// //                       {level}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
// //             </div>

// //             {/* Password */}
// //             <div>
// //               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
// //                 Password *
// //               </label>
// //               <div className="relative">
// //                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
// //                 <input
// //                   id="password"
// //                   name="password"
// //                   type={showPassword ? "text" : "password"}
// //                   required
// //                   value={formData.password}
// //                   onChange={handleChange}
// //                   onBlur={handleBlur}
// //                   className={`pl-10 pr-10 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
// //                     formErrors.password ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
// //                   }`}
// //                   placeholder="Create a strong password"
// //                   minLength="8"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
// //                 >
// //                   {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //                 </button>
// //               </div>
              
// //               {/* Password Strength */}
// //               {formData.password && (
// //                 <div className="mt-3 space-y-2">
// //                   <div className="flex justify-between items-center">
// //                     <span className="text-xs text-gray-600">Password strength</span>
// //                     <span className={`text-xs font-medium ${
// //                       pwdStrength.strength <= 2 ? "text-red-600" :
// //                       pwdStrength.strength <= 3 ? "text-yellow-600" :
// //                       "text-green-600"
// //                     }`}>
// //                       {pwdStrength.text}
// //                     </span>
// //                   </div>
// //                   <div className="w-full bg-gray-200 rounded-full h-2">
// //                     <div 
// //                       className={`h-2 rounded-full transition-all duration-300 ${
// //                         pwdStrength.strength <= 2 ? "bg-red-500" :
// //                         pwdStrength.strength <= 3 ? "bg-yellow-500" :
// //                         "bg-green-500"
// //                       }`}
// //                       style={{ width: `${(pwdStrength.strength / 5) * 100}%` }}
// //                     ></div>
// //                   </div>
// //                 </div>
// //               )}
              
// //               {formErrors.password && touchedFields.password && (
// //                 <p className="mt-2 flex items-center space-x-1 text-sm text-red-600">
// //                   <XCircle className="w-4 h-4" />
// //                   <span>{formErrors.password}</span>
// //                 </p>
// //               )}
// //             </div>

// //             {/* Confirm Password */}
// //             <div>
// //               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
// //                 Confirm Password *
// //               </label>
// //               <div className="relative">
// //                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
// //                 <input
// //                   id="confirmPassword"
// //                   name="confirmPassword"
// //                   type={showConfirmPassword ? "text" : "password"}
// //                   required
// //                   value={formData.confirmPassword}
// //                   onChange={handleChange}
// //                   onBlur={handleBlur}
// //                   className={`pl-10 pr-10 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
// //                     formErrors.confirmPassword ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
// //                   }`}
// //                   placeholder="Confirm your password"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
// //                 >
// //                   {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //                 </button>
// //               </div>
// //               {formErrors.confirmPassword && touchedFields.confirmPassword && (
// //                 <p className="mt-2 flex items-center space-x-1 text-sm text-red-600">
// //                   <XCircle className="w-4 h-4" />
// //                   <span>{formErrors.confirmPassword}</span>
// //                 </p>
// //               )}
// //             </div>

// //             {/* Terms and Conditions */}
// //             <div className="flex items-start space-x-3">
// //               <input
// //                 id="terms"
// //                 name="terms"
// //                 type="checkbox"
// //                 checked={agreeTerms}
// //                 onChange={(e) => {
// //                   setAgreeTerms(e.target.checked);
// //                   if (formErrors.terms) {
// //                     setFormErrors({...formErrors, terms: ""});
// //                   }
// //                 }}
// //                 className={`h-5 w-5 text-blue-600 focus:ring-blue-500 border rounded-md mt-0.5 transition-colors ${
// //                   formErrors.terms ? "border-red-300" : "border-gray-300"
// //                 }`}
// //               />
// //               <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
// //                 I agree to the{" "}
// //                 <a href="/terms" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
// //                   Terms of Service
// //                 </a>{" "}
// //                 and{" "}
// //                 <a href="/privacy" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
// //                   Privacy Policy
// //                 </a>
// //               </label>
// //             </div>
// //             {formErrors.terms && (
// //               <p className="flex items-center space-x-1 text-sm text-red-600">
// //                 <XCircle className="w-4 h-4" />
// //                 <span>{formErrors.terms}</span>
// //               </p>
// //             )}

// //             {/* Submit Button */}
// //             <div>
// //               <button
// //                 type="submit"
// //                 disabled={isLoading}
// //                 className="group relative w-full flex justify-center items-center space-x-3 py-4 px-6 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
// //               >
// //                 {isLoading ? (
// //                   <>
// //                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //                     <span>Creating Your Account...</span>
// //                   </>
// //                 ) : (
// //                   <>
// //                     <span>Create Professional Account</span>
// //                     <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
// //                   </>
// //                 )}
// //               </button>
// //             </div>

// //             {/* Sign In Link */}
// //             <div className="text-center pt-4 border-t border-gray-200">
// //               <p className="text-sm text-gray-600">
// //                 Already have an account?{" "}
// //                 <Link to="/signin" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
// //                   Sign in to your account
// //                 </Link>
// //               </p>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }





// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Eye, EyeOff, User, Mail, Lock, Phone, Calendar, Book, CheckCircle, Shield, Zap, Globe, Award, Clock, Users, ArrowRight, Star } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../../features/auth/authslice";

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
//   });
  
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});
  
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
//         {/* Header */}
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

//         {/* Progress Steps */}
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

//         {/* Form Container */}
//         <motion.div 
//           className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="grid grid-cols-1 lg:grid-cols-3">
//             {/* Left Side - Benefits */}
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
                
//                 {/* Stats */}
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

//             {/* Right Side - Form */}
//             <div className="lg:col-span-2 p-8 lg:p-10">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Step 1: Personal Details */}
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

//                     {/* Name Fields */}
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

//                     {/* Email */}
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

//                     {/* Optional Fields */}
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

//                     {/* Education Level */}
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

//                     {/* Next Button */}
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

//                 {/* Step 2: Security Setup */}
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

//                     {/* Password */}
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
                      
//                       {/* Password Strength */}
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

//                     {/* Confirm Password */}
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

//                     {/* Terms and Conditions */}
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

//                     {/* Submit Button */}
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

//               {/* Footer Links */}
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

//         {/* Security Footer */}
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
    organizationDomain: "", // ✅ NEW: Organization domain field
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [domainSuggestions, setDomainSuggestions] = useState([]); // ✅ NEW: Domain suggestions
  
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

  // ✅ NEW: Extract domain from email and suggest organizations
  useEffect(() => {
    if (formData.email && formData.email.includes('@')) {
      const emailDomain = formData.email.split('@')[1];
      
      // Auto-fill organization domain if empty
      if (!formData.organizationDomain) {
        setFormData(prev => ({
          ...prev,
          organizationDomain: emailDomain
        }));
      }
      
      // Simulate domain suggestions (in real app, you'd fetch from API)
      const suggestions = getDomainSuggestions(emailDomain);
      setDomainSuggestions(suggestions);
    } else {
      setDomainSuggestions([]);
    }
  }, [formData.email, formData.organizationDomain]);

  // ✅ NEW: Get domain suggestions (simulated)
  const getDomainSuggestions = (domain) => {
    const commonDomains = {
      'gmail.com': [],
      'yahoo.com': [],
      'outlook.com': [],
      'hotmail.com': []
    };
    
    if (commonDomains[domain]) {
      return [];
    }
    
    // Simulate finding organizations with this domain
    return [
      `We found organizations with domain: ${domain}`,
      "Your account will be automatically connected if domain matches"
    ];
  };

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
    
    // ✅ NEW: Validate organization domain
    if (!formData.organizationDomain.trim()) {
      newErrors.organizationDomain = "Organization domain is required";
    } else if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.organizationDomain)) {
      newErrors.organizationDomain = "Please enter a valid domain (e.g., company.com)";
    }
    
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
        organizationDomain: formData.organizationDomain.trim().toLowerCase(), // ✅ NEW: Include domain
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
        {/* Header - UNCHANGED */}
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

        {/* Progress Steps - UNCHANGED */}
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

        {/* Form Container - UNCHANGED */}
        <motion.div 
          className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Side - Benefits - UNCHANGED */}
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
                
                {/* Stats - UNCHANGED */}
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

            {/* Right Side - Form - UPDATED */}
            <div className="lg:col-span-2 p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Personal Details - UPDATED */}
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

                    {/* Name Fields - UNCHANGED */}
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

                    {/* Email - UNCHANGED */}
                    {/* <div>
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
                    </div> */}

                    {/* ✅ NEW: Organization Domain Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Organization Domain *
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="organizationDomain"
                          value={formData.organizationDomain}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                            errors.organizationDomain ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="e.g., eitfaridabad.co.in"
                        />
                      </div>
                      {errors.organizationDomain && (
                        <p className="mt-1 text-sm text-red-600">{errors.organizationDomain}</p>
                      )}
                      
                      {/* ✅ NEW: Domain Suggestions */}
                      {domainSuggestions.length > 0 && (
                        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-800 font-medium mb-1">Domain Information:</p>
                          {domainSuggestions.map((suggestion, index) => (
                            <p key={index} className="text-xs text-blue-700 flex items-start gap-2 mb-1">
                              <span className="text-blue-500 mt-0.5">•</span>
                              {suggestion}
                            </p>
                          ))}
                          <p className="text-xs text-blue-600 mt-2">
                            <strong>Note:</strong> Your account will be automatically connected to organizations with matching domains
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Optional Fields - UNCHANGED */}
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

                    {/* Education Level - UNCHANGED */}
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

                    {/* Next Button - UNCHANGED */}
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

                {/* Step 2: Security Setup - UNCHANGED */}
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

                    {/* Password - UNCHANGED */}
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
                      
                      {/* Password Strength - UNCHANGED */}
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

                    {/* Confirm Password - UNCHANGED */}
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

                    {/* Terms and Conditions - UNCHANGED */}
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

                    {/* Submit Button - UNCHANGED */}
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

              {/* Footer Links - UNCHANGED */}
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

        {/* Security Footer - UNCHANGED */}
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
