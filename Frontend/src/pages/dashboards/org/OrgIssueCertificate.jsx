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
  CheckCircle
} from 'lucide-react';
import { getOrgStudents } from '../../../features/organization/organizationSlice';
import { issueCertificate } from '../../../features/certificate/certificateSlice';

export default function OrgIssueCertificate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, studentsLoading } = useSelector(state => state.organization);
  const { isLoading, isSuccess, message } = useSelector(state => state.certificate);
  
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

  useEffect(() => {
    dispatch(getOrgStudents());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      // Show success message and redirect after 2 seconds
      setTimeout(() => {
        navigate('/org/certificates');
      }, 2000);
    }
  }, [isSuccess, navigate]);

  const filteredStudents = students?.filter(student => 
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const selectedStudent = students?.find(s => s._id === formData.studentId);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.studentId) newErrors.studentId = 'Please select a student';
    if (!formData.title.trim()) newErrors.title = 'Certificate title is required';
    if (!formData.file) newErrors.file = 'Certificate file is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, file: 'Please upload PDF, JPG, or PNG files only' }));
        return;
      }
      
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, file: 'File size must be less than 10MB' }));
        return;
      }
      
      setFormData(prev => ({ ...prev, file }));
      setErrors(prev => ({ ...prev, file: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    if (formData.expiryDate) {
      submitData.append('expiryDate', formData.expiryDate);
    }
    submitData.append('file', formData.file);

    try {
      await dispatch(issueCertificate({ 
        userId: formData.studentId, 
        data: submitData 
      })).unwrap();
    } catch (error) {
      console.error('Certificate issuance failed:', error);
    }
  };

  const handleStudentSelect = (student) => {
    setFormData(prev => ({ ...prev, studentId: student._id }));
    setShowStudentList(false);
    setSearchTerm('');
    setErrors(prev => ({ ...prev, studentId: '' }));
  };

  const clearStudentSelection = () => {
    setFormData(prev => ({ ...prev, studentId: '' }));
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

      {/* Success Message */}
      {isSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-medium text-green-800">Certificate issued successfully!</p>
            <p className="text-green-700 text-sm">Redirecting to certificates page...</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {message && !isSuccess && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-800 text-sm">{message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Student Selection */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
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
                  <p className="font-medium text-gray-900">{selectedStudent.name}</p>
                  <p className="text-sm text-gray-600">{selectedStudent.email}</p>
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
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => setShowStudentList(true)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowStudentList(true)}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Browse All
                </button>
              </div>

              {errors.studentId && (
                <p className="text-red-600 text-sm mt-2">{errors.studentId}</p>
              )}

              {showStudentList && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {studentsLoading ? (
                    <div className="p-4 text-center text-gray-500">
                      Loading students...
                    </div>
                  ) : filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <button
                        key={student._id}
                        type="button"
                        onClick={() => handleStudentSelect(student)}
                        className="w-full text-left p-4 hover:bg-gray-50 border-b border-gray-200 last:border-b-0 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.email}</p>
                            {student.educationLevel && (
                              <p className="text-xs text-gray-500">{student.educationLevel}</p>
                            )}
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No students found matching your search
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

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
                  setFormData(prev => ({ ...prev, title: e.target.value }));
                  setErrors(prev => ({ ...prev, title: '' }));
                }}
                placeholder="e.g., Web Development Course Completion"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-2">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the certificate..."
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.issueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, issueDate: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
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
          }`}>
            <input
              type="file"
              id="certificate-file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="certificate-file" className="cursor-pointer">
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
                onClick={() => {
                  setFormData(prev => ({ ...prev, file: null }));
                  setErrors(prev => ({ ...prev, file: '' }));
                }}
                className="p-1 hover:bg-green-100 rounded transition-colors"
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
            onClick={() => navigate('/org/certificates')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Issuing...</span>
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