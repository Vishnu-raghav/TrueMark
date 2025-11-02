// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { listUserCertificates } from '../../../features/certificate/certificateSlice.js';

// export default function MemberHome() {
//   const { user } = useSelector((state) => state.auth);
//   const { certificates, isLoading } = useSelector((state) => state.certificate);
//   const dispatch = useDispatch();
  
//   const [stats, setStats] = useState({
//     totalCertificates: 0,
//     verifiedCertificates: 0,
//     pendingVerification: 0,
//     achievements: 0
//   });

//   // Get certificate badge based on type - ✅ YE FUNCTION UPAR RAKHO
//   const getCertificateBadge = (type) => {
//     const badges = {
//       'course': '🎓',
//       'workshop': '⚡',
//       'training': '📚',
//       'achievement': '⭐',
//       'participation': '🏅',
//       'completion': '✅'
//     };
//     return badges[type] || '📜';
//   };

//   // Helper function for time ago - ✅ YE BHI UPAR RAKHO
//   const getTimeAgo = (dateString) => {
//     if (!dateString) return 'Recently';
    
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffMs = now - date;
//     const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
//     const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//     const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
//     if (diffMinutes < 1) return 'Just now';
//     if (diffMinutes < 60) return `${diffMinutes}m ago`;
//     if (diffHours < 24) return `${diffHours}h ago`;
//     if (diffDays < 7) return `${diffDays}d ago`;
//     return date.toLocaleDateString();
//   };

//   // Calculate achievements based on certificates
//   const calculateAchievements = (certs) => {
//     if (!certs || !Array.isArray(certs)) return 0;
    
//     let achievementCount = 0;
    
//     // Achievement 1: First certificate
//     if (certs.length >= 1) achievementCount++;
    
//     // Achievement 2: 5+ certificates
//     if (certs.length >= 5) achievementCount++;
    
//     // Achievement 3: All certificates verified
//     const allVerified = certs.length > 0 && certs.every(cert => 
//       cert.status === 'verified' || cert.status === 'active'
//     );
//     if (allVerified) achievementCount++;
    
//     // Achievement 4: Certificate from different organizations
//     const uniqueOrgs = new Set(certs.map(cert => cert.organization?.name).filter(Boolean));
//     if (uniqueOrgs.size >= 3) achievementCount++;
    
//     return achievementCount;
//   };

//   // Real certificates data fetch
//   useEffect(() => {
//     dispatch(listUserCertificates());
//   }, [dispatch]);

//   // Calculate stats from real data
//   useEffect(() => {
//     if (certificates && Array.isArray(certificates)) {
//       const total = certificates.length;
//       const verified = certificates.filter(cert => 
//         cert.status === 'verified' || cert.status === 'active'
//       ).length;
//       const pending = certificates.filter(cert => 
//         cert.status === 'pending' || cert.status === 'issued'
//       ).length;
      
//       // Achievements logic - you can customize this
//       const achievements = calculateAchievements(certificates);

//       setStats({
//         totalCertificates: total,
//         verifiedCertificates: verified,
//         pendingVerification: pending,
//         achievements: achievements
//       });
//     }
//   }, [certificates]);

//   // Stats for display
//   const displayStats = [
//     { 
//       label: 'Total Certificates', 
//       value: stats.totalCertificates.toString(), 
//       change: '+0', 
//       trend: 'up', 
//       icon: '📜' 
//     },
//     { 
//       label: 'Verified Certificates', 
//       value: stats.verifiedCertificates.toString(), 
//       change: '+0', 
//       trend: 'up', 
//       icon: '✅' 
//     },
//     { 
//       label: 'Pending Verification', 
//       value: stats.pendingVerification.toString(), 
//       change: '0', 
//       trend: 'neutral', 
//       icon: '⏳' 
//     },
//     { 
//       label: 'Achievements', 
//       value: stats.achievements.toString(), 
//       change: '+0', 
//       trend: 'up', 
//       icon: '🏆' 
//     }
//   ];

