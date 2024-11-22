import { jwtDecode } from "jwt-decode";
const jwtDecoded = (token) => {
  const decoded = jwtDecode(token);
  return { token, email: decoded.email, role: decoded.role };
};

export default jwtDecoded;
