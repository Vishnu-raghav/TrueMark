import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  Calendar,
  MoreVertical,
  UserCheck,
  UserX
} from 'lucide-react';
import { getOrgStudents, searchStudents } from '../../../features/organization/organizationSlice';

export default function OrgStudents() {
  const dispatch = useDispatch();
  const { students, studentsLoading } = useSelector(state => state.organization);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    dispatch(getOrgStudents());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm) {
      const timeoutId = setTimeout(() => {
        dispatch(searchStudents(searchTerm));
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      dispatch(getOrgStudents());
    }
  }, [searchTerm, dispatch]);

  const filteredStudents = students?.filter(student => {
    const matchesSearch = student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  }) || [];

  const StudentCard = ({ student }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {student.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h3 className="font-semibold text-gray-900">{student.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                student.status === 'active' 
                  ? 'bg-green-100 text-green-800'
                  : student.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {student.status || 'active'}
              </span>
            </div>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{student.email}</span>
              </div>
              {student.phone && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{student.phone}</span>
                </div>
              )}
              {student.dateOfBirth && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(student.dateOfBirth).toLocaleDateString()}</span>
                </div>
              )}
              {student.educationLevel && (
                <div className="text-sm text-gray-600">
                  Education: {student.educationLevel}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Joined {new Date(student.createdAt).toLocaleDateString()}
        </div>
        <div className="flex items-center space-x-2">
          {student.status === 'pending' && (
            <>
              <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center space-x-1">
                <UserCheck className="w-4 h-4" />
                <span>Approve</span>
              </button>
              <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors flex items-center space-x-1">
                <UserX className="w-4 h-4" />
                <span>Reject</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600 mt-1">
            Manage and view all students registered with your organization
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{students?.length || 0}</div>
          <div className="text-sm text-gray-600">Total Students</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
            </div>
            
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Students</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">
              {filteredStudents.length} students found
            </span>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {studentsLoading ? (
          // Loading Skeleton
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))
        ) : filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <StudentCard key={student._id} student={student} />
          ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Students will appear here when they register with your organization email domain'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}