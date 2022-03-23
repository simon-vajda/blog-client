import { getCurrentUser } from "./AuthService";

export default function AuthHeader() {
  const user = getCurrentUser();

  if (user && user.jwt) {
    return { Authorization: "Bearer " + user.jwt };
  } else {
    return {};
  }
}
