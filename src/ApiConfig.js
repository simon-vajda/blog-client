export const API_URL =
  process.env.REACT_APP_API_URL ?? "http://localhost:8080/api/v1";

export const headers = (user) => ({
  Authorization: user ? `Bearer ${user.token}` : "",
});
