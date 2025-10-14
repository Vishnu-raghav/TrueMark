import axiosInstance from "../../utils/axiosInstance";

const certificateService = {
    issueCertificate: async (data) => axiosInstance.post("/certifiates/issue", data),
    getCertificate: async (id) => axiosInstance.get(`/certificates/${id}`),
    listIssuedCertificates: async () => axiosInstance.get("/certificates/issued"),
    listUserCertificates: async () => axiosInstance.get("/certificates/my"),
    verifyCertificate: async (id) => axiosInstance.get(`/certificates/verify/${id}`),
    deleteCertificate: async (id) => axiosInstance.delete(`/certificates/${id}`),
}

export default certificateService