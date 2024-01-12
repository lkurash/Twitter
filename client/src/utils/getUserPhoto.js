import undefinedUserPhoto from "../components/Imgs/user_photo.jpeg";
import env from "react-dotenv";

let BASE_URL = `${env.API_SCHEMA}://${env.API_HOST}`;
BASE_URL += env.API_PORT ? `:${env.API_PORT}` : "";

export default function getUserPhoto(user) {
  if (user.photo) {
    return `${BASE_URL}/${user.photo}`;
  }
  return undefinedUserPhoto;
}
