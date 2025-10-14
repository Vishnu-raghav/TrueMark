import { useSelector, useDispatch } from "react-redux";
import {
  createOrganization,
  getOrganization,
  listOrganizations,
  updateOrganization,
  deleteOrganization,
  reset,
} from "../features/organization/organizationSlice.js";

export const useOrganization = () => {
  const dispatch = useDispatch();
  const { organization, organizations, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.organization
  );

  // Organization actions
  const create = (data) => dispatch(createOrganization(data));
  const fetch = (id) => dispatch(getOrganization(id));
  const fetchAll = () => dispatch(listOrganizations());
  const update = (id, data) => dispatch(updateOrganization({ id, data }));
  const remove = (id) => dispatch(deleteOrganization(id));
  const resetState = () => dispatch(reset());

  return {
    organization,
    organizations,
    isLoading,
    isError,
    isSuccess,
    message,
    create,
    fetch,
    fetchAll,
    update,
    remove,
    resetState,
  };
};
