import axios from "axios";

const API = "https://citizen-sahyog.onrender.com/api/admin";

const token = () => ({
  headers: {
Authorization: `Bearer ${localStorage.getItem("citizen_sahyog_token")}`
  }
});

export const getAllComplaintsAdmin = async () => {
  const res = await axios.get(`${API}/complaints`, token());
  return res.data;
};

export const updateComplaintStatus = async (id, status) => {
  const res = await axios.put(
    `${API}/complaints/${id}/status`,
    { status },
    token()
  );
  return res.data;
};

export const deleteComplaint = async (id) => {
  const res = await axios.delete(`${API}/complaints/${id}`, token());
  return res.data;
};
export const getAllUsersAdmin = async () => {
  const res = await axios.get(`${API}/users/list`, token());
  return res.data;
};
export const blockUser = async (id) => {
  const res = await axios.put(`${API}/users/${id}/block`, {}, token());
  return res.data;
};
