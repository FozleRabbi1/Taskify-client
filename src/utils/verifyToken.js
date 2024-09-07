import { jwtDecode } from "jwt-decode";

export const verifyToken = (token) => {
    const decoded = jwtDecode(token);
    return decoded;
};
