// src/services/api.js
import axios from "axios";

// Backend base URL
const API_BASE_URL = "http://localhost:5000/api";

// Helper function to get token from localStorage
const getAuthToken = () => localStorage.getItem("token");

// -------------------- Auth APIs --------------------

// Signup
export const signup = async (userData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Login
export const login = async (userData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// -------------------- Event APIs --------------------

// Create event
export const createEvent = async (eventData) => {
  try {
    const token = getAuthToken();
    const res = await axios.post(`${API_BASE_URL}/events`, eventData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get my events
export const getMyEvents = async () => {
  try {
    const token = getAuthToken();
    const res = await axios.get(`${API_BASE_URL}/events`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update event status
export const updateEventStatus = async (eventId, status) => {
  try {
    const token = getAuthToken();
    const res = await axios.put(
      `${API_BASE_URL}/events/${eventId}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// -------------------- Swap APIs --------------------

// Get swappable slots
export const getSwappableSlots = async () => {
  try {
    const token = getAuthToken();
    const res = await axios.get(`${API_BASE_URL}/swappable-slots`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Create swap request
export const createSwapRequest = async (mySlotId, theirSlotId) => {
  try {
    const token = getAuthToken();
    const res = await axios.post(
      `${API_BASE_URL}/swap-request`,
      { mySlotId, theirSlotId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Respond to swap request
export const respondSwapRequest = async (requestId, accept) => {
  try {
    const token = getAuthToken();
    const res = await axios.post(
      `${API_BASE_URL}/swap-response/${requestId}`,
      { accept },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get my swap requests
export const getMyRequests = async () => {
  try {
    const token = getAuthToken();
    const res = await axios.get(`${API_BASE_URL}/my-requests`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
// --- Swap Requests APIs ---
export const getSwapRequests = async (token) => {
  const res = await fetch(`http://localhost:5000/api/swaps/my-requests`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch swap requests");
  return res.json();
};

export const respondToSwap = async (id, status, token) => {
  const res = await fetch(`http://localhost:5000/api/swaps/respond/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update swap status");
  return res.json();
};