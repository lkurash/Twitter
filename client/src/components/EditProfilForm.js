import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { updateUserProfile } from "../hhtp/userApi";
import BirthForm from "./BirthForm";
import buttonEditPhoto from "./Img/add_photo_icon.png";
import "./userpage.css";
import undefinedUserPhoto from "./Img/user_photo.jpeg";
import ButtonClose from "./common/ButtonClose";
import getUserPhoto from "../utils/getUserPhoto";
import { PROFILE_PAGE_USER } from "../utils/constans";

const EditProfileForm = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [textWebSiteUrl, setTextWebSiteUrl] = useState("");
  const [photo, setPhoto] = useState("");
  const [background, setBackground] = useState("");
  const [activInputName, setActivInputName] = useState(false);
  const [activInputAbout, setActivInputAbout] = useState(false);
  const [activInputSite, setActivInputSite] = useState(false);

  const selectedFilePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  const selectedFileBackground = (e) => {
    setBackground(e.target.files[0]);
  };

  const getUserBackground = () => {
    if (user.user.background) {
      return `http://localhost:5500/${user.user.background}`;
    }
    return undefinedUserPhoto;
  };

  const updateProfile = async () => {
    const formData = new FormData();

    formData.append("photo", photo);
    formData.append("background", background);
    formData.append("name", name);
    formData.append("birthdate", user.birthDate);
    formData.append("web_site_url", textWebSiteUrl);
    formData.append("about", about);

    updateUserProfile(formData);
    navigate(PROFILE_PAGE_USER + user.user.id);
  };

  return (
    <div className="edit-profile-form">
      <header className="edit-profile-form-header">
        <ButtonClose />
        <h4 className="edit-profile-title">Edit Profile</h4>
        <button
          className="edit-profile-form-button-save"
          onClick={updateProfile}
        >
          <label>Save</label>
        </button>
      </header>
      <main className="edit-profile-form-main">
        <div className="edit-profile-background">
          <div className="edit-profile-background-photo">
            {background ? (
              <img src={URL.createObjectURL(background)} alt="background" />
            ) : (
              <img src={getUserBackground()} alt="background" />
            )}
            <div className="edit-profile-form-photo-button">
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                id="input-file-background"
                onChange={selectedFileBackground}
              />
              <label htmlFor="input-file-background">
                <img src={buttonEditPhoto} alt="edit" />
              </label>
            </div>
          </div>
          <div className="edit-profile-form-photo">
            {!photo ? (
              <img src={getUserPhoto(user.user)} alt="user" />
            ) : (
              <img src={URL.createObjectURL(photo)} alt="user" />
            )}
            <div className="edit-profile-form-photo-button">
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                id="input-file"
                onChange={selectedFilePhoto}
              />
              <label htmlFor="input-file">
                <img src={buttonEditPhoto} alt="edit" />
              </label>
            </div>
          </div>
        </div>
        {!activInputName ? (
          <div
            className="edit-form-input edit-form-input-name"
            onClick={() => {
              setName(user.user.user_name);
              setActivInputName(true);
            }}
          >
            <label>Name</label>
            <p>{user.user.user_name}</p>
          </div>
        ) : (
          <div className="edit-form-input active edit-form-input-name">
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
        )}
        {!activInputAbout ? (
          <div
            className="edit-form-input about"
            onClick={() => {
              setAbout(user.user.about);
              setActivInputAbout(true);
            }}
          >
            <label>About me</label>
            <p>{user.user.about}</p>
          </div>
        ) : (
          <div className="edit-form-input about active">
            <label>About me</label>
            <textarea
              value={about}
              autoFocus
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
        )}
        {!activInputSite ? (
          <div
            className="edit-form-input"
            onClick={() => {
              setTextWebSiteUrl(user.user.web_site_url);
              setActivInputSite(true);
            }}
          >
            <label>Web site</label>
            <p>{user.user.web_site_url}</p>
          </div>
        ) : (
          <div className="edit-form-input active">
            <label>Web site</label>
            <input
              autoFocus
              value={textWebSiteUrl}
              onChange={(e) => setTextWebSiteUrl(e.target.value)}
            />
          </div>
        )}
        <div className="signup-birth-form">
          <BirthForm />
        </div>
      </main>
    </div>
  );
});

export default EditProfileForm;
