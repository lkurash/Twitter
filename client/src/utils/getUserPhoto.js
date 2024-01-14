import undefinedUserPhoto from "../components/Imgs/user_photo.jpeg";

let BASE_URL = `${process.env.REACT_APP_API_SCHEMA}://${process.env.REACT_APP_API_HOST}`;
BASE_URL += process.env.REACT_APP_API_PORT
  ? `:${process.env.REACT_APP_API_PORT}`
  : "";

export default function getUserPhoto(user) {
  if (user.photo) {
    return `${BASE_URL}/${user.photo}`;
  }
  return undefinedUserPhoto;
}
