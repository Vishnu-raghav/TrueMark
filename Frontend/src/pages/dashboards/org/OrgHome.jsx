import React, { useEffect, useState, useCallback } from 'react';
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
  Search,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { getOrgStudents, getStudentsCount } from '../../../features/organization/organizationSlice';
import { listIssuedCertificates } from '../../../features/certificate/certificateSlice';

export default function OrgHome() {
  const dispatch = useDispatch();
  const { 
    organization, 
    students, 
    studentsCount, 
    studentsLoading, 
    studentsError,
    message 
  } = useSelector(state => state.organization);
  
  const { 
    certificates, 
    isLoading: certsLoading, 
    isError: certsError,
    message: certsMessage 
  } = useSelector(state => state.certificate);
  
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCertificates: 0,
    pendingApprovals: 0,
    thisMonthIssued: 0
  });

  const [loading, setLoading] = useState(true);

  // ✅ useCallback se functions banayein taki unnecessary re-renders na ho
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      console.log("🔄 Dispatching API calls from OrgHome...");
      await Promise.all([
        dispatch(getOrgStudents()),
        dispatch(getStudentsCount()),
        dispatch(listIssuedCertificates())
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]); // ✅ dispatch ko dependency mein add kiya

  useEffect(() => {
    fetchData();
  }, [fetchData]); // ✅ Ab sirf fetchData change hone par hi useEffect run hoga

  // ✅ Stats calculation ko alag useEffect mein rakhein
  useEffect(() => {
    console.log("📊 Updating stats...");
    
    if (students && certificates) {
      const newStats = {
        totalStudents: studentsCount > 0 ? studentsCount : students.length,
        totalCertificates: certificates.length,
        pendingApprovals: students.filter(s => s.status === 'pending').length,
        thisMonthIssued: certificates.filter(cert => {
          if (!cert.issueDate) return false;
          const certDate = new Date(cert.issueDate);
          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();
          return certDate.getMonth() === currentMonth && certDate.getFullYear() === currentYear;
        }).length
      };
      
      setStats(newStats);
    }
  }, [students, certificates, studentsCount]); // ✅ Specific dependencies

  // ✅ useCallback se event handlers banayein
  const handleRetry = useCallback(() => {
    console.log("🔄 Retrying API calls...");
    fetchData();
  }, [fetchData]);

  const recentCertificates = certificates?.slice(0, 5) || [];
  const recentStudents = students?.slice(0, 5) || [];

  // ✅ Component functions ko useCallback mein wrap karein
  const StatCard = useCallback(({ title, value, icon: Icon, change, color, loading }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-20 mt-2"></div>
              <div className="h-4 bg-gray-200 rounded w-24 mt-2"></div>
            </div>
          ) : (
            <>
              <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
              {change && (
                <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'} mt-1`}>
                  {change > 0 ? '+' : ''}{change}% from last month
                </p>
              )}
            </>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color} ${loading ? 'opacity-50' : ''}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  ), []);

  const QuickAction = useCallback(({ title, description, icon: Icon, color, onClick }) => (
    <button 
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 text-left group w-full"
    >
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
  ), []);

  // ✅ Loading state
  if (loading && (!students || students.length === 0)) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-40 animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-pulse">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {organization?.name || 'Admin'}! Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {(studentsError || certsError) && (
            <button
              onClick={handleRetry}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry</span>
            </button>
          )}
          <Link
            to="/org/issue"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Issue Certificate</span>
          </Link>
        </div>
      </div>

      {/* Error Messages */}
      {studentsError && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <div className="flex-1">
            <p className="font-medium text-yellow-800">Unable to load students data</p>
            <p className="text-yellow-700 text-sm">{studentsError}</p>
          </div>
        </div>
      )}

      {certsError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div className="flex-1">
            <p className="font-medium text-red-800">Unable to load certificates</p>
            <p className="text-red-700 text-sm">{certsMessage || certsError}</p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          change={students.length > 0 ? 12 : 0}
          color="bg-blue-500"
          loading={studentsLoading}
        />
        <StatCard
          title="Certificates Issued"
          value={stats.totalCertificates}
          icon={Award}
          change={certificates.length > 0 ? 8 : 0}
          color="bg-green-500"
          loading={certsLoading}
        />
        <StatCard
          title="Pending Approvals"
          value={stats.pendingApprovals}
          icon={Clock}
          change={-3}
          color="bg-yellow-500"
          loading={studentsLoading}
        />
        <StatCard
          title="This Month"
          value={stats.thisMonthIssued}
          icon={TrendingUp}
          change={15}
          color="bg-purple-500"
          loading={certsLoading}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/org/issue">
          <QuickAction
            title="Issue Certificate"
            description="Create and issue new certificates"
            icon={Award}
            color="bg-blue-500"
          />
        </Link>
        <Link to="/org/students">
          <QuickAction
            title="Manage Students"
            description="View and manage student accounts"
            icon={Users}
            color="bg-green-500"
          />
        </Link>
        <QuickAction
          title="View Reports"
          description="Analytics and certificate reports"
          icon={FileText}
          color="bg-purple-500"
          onClick={() => console.log("Reports clicked")}
        />
        <QuickAction
          title="Templates"
          description="Manage certificate templates"
          icon={Download}
          color="bg-orange-500"
          onClick={() => console.log("Templates clicked")}
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
            {certsLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 animate-pulse">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentCertificates.length > 0 ? (
              <div className="space-y-4">
                {recentCertificates.map((cert) => (
                  <div key={cert._id || cert.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Award className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{cert.title || 'Untitled Certificate'}</p>
                        <p className="text-sm text-gray-500">
                          {cert.recipient?.name || 'Unknown'} • {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : 'No date'}
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
            {studentsLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 animate-pulse">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentStudents.length > 0 ? (
              <div className="space-y-4">
                {recentStudents.map((student) => (
                  <div key={student._id || student.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name || 'Unknown Student'}</p>
                        <p className="text-sm text-gray-500">{student.email || 'No email'}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      (student.status === 'active' || !student.status) 
                        ? 'bg-green-100 text-green-800'
                        : student.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
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
                  Students will appear here when they register with your organization
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}