//   // Get recent certificates (last 5)
//   const recentCertificates = certificates && Array.isArray(certificates) 
//     ? certificates
//         .slice(0, 5)
//         .map(cert => ({
//           id: cert._id,
//           name: cert.certificateName || cert.title || 'Unnamed Certificate',
//           issuer: cert.organization?.name || 'Unknown Issuer',
//           date: new Date(cert.issueDate || cert.createdAt).toLocaleDateString(),
//           status: cert.status || 'pending',
//           badge: getCertificateBadge(cert.certificateType), // ✅ AB YE WORK KAREGA
//           certificate: cert // Keep original for details
//         }))
//     : [];

//   // Recent activity from certificates
//   const recentActivity = certificates && Array.isArray(certificates) 
//     ? certificates
//         .slice(0, 4)
//         .map(cert => {
//           let action, details, type;
          
//           if (cert.status === 'verified' || cert.status === 'active') {
//             action = 'Certificate Verified';
//             details = cert.certificateName || 'Certificate';
//             type = 'success';
//           } else if (cert.status === 'issued') {
//             action = 'Certificate Issued';
//             details = cert.certificateName || 'Certificate';
//             type = 'success';
//           } else {
//             action = 'Certificate Pending';
//             details = cert.certificateName || 'Certificate';
//             type = 'warning';
//           }
          
//           return {
//             action,
//             details,
//             time: getTimeAgo(cert.createdAt || cert.issueDate), // ✅ AB YE BHI WORK KAREGA
//             type
//           };
//         })
//     : [];

//   const quickActions = [
//     { title: 'Verify Certificate', description: 'Verify a certificate using ID', icon: '🔍', link: '/verify', color: 'bg-blue-500' },
//     { title: 'View All Certificates', description: 'Browse your certificate collection', icon: '📚', link: '/my-certificates', color: 'bg-green-500' },
//     { title: 'Update Profile', description: 'Keep your profile updated', icon: '👤', link: '/profile', color: 'bg-purple-500' },
//     { title: 'Get Support', description: 'Need help? Contact support', icon: '💬', link: '/help', color: 'bg-orange-500' }
//   ];

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading your dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Welcome Section */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">
//           Welcome back, {user?.name || 'Member'}! 👋
//         </h1>
//         <p className="text-gray-600 mt-2">
//           {certificates && certificates.length > 0 
//             ? `You have ${certificates.length} certificates in your collection.`
//             : "Start building your certificate collection today!"
//           }
//         </p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {displayStats.map((stat, index) => (
//           <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">{stat.label}</p>
//                 <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
//                 <div className={`flex items-center mt-1 ${
//                   stat.trend === 'up' ? 'text-green-600' : 
//                   stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
//                 }`}>
//                   <span className="text-sm font-medium">{stat.change}</span>
//                   <span className="text-xs ml-1">from last month</span>
//                 </div>
//               </div>
//               <div className="text-3xl">{stat.icon}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Quick Actions */}
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
//               <span className="text-sm text-gray-500">Frequently used</span>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {quickActions.map((action, index) => (
//                 <a
//                   key={index}
//                   href={action.link}
//                   className="group p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform`}>
//                       {action.icon}
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
//                         {action.title}
//                       </h3>
//                       <p className="text-sm text-gray-600 mt-1">{action.description}</p>
//                     </div>
//                   </div>
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//             <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
//             <div className="space-y-4">
//               {recentActivity.length > 0 ? (
//                 recentActivity.map((activity, index) => (
//                   <div key={index} className="flex items-start space-x-3">
//                     <div className={`w-2 h-2 mt-2 rounded-full ${
//                       activity.type === 'success' ? 'bg-green-500' :
//                       activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
//                     }`}></div>
//                     <div className="flex-1">
//                       <p className="font-medium text-gray-900">{activity.action}</p>
//                       <p className="text-sm text-gray-600">{activity.details}</p>
//                       <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-4">
//                   <p className="text-gray-500">No recent activity</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Certificates */}
//       <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-bold text-gray-900">
//             Recent Certificates {recentCertificates.length > 0 && `(${recentCertificates.length})`}
//           </h2>
//           <a href="/my-certificates" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
//             View All →
//           </a>
//         </div>
        
