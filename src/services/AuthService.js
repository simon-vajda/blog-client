import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth/";

export function signup(name, email, password) {
  return axios.post(API_URL + "signup", {
    name,
    email,
    password,
  });
}

export async function login(email, password) {
  const response = await axios.post(API_URL + "login", {
    email,
    password,
  });

  if (response.data.jwt) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
}

export function logout() {
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}
