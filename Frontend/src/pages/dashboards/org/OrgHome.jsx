import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Award, 
  FileText, 
  TrendingUp, 
  Clock,
  Download,
  Eye,
  Plus,
  Search
} from 'lucide-react';
import { getOrgStudents, getStudentsCount } from '../../../features/organization/organizationSlice';
import { listIssuedCertificates } from '../../../features/certificate/certificateSlice';

export default function OrgHome() {
  const dispatch = useDispatch();
  const { organization, students, studentsCount, studentsLoading } = useSelector(state => state.organization);
  const { certificates, isLoading: certsLoading } = useSelector(state => state.certificate);
  
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCertificates: 0,
    pendingApprovals: 0,
    thisMonthIssued: 0
  });

  useEffect(() => {
    dispatch(getOrgStudents());
    dispatch(getStudentsCount());
    dispatch(listIssuedCertificates());
  }, [dispatch]);

  useEffect(() => {
    if (students && certificates) {
      setStats({
        totalStudents: studentsCount || students.length,
        totalCertificates: certificates.length,
        pendingApprovals: students.filter(s => s.status === 'pending').length,
        thisMonthIssued: certificates.filter(cert => {
          const certDate = new Date(cert.issueDate);
          const currentMonth = new Date().getMonth();
          return certDate.getMonth() === currentMonth;
        }).length
      });
    }
  }, [students, certificates, studentsCount]);

  const recentCertificates = certificates?.slice(0, 5) || [];
  const recentStudents = students?.slice(0, 5) || [];

  const StatCard = ({ title, value, icon: Icon, change, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'} mt-1`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const QuickAction = ({ title, description, icon: Icon, action, color }) => (
    <button className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 text-left group">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {organization?.name}! Here's what's happening today.
          </p>
        </div>
        <Link
          to="/org/issue"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Issue Certificate</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          change={12}
          color="bg-blue-500"
        />
        <StatCard
          title="Certificates Issued"
          value={stats.totalCertificates}
          icon={Award}
          change={8}
          color="bg-green-500"
        />
        <StatCard
          title="Pending Approvals"
          value={stats.pendingApprovals}
          icon={Clock}
          change={-3}
          color="bg-yellow-500"
        />
        <StatCard
          title="This Month"
          value={stats.thisMonthIssued}
          icon={TrendingUp}
          change={15}
          color="bg-purple-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickAction
          title="Issue Certificate"
          description="Create and issue new certificates"
          icon={Award}
          color="bg-blue-500"
        />
        <QuickAction
          title="Manage Students"
          description="View and manage student accounts"
          icon={Users}
          color="bg-green-500"
        />
        <QuickAction
          title="View Reports"
          description="Analytics and certificate reports"
          icon={FileText}
          color="bg-purple-500"
        />
        <QuickAction
          title="Templates"
          description="Manage certificate templates"
          icon={Download}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Certificates */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Certificates</h2>
              <Link 
                to="/org/certificates" 
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="p-6">
            {recentCertificates.length > 0 ? (
              <div className="space-y-4">
                {recentCertificates.map((cert) => (
                  <div key={cert._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Award className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{cert.title}</p>
                        <p className="text-sm text-gray-500">
                          {cert.recipient?.name || 'Unknown'} • {new Date(cert.issueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No certificates issued yet</p>
                <Link
                  to="/org/issue"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block"
                >
                  Issue your first certificate
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Students */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Students</h2>
              <Link 
                to="/org/students" 
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="p-6">
            {recentStudents.length > 0 ? (
              <div className="space-y-4">
                {recentStudents.map((student) => (
                  <div key={student._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {student.status || 'active'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No students registered yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Students will appear here when they register with your domain
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}