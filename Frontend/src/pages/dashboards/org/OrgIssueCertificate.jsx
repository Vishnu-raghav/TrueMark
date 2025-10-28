import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  Upload, 
  User, 
  FileText, 
  Calendar,
  Users,
  X,
  Search,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import { getOrgStudents } from '../../../features/organization/organizationSlice';
import { issueCertificate, resetCertificateState } from '../../../features/certificate/certificateSlice';

export default function OrgIssueCertificate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { 
    students, 
    studentsLoading, 
    studentsError 
  } = useSelector(state => state.organization);
  
  const { 
    isLoading, 
    isSuccess, 
    isError, 
    message 
  } = useSelector(state => state.certificate);
  
  const [formData, setFormData] = useState({
    studentId: '',
    title: '',
    description: '',
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    file: null
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showStudentList, setShowStudentList] = useState(false);
  const [errors, setErrors] = useState({});
  const [localError, setLocalError] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false); // ✅ NEW: Track manual submission

  // ✅ Reset certificate state when component mounts
  useEffect(() => {
    console.log("🔄 OrgIssueCertificate mounted - resetting certificate state");
    dispatch(resetCertificateState());
  }, [dispatch]);

  // ✅ Fetch students ONLY when component mounts, not on every render
  useEffect(() => {
    console.log("🔄 Fetching students for certificate issuance...");
    dispatch(getOrgStudents());
  }, [dispatch]); // ✅ Only dispatch dependency

  // ✅ FIXED: Navigation only when user manually submitted
  useEffect(() => {
    if (isSuccess && hasSubmitted) {
      console.log("✅ Certificate issued successfully! Redirecting...");
      const redirectTimer = setTimeout(() => {
        dispatch(resetCertificateState());
        setHasSubmitted(false); // ✅ Reset submission flag
        navigate('/org/dashboard');
      }, 2000);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [isSuccess, hasSubmitted, navigate, dispatch]);

  useEffect(() => {
    if (isError) {
      console.log("❌ Certificate issuance error:", message);
      setLocalError(message);
      setHasSubmitted(false); // ✅ Reset on error too
    }
  }, [isError, message]);

  // ✅ Reset when component unmounts
  useEffect(() => {
    return () => {
      console.log("🧹 OrgIssueCertificate unmounting - cleaning up");
      dispatch(resetCertificateState());
    };
  }, [dispatch]);

  const filteredStudents = students?.filter(student => 
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const selectedStudent = students?.find(s => s._id === formData.studentId);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.studentId) {
      newErrors.studentId = 'Please select a student';
    }
    
    if (!formData.title.trim()) {
      newErrors.title = 'Certificate title is required';
    }
    
    if (!formData.file) {
      newErrors.file = 'Certificate file is required';
    }
    
    if (!formData.issueDate) {
      newErrors.issueDate = 'Issue date is required';
    } else {
      const issueDate = new Date(formData.issueDate);
      const today = new Date();
      if (issueDate > today) {
        newErrors.issueDate = 'Issue date cannot be in the future';
      }
    }
    
    if (formData.expiryDate) {
      const expiryDate = new Date(formData.expiryDate);
      const issueDate = new Date(formData.issueDate);
      if (expiryDate <= issueDate) {
        newErrors.expiryDate = 'Expiry date must be after issue date';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    e.stopPropagation();
    
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 10 * 1024 * 1024;
      
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ 
          ...prev, 
          file: 'Please upload PDF, JPG, or PNG files only' 
        }));
        return;
      }
      
      if (file.size > maxSize) {
        setErrors(prev => ({ 
          ...prev, 
          file: 'File size must be less than 10MB' 
        }));
        return;
      }
      
      setFormData(prev => ({ ...prev, file }));
      setErrors(prev => ({ ...prev, file: '' }));
      setLocalError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLocalError('');
    setHasSubmitted(true); // ✅ MARK: User manually submitted
    
    if (!validateForm()) {
      console.log("❌ Form validation failed");
      setHasSubmitted(false); // ✅ Reset if validation fails
      return;
    }

    console.log("📤 Submitting certificate data...", formData);

    const submitData = new FormData();
    submitData.append('studentId', formData.studentId);
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    submitData.append('issueDate', formData.issueDate);
    
    if (formData.expiryDate) {
      submitData.append('expiryDate', formData.expiryDate);
    }
    
    if (formData.file) {
      submitData.append('certificateFile', formData.file);
    }

    try {
      console.log("🔄 Dispatching issueCertificate action...");
      const result = await dispatch(issueCertificate(submitData)).unwrap();
      console.log("✅ Certificate issuance result:", result);
      
      // ✅ Don't reset form immediately, let success message show
      // setFormData({
      //   studentId: '',
      //   title: '',
      //   description: '',
      //   issueDate: new Date().toISOString().split('T')[0],
      //   expiryDate: '',
      //   file: null
      // });
      
    } catch (error) {
      console.error('❌ Certificate issuance failed:', error);
      setLocalError(error || 'Failed to issue certificate. Please try again.');
      setHasSubmitted(false); // ✅ Reset on error
    }
  };

  const handleStudentSelect = (student, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log("👤 Selected student:", student);
    setFormData(prev => ({ ...prev, studentId: student._id }));
    setShowStudentList(false);
    setSearchTerm('');
    setErrors(prev => ({ ...prev, studentId: '' }));
  };

  const clearStudentSelection = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setFormData(prev => ({ ...prev, studentId: '' }));
  };

  // ✅ FIXED: Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      const studentSearchContainer = document.querySelector('.student-search-container');
      const studentListContainer = document.querySelector('.student-list-container');
      
      if (showStudentList && 
          studentSearchContainer && 
          studentListContainer &&
          !studentSearchContainer.contains(event.target) &&
          !studentListContainer.contains(event.target)) {
        setShowStudentList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showStudentList]);

  // ✅ Add manual cancel handler
  const handleCancel = (e) => {
    e.stopPropagation();
    dispatch(resetCertificateState()); // ✅ Clear any existing state
    navigate('/org/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Issue Certificate</h1>
        <p className="text-gray-600 mt-1">
          Create and issue a new certificate to your students
        </p>
      </div>

      {/* Success Message - Only show when manually submitted */}
      {isSuccess && hasSubmitted && message && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-medium text-green-800">Certificate issued successfully!</p>
            <p className="text-green-700 text-sm">Redirecting to dashboard...</p>
          </div>
        </div>
      )}

      {/* Error Messages */}
      {localError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div>
            <p className="font-medium text-red-800">Certificate issuance failed</p>
            <p className="text-red-700 text-sm">{localError}</p>
          </div>
        </div>
      )}

      {studentsError && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <div>
            <p className="font-medium text-yellow-800">Unable to load students</p>
            <p className="text-yellow-700 text-sm">{studentsError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Student Selection */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 student-search-container">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span>Select Student</span>
          </h2>

          {selectedStudent ? (
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {selectedStudent.name || 'Unknown Student'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedStudent.email || 'No email'}
                  </p>
                  {selectedStudent.educationLevel && (
                    <p className="text-sm text-gray-500">{selectedStudent.educationLevel}</p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={clearStudentSelection}
                className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-blue-600" />
              </button>
            </div>
          ) : (
            <div className="relative">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search students by name or email..."
                      value={searchTerm}
                      onChange={(e) => {
                        e.stopPropagation();
                        setSearchTerm(e.target.value);
                      }}
                      onFocus={(e) => {
                        e.stopPropagation();
                        setShowStudentList(true);
                      }}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={studentsLoading}
                    />
                    {studentsLoading && (
                      <Loader className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowStudentList(true);
                  }}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                  disabled={studentsLoading}
                >
                  {studentsLoading ? 'Loading...' : 'Browse All'}
                </button>
              </div>

              {errors.studentId && (
                <p className="text-red-600 text-sm mt-2">{errors.studentId}</p>
              )}

              {showStudentList && (
                <div className="student-list-container absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                  {studentsLoading ? (
                    <div className="p-4 text-center text-gray-500 flex items-center justify-center space-x-2">
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Loading students...</span>
                    </div>
                  ) : filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <button
                        key={student._id}
                        type="button"
                        onClick={(e) => handleStudentSelect(student, e)}
                        className="w-full text-left p-4 hover:bg-gray-50 border-b border-gray-200 last:border-b-0 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {student.name || 'Unknown Student'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {student.email || 'No email'}
                            </p>
                            {student.educationLevel && (
                              <p className="text-xs text-gray-500">{student.educationLevel}</p>
                            )}
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      {searchTerm ? 'No students found matching your search' : 'No students available'}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Rest of your form remains the same */}
        {/* Certificate Details */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Award className="w-5 h-5 text-green-600" />
            <span>Certificate Details</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certificate Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => {
                  e.stopPropagation();
                  setFormData(prev => ({ ...prev, title: e.target.value }));
                  setErrors(prev => ({ ...prev, title: '' }));
                }}
                placeholder="e.g., Web Development Course Completion"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                disabled={isLoading || isSuccess}
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-2">{errors.title}</p>
              )}
            </div>

            {/* ... rest of your form fields ... */}
          </div>
        </div>

        {/* File Upload */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Upload className="w-5 h-5 text-purple-600" />
            <span>Certificate File *</span>
          </h2>

          <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            errors.file ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          } ${(isLoading || isSuccess) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
            <input
              type="file"
              id="certificate-file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
              disabled={isLoading || isSuccess}
            />
            <label 
              htmlFor="certificate-file" 
              className={`cursor-pointer ${(isLoading || isSuccess) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">
                {formData.file ? formData.file.name : 'Click to upload certificate file'}
              </p>
              <p className="text-sm text-gray-500">
                Supports PDF, JPG, PNG (Max 10MB)
              </p>
            </label>
          </div>

          {errors.file && (
            <p className="text-red-600 text-sm mt-2">{errors.file}</p>
          )}

          {formData.file && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">{formData.file.name}</p>
                  <p className="text-sm text-gray-600">
                    {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFormData(prev => ({ ...prev, file: null }));
                  setErrors(prev => ({ ...prev, file: '' }));
                }}
                className="p-1 hover:bg-green-100 rounded transition-colors"
                disabled={isLoading || isSuccess}
              >
                <X className="w-4 h-4 text-green-600" />
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Issuing Certificate...</span>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Issued Successfully</span>
              </>
            ) : (
              <>
                <Award className="w-4 h-4" />
                <span>Issue Certificate</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}