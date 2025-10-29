import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  addStudentToOrg, 
  getOrgStudents,
  resetOrgState 
} from '../../../features/organization/organizationSlice';
import { toast } from 'react-toastify';

const AddStudent = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, message, isSuccess } = useSelector((state) => state.organization);
  
  const [formData, setFormData] = useState({
    studentEmail: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.studentEmail.trim()) {
      toast.error('Please enter student email');
      return;
    }

    try {
      const result = await dispatch(addStudentToOrg(formData.studentEmail)).unwrap();
      
      if (result) {
        toast.success(result.message || 'Student added successfully!');
        setShowSuccess(true);
        setFormData({ studentEmail: '' });
        
        // Refresh students list
        dispatch(getOrgStudents());
        
        // Reset success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
          dispatch(resetOrgState());
        }, 3000);
      }
    } catch (error) {
      toast.error(error || 'Failed to add student');
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({ studentEmail: '' });
    dispatch(resetOrgState());
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add Student to Organization
          </h1>
          <p className="text-gray-600">
            Add existing students to your organization by entering their email address
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    {message || 'Student added successfully!'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {isError && !showSuccess && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">
                    {message || 'Failed to add student'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Add Student Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Student Email Address
              </label>
              <input
                type="email"
                name="studentEmail"
                id="studentEmail"
                value={formData.studentEmail}
                onChange={handleChange}
                placeholder="Enter student's registered email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                Make sure the student is already registered in the system
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Student...
                  </div>
                ) : (
                  'Add Student to Organization'
                )}
              </button>
              
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-3 px-6 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>

        {/* Instructions Section */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            How to Add Students
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Step 1: Student Registration</h4>
              <p className="text-blue-700 text-sm">
                Students must first register on the platform using the student registration form.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Step 2: Add to Organization</h4>
              <p className="text-blue-700 text-sm">
                Enter the student's registered email address above to add them to your organization.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Important Notes
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Student must be registered in the system first</li>
                  <li>Use the exact email address used during registration</li>
                  <li>Student will appear in your organization dashboard immediately</li>
                  <li>You can issue certificates to added students</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;