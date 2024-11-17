// src/api.js (or wherever you handle API requests)



export const fetchData = async () => {
  const response = await fetch('https://heyyautoo.onrender.com/register');
  const data = await response.json();
  return data;
};