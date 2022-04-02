export const API_URL =
  process.env?.NODE_ENV === "development"
    ? "http://localhost:8080/api/v1"
    : "https://blog-server.azurewebsites.net/api/v1";

export const headers = (user) => ({
  Authorization: user ? `Bearer ${user.token}` : "",
});
