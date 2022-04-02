export const API_URL = "http://localhost:8080/api/v1";

export const headers = (user) => ({
  Authorization: user ? `Bearer ${user.token}` : "",
});
