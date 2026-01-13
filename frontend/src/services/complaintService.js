require("dotenv").config();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api";

export async function getAllComplaints() {
  const token = localStorage.getItem("citizen_sahyog_token");

  const res = await fetch(`${API_BASE_URL}/complaints`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch complaints");
  }

  return data;
}

export const createComplaint = async (formData) => {
  const token = localStorage.getItem("citizen_sahyog_token");

  const res = await fetch(`${API_BASE_URL}/complaints/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
      // ❌ DO NOT set Content-Type for FormData
    },
    body: formData
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create complaint");
  }

  return data;
};

export async function getMyComplaints() {
  const token = localStorage.getItem("citizen_sahyog_token");

  const res = await fetch(`${API_BASE_URL}/complaints/my`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch complaints");
  }

  return data;
}

import axios from "axios";


export const likeComplaint = async (complaintId) => {
  const token = localStorage.getItem("citizen_sahyog_token");

  if (!token) throw new Error("No auth token");

  const res = await axios.patch(
    `${API_BASE_URL}/complaints/like/${complaintId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const addComment = async (complaintId, text) => {
  const token = localStorage.getItem("citizen_sahyog_token");

  const res = await axios.post(
    `${API_BASE_URL}/complaints/comment/${complaintId}`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data; // { message, comments }
};
