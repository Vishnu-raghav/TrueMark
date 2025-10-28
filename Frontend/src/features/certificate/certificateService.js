import axiosInstance from "../../utils/axiosInstance";

const certificateService = {
  // ✅ FIX: Remove userId parameter - backend mein route different hai
  issueCertificate: async (data) =>
    axiosInstance.post(`/certificates/issue`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),

  getCertificate: async (id) => axiosInstance.get(`/certificates/${id}`),

  listIssuedCertificates: async () => axiosInstance.get("/certificates/issued"),

  listUserCertificates: async () => axiosInstance.get("/certificates/my"),

  verifyCertificate: async (id) => axiosInstance.get(`/certificates/verify/${id}`),

  deleteCertificate: async (id) => axiosInstance.delete(`/certificates/${id}`),
};

export default certificateService;