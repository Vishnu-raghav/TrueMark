import { useSelector, useDispatch } from "react-redux";
import {
  issueCertificate,
  getCertificate,
  listIssuedCertificates,
  listUserCertificates,
  verifyCertificate,
  deleteCertificate,
  reset,
} from "../features/certificates/certificateSlice.js";

export const useCertificate = () => {
  const dispatch = useDispatch();
  const { certificate, certificates, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.certificate
  );

  // Certificate actions
  const create = (userId, data) => dispatch(issueCertificate({ userId, data }));
  const fetch = (id) => dispatch(getCertificate(id));
  const fetchIssued = () => dispatch(listIssuedCertificates());
  const fetchUser = () => dispatch(listUserCertificates());
  const verify = (id) => dispatch(verifyCertificate(id));
  const remove = (id) => dispatch(deleteCertificate(id));
  const resetState = () => dispatch(reset());

  return {
    certificate,
    certificates,
    isLoading,
    isError,
    isSuccess,
    message,
    create,
    fetch,
    fetchIssued,
    fetchUser,
    verify,
    remove,
    resetState,
  };
};
