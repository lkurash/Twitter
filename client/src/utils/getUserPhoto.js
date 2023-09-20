import undefinedUserPhoto from "../components/Imgs/user_photo.jpeg";

export default function getUserPhoto(user) {
  if (user.photo) {
    return `http://localhost:5500/${user.photo}`;
  }
  return undefinedUserPhoto;
}
