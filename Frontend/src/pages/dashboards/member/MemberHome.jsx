import React from 'react';
import { useSelector } from 'react-redux';

export default function MemberHome() {
  const { user } = useSelector((state) => state.auth);
  
  const stats = [
    { label: 'Total Certificates', value: '12', change: '+2', trend: 'up', icon: '📜' },
    { label: 'Verified Certificates', value: '10', change: '+1', trend: 'up', icon: '✅' },
    { label: 'Pending Verification', value: '2', change: '0', trend: 'neutral', icon: '⏳' },
    { label: 'Achievements', value: '5', change: '+1', trend: 'up', icon: '🏆' }
  ];

  const recentCertificates = [
    { id: 1, name: 'React Developer Certificate', issuer: 'Tech Corp', date: '2024-01-15', status: 'verified', badge: '🎓' },
    { id: 2, name: 'JavaScript Advanced', issuer: 'Code Academy', date: '2024-01-10', status: 'verified', badge: '⭐' },
    { id: 3, name: 'Cloud Fundamentals', issuer: 'Cloud Institute', date: '2024-01-05', status: 'pending', badge: '☁️' }
  ];

  const quickActions = [
    { title: 'Verify Certificate', description: 'Verify a certificate using ID', icon: '🔍', link: '/verify', color: 'bg-blue-500' },
    { title: 'View All Certificates', description: 'Browse your certificate collection', icon: '📚', link: '/my-certificates', color: 'bg-green-500' },
    { title: 'Update Profile', description: 'Keep your profile updated', icon: '👤', link: '/profile', color: 'bg-purple-500' },
    { title: 'Get Support', description: 'Need help? Contact support', icon: '💬', link: '/help', color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name || 'Member'}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your certificates today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className={`flex items-center mt-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  <span className="text-sm font-medium">{stat.change}</span>
                  <span className="text-xs ml-1">from last month</span>
                </div>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              <span className="text-sm text-gray-500">Frequently used</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <a
                  key={index}
                  href={action.link}
                  className="group p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: 'Certificate Verified', details: 'React Developer', time: '2 hours ago', type: 'success' },
                { action: 'Profile Updated', details: 'Added new skills', time: '1 day ago', type: 'info' },
                { action: 'Certificate Issued', details: 'Cloud Fundamentals', time: '2 days ago', type: 'success' },
                { action: 'Login', details: 'From new device', time: '3 days ago', type: 'warning' }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 mt-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Certificates */}
      <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Certificates</h2>
          <a href="/my-certificates" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View All →
          </a>
        </div>
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Certificate</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Issuer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentCertificates.map((cert) => (
                <tr key={cert.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{cert.badge}</span>
                      <span className="font-medium text-gray-900">{cert.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{cert.issuer}</td>
                  <td className="py-4 px-4 text-gray-600">{cert.date}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      cert.status === 'verified' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {cert.status === 'verified' ? '✅ Verified' : '⏳ Pending'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}