//         {recentCertificates.length > 0 ? (
//           <div className="overflow-hidden">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Certificate</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Issuer</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {recentCertificates.map((cert) => (
//                   <tr key={cert.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="py-4 px-4">
//                       <div className="flex items-center space-x-3">
//                         <span className="text-2xl">{cert.badge}</span>
//                         <span className="font-medium text-gray-900">{cert.name}</span>
//                       </div>
//                     </td>
//                     <td className="py-4 px-4 text-gray-600">{cert.issuer}</td>
//                     <td className="py-4 px-4 text-gray-600">{cert.date}</td>
//                     <td className="py-4 px-4">
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//                         cert.status === 'verified' || cert.status === 'active'
//                           ? 'bg-green-100 text-green-800'
//                           : 'bg-yellow-100 text-yellow-800'
//                       }`}>
//                         {cert.status === 'verified' || cert.status === 'active' ? '✅ Verified' : '⏳ Pending'}
//                       </span>
//                     </td>
//                     <td className="py-4 px-4">
//                       <button 
//                         onClick={() => {
//                           // You can implement certificate details view here
//                           console.log('View certificate:', cert);
//                         }}
//                         className="text-blue-600 hover:text-blue-700 font-medium text-sm"
//                       >
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="text-center py-8">
//             <div className="text-6xl mb-4">📜</div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates yet</h3>
//             <p className="text-gray-500 mb-4">Your certificates will appear here once issued.</p>
//             <a 
//               href="/verify" 
//               className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Verify Your First Certificate
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }













import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { listUserCertificates } from '../../../features/certificate/certificateSlice.js';

