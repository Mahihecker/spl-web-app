// src/utils/api.js
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE = 'http://localhost:8000/api';

export async function fetchData(endpoint, useMock = true) {
  if (useMock) {
    const response = await fetch(`/data${endpoint}.json`);
    if (!response.ok) throw new Error('Mock data not found');
    return response.json();
  } else {
    const token = Cookies.get('token');
    const response = await axios.get(`${API_BASE}${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
}