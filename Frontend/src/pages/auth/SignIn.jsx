import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Building, User, Mail, Lock, ArrowRight, Shield, Zap, Globe, Award, CheckCircle, Star, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authslice.js";
import { loginOrganization } from "../../features/organization/organizationSlice.js";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("member"); // 'member' or 'organization'
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get states from both slices
  const authState = useSelector(state => state.auth);
  const orgState = useSelector(state => state.organization);

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.password) newErrors.password = "Password is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const credentials = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      let result;
      
      if (userType === "organization") {
        result = await dispatch(loginOrganization(credentials)).unwrap();
        // Redirect to organization dashboard
        setTimeout(() => {
          navigate("/org/dashboard");
        }, 1000);
      } else {
        result = await dispatch(loginUser(credentials)).unwrap();
        // Redirect to member dashboard
        setTimeout(() => {
          navigate("/member/dashboard");
        }, 1000);
      }
      
    } catch (error) {
      console.error("Login failed:", error);
      
      // Better error handling
      if (error.includes("Invalid credentials") || error.includes("Invalid email or password")) {
        setErrors({ submit: "Invalid email or password. Please try again." });
      } else if (error.includes("not found")) {
        setErrors({ submit: "No account found with this email address." });
      } else if (error.includes("suspended") || error.includes("inactive")) {
        setErrors({ submit: "Your account is currently inactive. Please contact support." });
      } else {
        setErrors({ submit: error });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Get current loading state based on user type
  const currentLoading = isLoading || 
    (userType === "organization" ? orgState.isLoading : authState.isLoading);

  // Get current error message
  const currentError = userType === "organization" ? orgState.message : authState.message;

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
            Welcome Back
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sign in to your account and continue your journey
          </p>
        </div>

        {/* Main Container */}
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
                  <h3 className="text-xl font-bold mb-4">
                    {userType === "organization" ? "Organization Benefits" : "Member Benefits"}
                  </h3>
                  <div className="space-y-4">
                    {userType === "organization" ? [
                      { icon: "🏢", text: "Issue verified certificates" },
                      { icon: "🔒", text: "Military-grade security" },
                      { icon: "⚡", text: "Instant verification" },
                      { icon: "🌐", text: "Global recognition" },
                      { icon: "📊", text: "Advanced analytics" },
                      { icon: "🎯", text: "Custom branding" },
                    ] : [
                      { icon: "📜", text: "Receive verified certificates" },
                      { icon: "🔍", text: "Instant verification" },
                      { icon: "💼", text: "Build professional portfolio" },
                      { icon: "🌐", text: "Global credential recognition" },
                      { icon: "📊", text: "Track achievements" },
                      { icon: "🔒", text: "Secure storage" },
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
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">50K+</div>
                      <div className="text-xs text-blue-200">Certificates</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        {userType === "organization" ? "500+" : "10K+"}
                      </div>
                      <div className="text-xs text-blue-200">
                        {userType === "organization" ? "Organizations" : "Members"}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">99.9%</div>
                      <div className="text-xs text-blue-200">Uptime</div>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <div className="inline-flex items-center gap-2 text-sm text-blue-100">
                    <Shield className="w-4 h-4" />
                    Enterprise-grade security & compliance
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-2 p-8 lg:p-10">
              {/* User Type Selection */}
              <div className="bg-gray-50 rounded-2xl p-1 mb-6">
                <div className="flex rounded-xl bg-white p-1 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setUserType("member")}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      userType === "member" 
                        ? "bg-blue-600 text-white shadow-sm" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    Member
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("organization")}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      userType === "organization" 
                        ? "bg-blue-600 text-white shadow-sm" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    Organization
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Sign in as {userType === "organization" ? "Organization" : "Member"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Enter your credentials to access your account
                  </p>
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
                      placeholder={`your.${userType === 'organization' ? 'organization' : 'email'}@example.com`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
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
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 pr-12 ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your password"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                      Forgot password?
                    </a>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={currentLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {currentLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In as {userType === "organization" ? "Organization" : "Member"}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Error Message */}
                {errors.submit && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-600 text-center">{errors.submit}</p>
                  </div>
                )}

                {/* Success Message */}
                {(authState.isSuccess || orgState.isSuccess) && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-sm text-green-600 text-center">
                      {userType === "organization" ? orgState.message : authState.message}
                    </p>
                  </div>
                )}
              </form>

              {/* Sign Up Links */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-600 text-center">
                  Don't have an account?{" "}
                  {userType === "organization" ? (
                    <Link to="/org/signup" className="font-semibold text-blue-600 hover:text-blue-500">
                      Register your organization
                    </Link>
                  ) : (
                    <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-500">
                      Create member account
                    </Link>
                  )}
                </p>
              </div>

              {/* Switch Account Type Hint */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  {userType === "organization" 
                    ? "Looking to sign in as a member? " 
                    : "Looking to sign in as an organization? "
                  }
                  <button
                    type="button"
                    onClick={() => setUserType(userType === "organization" ? "member" : "organization")}
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Switch to {userType === "organization" ? "Member" : "Organization"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Footer */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 text-xs text-gray-500 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
            <Shield className="w-3 h-3 text-green-500" />
            Your data is securely encrypted and protected
          </div>
        </div>
      </div>
    </div>
  );
}