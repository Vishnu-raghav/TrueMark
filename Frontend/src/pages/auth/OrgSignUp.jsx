// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { registerOrganization } from "../../features/organization/organizationSlice";
// import { Eye, EyeOff, Building2, Mail, Lock, User, Phone, Globe } from "lucide-react";

// export default function OrgSignUp() {
//   const [formData, setFormData] = useState({
//     organizationName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     contactPerson: "",
//     phone: "",
//     website: "",
//     industry: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoading, isError, message } = useSelector((state) => state.organization);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords don't match!");
//       return;
//     }

//     try {
//       const result = await dispatch(registerOrganization(formData));
//       if (result.type === "organization/registerOrganization/fulfilled") {
//         navigate("/org/dashboard");
//       }
//     } catch (error) {
//       console.error("Registration failed:", error);
//     }
//   };

//   const industries = [
//     "Education",
//     "Corporate",
//     "Healthcare", 
//     "Government",
//     "Technology",
//     "Finance",
//     "Manufacturing",
//     "Other"
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl w-full space-y-8">
//         {/* Header */}
//         <div className="text-center">
//           <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
//             <Building2 className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="mt-6 text-3xl font-bold text-gray-900">
//             Create Organization Account
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Start issuing and verifying certificates for your organization
//           </p>
//         </div>

//         {/* Form */}
//         <form className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100" onSubmit={handleSubmit}>
//           {isError && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
//               {message}
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Organization Name */}
//             <div className="md:col-span-2">
//               <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-2">
//                 Organization Name *
//               </label>
//               <div className="relative">
//                 <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   id="organizationName"
//                   name="organizationName"
//                   type="text"
//                   required
//                   value={formData.organizationName}
//                   onChange={handleChange}
//                   className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   placeholder="Enter organization name"
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div className="md:col-span-2">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                 Organization Email *
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   placeholder="admin@organization.com"
//                 />
//               </div>
//             </div>

//             {/* Contact Person */}
//             <div>
//               <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-2">
//                 Contact Person *
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   id="contactPerson"
//                   name="contactPerson"
//                   type="text"
//                   required
//                   value={formData.contactPerson}
//                   onChange={handleChange}
//                   className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   placeholder="Full name"
//                 />
//               </div>
//             </div>

//             {/* Phone */}
//             <div>
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//                 Phone Number
//               </label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   id="phone"
//                   name="phone"
//                   type="tel"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   placeholder="+1 (555) 123-4567"
//                 />
//               </div>
//             </div>

//             {/* Website */}
//             <div>
//               <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
//                 Website
//               </label>
//               <div className="relative">
//                 <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   id="website"
//                   name="website"
//                   type="url"
//                   value={formData.website}
//                   onChange={handleChange}
//                   className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   placeholder="https://example.com"
//                 />
//               </div>
//             </div>

//             {/* Industry */}
//             <div>
//               <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
//                 Industry *
//               </label>
//               <select
//                 id="industry"
//                 name="industry"
//                 required
//                 value={formData.industry}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//               >
//                 <option value="">Select Industry</option>
//                 {industries.map((industry) => (
//                   <option key={industry} value={industry}>
//                     {industry}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Password */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                 Password *
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   placeholder="Minimum 8 characters"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                 Confirm Password *
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type={showConfirmPassword ? "text" : "password"}
//                   required
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   placeholder="Confirm your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Terms */}
//           <div className="flex items-center">
//             <input
//               id="terms"
//               name="terms"
//               type="checkbox"
//               required
//               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//             />
//             <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
//               I agree to the{" "}
//               <a href="/terms" className="text-blue-600 hover:text-blue-500">
//                 Terms of Service
//               </a>{" "}
//               and{" "}
//               <a href="/privacy" className="text-blue-600 hover:text-blue-500">
//                 Privacy Policy
//               </a>
//             </label>
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//             >
//               {isLoading ? (
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               ) : (
//                 "Create Organization Account"
//               )}
//             </button>
//           </div>

//           {/* Sign In Link */}
//           <div className="text-center">
//             <p className="text-sm text-gray-600">
//               Already have an organization account?{" "}
//               <Link to="/org/signin" className="font-medium text-blue-600 hover:text-blue-500">
//                 Sign in here
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }






























import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Building, User, Mail, MapPin, Phone, Globe, FileText, ArrowRight, CheckCircle, Shield } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { registerOrganization } from "../../features/organization/organizationSlice.js";

