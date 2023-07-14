import jwt_decode from "jwt-decode";

export default function getAuthUserID(user) {
  if (user.isAuth) {
    const { id } = jwt_decode(localStorage.token);
    return id;
  } else {
    return false;
  }
}
