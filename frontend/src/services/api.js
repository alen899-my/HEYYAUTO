// src/api.js (or wherever you handle API requests)



export const fetchData = async () => {
  const response = await fetch('https://heyyautooo.onrender.com/');
  const data = await response.json();
  return data;
};