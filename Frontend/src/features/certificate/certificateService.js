import axiosInstance from "../../utils/axiosInstance";

const certificateService = {
  // Issue certificate (organization)
  issueCertificate: async (userId, data) =>
    axiosInstance.post(`/certificates/issue/${userId}`, data),

  // Get certificate by ID
  getCertificate: async (id) => axiosInstance.get(`/certificates/${id}`),

  // List all issued certificates (organization)
  listIssuedCertificates: async () => axiosInstance.get("/certificates/issued"),

  // List all certificates of the logged-in user
  listUserCertificates: async () => axiosInstance.get("/certificates/my"),

  // Verify certificate (public)
  verifyCertificate: async (id) => axiosInstance.get(`/certificates/verify/${id}`),

  // Delete certificate (admin only)
  deleteCertificate: async (id) => axiosInstance.delete(`/certificates/${id}`),
};

export default certificateService;

/* Additional functionalities to be implemented in the future:

-> update certificate details       
-> list certificates by organization
-> list certificates by user
-> get certificates by organization
-> get certificates by user
-> delete certificate by organization
-> delete certificate by user
-> get certificate by name  
-> get certificate by issue date
-> get certificate by expiry date
-> get certificate by status
-> get certificate by type
-> get certificate by issuer
-> get certificate by recipient
-> get certificate by metadata
*/