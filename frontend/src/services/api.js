// src/api.js (or wherever you handle API requests)

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const fetchData = async () => {
  const response = await fetch(`${backendUrl}/register`);
  const data = await response.json();
  return data;
};