export default function MemberHome() {
  const { user } = useSelector((state) => state.auth);
  const { certificates, isLoading } = useSelector((state) => state.certificate);
  const dispatch = useDispatch();
  
  const [stats, setStats] = useState({
    totalCertificates: 0,
    verifiedCertificates: 0,
    pendingVerification: 0,
    achievements: 0
  });

  // Debug: Check certificate data structure
  useEffect(() => {
    if (certificates && certificates.length > 0) {
      console.log('📋 All Certificates Data:', certificates);
      console.log('🏢 First Certificate:', certificates[0]);
      console.log('🔍 Organization Data:', certificates[0]?.issuedBy);
    }
  }, [certificates]);

  // Get certificate badge based on type
  const getCertificateBadge = (type) => {
    const badges = {
      'course': '🎓',
      'workshop': '⚡',
      'training': '📚',
      'achievement': '⭐',
      'participation': '🏅',
      'completion': '✅'
    };
    return badges[type] || '📜';
  };

  // Helper function for time ago
  const getTimeAgo = (dateString) => {
    if (!dateString) return 'Recently';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  // Calculate achievements based on certificates
  const calculateAchievements = (certs) => {
    if (!certs || !Array.isArray(certs)) return 0;
    
    let achievementCount = 0;
    
    // Achievement 1: First certificate
    if (certs.length >= 1) achievementCount++;
    
    // Achievement 2: 5+ certificates
    if (certs.length >= 5) achievementCount++;
    
    // Achievement 3: All certificates verified
    const allVerified = certs.length > 0 && certs.every(cert => 
      cert.status === 'verified' || cert.status === 'active'
    );
    if (allVerified) achievementCount++;
    
    // Achievement 4: Certificate from different organizations
    const uniqueOrgs = new Set(certs.map(cert => {
      return cert.issuedBy?.name || 'Unknown Organization';
    }).filter(Boolean));
    
    if (uniqueOrgs.size >= 3) achievementCount++;
    
    return achievementCount;
  };

  // Real certificates data fetch
  useEffect(() => {
    dispatch(listUserCertificates());
  }, [dispatch]);

  // Calculate stats from real data
  useEffect(() => {
    if (certificates && Array.isArray(certificates)) {
      const total = certificates.length;
      const verified = certificates.filter(cert => 
        cert.status === 'verified' || cert.status === 'active'
      ).length;
      const pending = certificates.filter(cert => 
        cert.status === 'pending' || cert.status === 'issued'
      ).length;
      
      // Achievements logic - you can customize this
      const achievements = calculateAchievements(certificates);

      setStats({
        totalCertificates: total,
        verifiedCertificates: verified,
        pendingVerification: pending,
        achievements: achievements
      });
    }
  }, [certificates]);

  // Stats for display
  const displayStats = [
    { 
      label: 'Total Certificates', 
      value: stats.totalCertificates.toString(), 
      change: '+0', 
      trend: 'up', 
      icon: '📜' 
    },
    { 
      label: 'Verified Certificates', 
      value: stats.verifiedCertificates.toString(), 
      change: '+0', 
      trend: 'up', 
      icon: '✅' 
    },
    { 
      label: 'Pending Verification', 
      value: stats.pendingVerification.toString(), 
      change: '0', 
      trend: 'neutral', 
      icon: '⏳' 
    },
    { 
      label: 'Achievements', 
      value: stats.achievements.toString(), 
      change: '+0', 
      trend: 'up', 
      icon: '🏆' 
    }
  ];

  // Get organization name from certificate - ✅ CORRECTED: Use issuedBy instead of organization
  const getOrganizationName = (cert) => {
    // ✅ CORRECT: Use issuedBy which contains the organization data
    if (cert.issuedBy?.name) return cert.issuedBy.name;
    if (cert.issuedBy) return cert.issuedBy.toString(); // Fallback if it's just an ID
    
    // If no organization found, show certificate title as fallback
    return cert.title || 'Certificate';
  };

  // Get recent certificates (last 5) - ✅ CORRECTED: Use issuedBy
  const recentCertificates = certificates && Array.isArray(certificates) 
    ? certificates
        .slice(0, 5)
        .map(cert => {
          const orgName = getOrganizationName(cert);
          
          return {
            id: cert._id,
            name: orgName, // ✅ Organization name from issuedBy
            issuer: orgName, // ✅ Same organization as issuer
            date: new Date(cert.issueDate || cert.createdAt).toLocaleDateString(),
            status: cert.status || 'pending',
            badge: getCertificateBadge(cert.certificateType),
            certificate: cert // Keep original for details
          };
        })
    : [];

  // Recent activity from certificates - ✅ CORRECTED: Use issuedBy
  const recentActivity = certificates && Array.isArray(certificates) 
    ? certificates
        .slice(0, 4)
        .map(cert => {
          let action, details, type;
          const orgName = getOrganizationName(cert);
          
          if (cert.status === 'verified' || cert.status === 'active') {
            action = 'Certificate Verified';
            details = `${orgName}`;
            type = 'success';
          } else if (cert.status === 'issued') {
            action = 'Certificate Issued';
            details = `${orgName}`;
            type = 'success';
          } else {
            action = 'Certificate Pending';
            details = `${orgName}`;
            type = 'warning';
          }
          
          return {
            action,
            details,
            time: getTimeAgo(cert.createdAt || cert.issueDate),
            type
          };
        })
    : [];

  const quickActions = [
    { title: 'Verify Certificate', description: 'Verify a certificate using ID', icon: '🔍', link: '/verify', color: 'bg-blue-500' },
    { title: 'View All Certificates', description: 'Browse your certificate collection', icon: '📚', link: '/my-certificates', color: 'bg-green-500' },
    { title: 'Update Profile', description: 'Keep your profile updated', icon: '👤', link: '/profile', color: 'bg-purple-500' },
    { title: 'Get Support', description: 'Need help? Contact support', icon: '💬', link: '/help', color: 'bg-orange-500' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name || 'Member'}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          {certificates && certificates.length > 0 
            ? `You have ${certificates.length} certificates in your collection.`
            : "Start building your certificate collection today!"
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {displayStats.map((stat, index) => (
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
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
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
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Certificates */}
      <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Recent Certificates {recentCertificates.length > 0 && `(${recentCertificates.length})`}
          </h2>
          <a href="/my-certificates" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View All →
          </a>
        </div>
        
        {recentCertificates.length > 0 ? (
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Organization</th>
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
                        <div>
                          <span className="font-medium text-gray-900 block">{cert.name}</span>
                          <span className="text-xs text-gray-500">
                            {cert.certificate?.title || 'Certificate'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{cert.issuer}</td>
                    <td className="py-4 px-4 text-gray-600">{cert.date}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        cert.status === 'verified' || cert.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {cert.status === 'verified' || cert.status === 'active' ? '✅ Verified' : '⏳ Pending'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button 
                        onClick={() => {
                          console.log('View certificate:', cert);
                        }}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📜</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates yet</h3>
            <p className="text-gray-500 mb-4">Your certificates will appear here once issued.</p>
            <a 
              href="/verify" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Verify Your First Certificate
            </a>
          </div>
        )}
      </div>
    </div>
  );
}