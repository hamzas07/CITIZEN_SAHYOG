import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api/admin";

const token = () => ({
  headers: {
Authorization: `Bearer ${localStorage.getItem("citizen_sahyog_token")}`
  }
});

export const getAllComplaintsAdmin = async () => {
  const res = await axios.get(`${API_BASE_URL}/complaints`, token());
  return res.data;
};

export const updateComplaintStatus = async (id, status) => {
  const res = await axios.put(
    `${API_BASE_URL}/complaints/${id}/status`,
    { status },
    token()
  );
  return res.data;
};

export const deleteComplaint = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/complaints/${id}`, token());
  return res.data;
};
export const getAllUsersAdmin = async () => {
  const res = await axios.get(`${API_BASE_URL}/users/list`, token());
  return res.data;
};
export const blockUser = async (id) => {
  const res = await axios.put(`${API_BASE_URL}/users/${id}/block`, {}, token());
  return res.data;
};