export default function OrgSignUp() {
  const [formData, setFormData] = useState({
    // Organization Details
    orgName: "",
    orgEmail: "",
    type: "",
    address: "",
    phone: "",
    website: "",
    description: "",
    
    // Admin Details
    adminName: "",
    adminEmail: "",
    adminPassword: "",
    confirmPassword: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading: reduxLoading, isSuccess, message } = useSelector(state => state.organization);

  // ✅ FIXED: Correct enum values matching backend
  const organizationTypes = [
    { value: "college", label: "Educational Institution", icon: "🎓" },
    { value: "corporate", label: "Corporate Enterprise", icon: "🏢" },
    { value: "training", label: "Training Academy", icon: "🚀" },
    { value: "government", label: "Government Organization", icon: "🛡️" },
    { value: "nonprofit", label: "Non-Profit Organization", icon: "🤝" },
    { value: "other", label: "Other", icon: "🏭" },
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
    
    if (!formData.orgName.trim()) newErrors.orgName = "Organization name is required";
    if (!formData.orgEmail.trim()) newErrors.orgEmail = "Organization email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.orgEmail)) newErrors.orgEmail = "Email is invalid";
    
    if (!formData.type) newErrors.type = "Organization type is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.adminName.trim()) newErrors.adminName = "Admin name is required";
    if (!formData.adminEmail.trim()) newErrors.adminEmail = "Admin email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.adminEmail)) newErrors.adminEmail = "Email is invalid";
    
    if (!formData.adminPassword) newErrors.adminPassword = "Password is required";
    else if (formData.adminPassword.length < 6) newErrors.adminPassword = "Password must be at least 6 characters";
    
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm password";
    else if (formData.adminPassword !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    
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
      // ✅ FIXED: Prepare data exactly as backend expects
      const submitData = {
        orgName: formData.orgName.trim(),
        orgEmail: formData.orgEmail.trim().toLowerCase(),
        adminName: formData.adminName.trim(),
        adminEmail: formData.adminEmail.trim().toLowerCase(),
        adminPassword: formData.adminPassword,
        type: formData.type, // ✅ This should match enum values
        address: formData.address?.trim() || "",
        phone: formData.phone?.trim() || "",
        website: formData.website?.trim() || "",
        description: formData.description?.trim() || "",
      };
      
      console.log("Submitting data:", submitData); // Debug log
      
      const result = await dispatch(registerOrganization(submitData)).unwrap();
      
      // Success - show success message and redirect
      setTimeout(() => {
        navigate("/signin", { 
          state: { 
            message: "Organization registered successfully! Please sign in." 
          } 
        });
      }, 2000);
      
    } catch (error) {
      console.error("Registration failed:", error);
      
      // ✅ Better error handling for backend validation
      if (error.includes("validation failed")) {
        if (error.includes("type")) {
          setErrors({ submit: "Invalid organization type selected" });
        } else if (error.includes("admin")) {
          setErrors({ submit: "Admin user creation failed" });
        } else {
          setErrors({ submit: "Organization validation failed. Please check all fields." });
        }
      } else if (error.includes("already exists")) {
        setErrors({ submit: "Organization with this name or email already exists" });
      } else if (error.includes("Admin email")) {
        setErrors({ submit: "Admin email already in use" });
      } else {
        setErrors({ submit: error });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ FIXED: Type selection with proper enum values
  const handleTypeSelect = (typeValue) => {
    setFormData(prev => ({
      ...prev,
      type: typeValue
    }));
    
    if (errors.type) {
      setErrors(prev => ({
        ...prev,
        type: ""
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
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
            Register Your Organization
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of organizations issuing trusted digital certificates
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
                  <h3 className="text-xl font-bold mb-4">Why Register Your Organization?</h3>
                  <div className="space-y-4">
                    {[
                      { icon: "🏢", text: "Issue verified digital certificates" },
                      { icon: "🔒", text: "Military-grade security & encryption" },
                      { icon: "⚡", text: "Instant certificate verification" },
                      { icon: "🌐", text: "Global recognition and trust" },
                      { icon: "📊", text: "Advanced analytics & reporting" },
                      { icon: "🎯", text: "Custom branding options" },
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <span className="text-lg">{benefit.icon}</span>
                        <span className="text-sm text-blue-100">{benefit.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-6 border-t border-blue-500">
                  <div className="flex items-center justify-center text-sm text-blue-100">
                    <Shield className="w-4 h-4 mr-2" />
                    Enterprise-grade security & compliance
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-2 p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Organization Details */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <Building className="w-5 h-5 text-blue-600" />
                      Organization Information
                    </h3>

                    {/* Organization Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organization Name *
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="orgName"
                          value={formData.orgName}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                            errors.orgName ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter organization name"
                        />
                      </div>
                      {errors.orgName && (
                        <p className="mt-1 text-sm text-red-600">{errors.orgName}</p>
                      )}
                    </div>

                    {/* Organization Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organization Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="orgEmail"
                          value={formData.orgEmail}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                            errors.orgEmail ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="organization@example.com"
                        />
                      </div>
                      {errors.orgEmail && (
                        <p className="mt-1 text-sm text-red-600">{errors.orgEmail}</p>
                      )}
                    </div>

                    {/* Organization Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Organization Type *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {organizationTypes.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => handleTypeSelect(type.value)}
                            className={`p-3 border rounded-xl text-left transition-all duration-200 ${
                              formData.type === type.value
                                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-20"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{type.icon}</span>
                              <span className="text-sm font-medium text-gray-700">{type.label}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                      {errors.type && (
                        <p className="mt-1 text-sm text-red-600">{errors.type}</p>
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
                          Website
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="https://example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="Enter organization address"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows="3"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                          placeholder="Brief description of your organization..."
                        />
                      </div>
                    </div>

                    {/* Next Button */}
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      Continue to Admin Details
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Admin Details */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-600" />
                        Admin Account Setup
                      </h3>
                      <button
                        type="button"
                        onClick={handleBack}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        ← Back
                      </button>
                    </div>

                    {/* Admin Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Admin Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="adminName"
                          value={formData.adminName}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                            errors.adminName ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter admin full name"
                        />
                      </div>
                      {errors.adminName && (
                        <p className="mt-1 text-sm text-red-600">{errors.adminName}</p>
                      )}
                    </div>

                    {/* Admin Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Admin Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="adminEmail"
                          value={formData.adminEmail}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                            errors.adminEmail ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="admin@example.com"
                        />
                      </div>
                      {errors.adminEmail && (
                        <p className="mt-1 text-sm text-red-600">{errors.adminEmail}</p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="adminPassword"
                          value={formData.adminPassword}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 pr-12 ${
                            errors.adminPassword ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.adminPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.adminPassword}</p>
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

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading || reduxLoading}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      {(isLoading || reduxLoading) ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Registering Organization...
                        </>
                      ) : (
                        <>
                          Complete Registration
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
                  Already have an organization account?{" "}
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
            Your organization data is securely encrypted and protected
          </div>
        </div>
      </div>
    </div>
  );
}