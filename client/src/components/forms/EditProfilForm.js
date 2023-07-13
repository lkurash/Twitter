import { useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

import { updateUserProfile } from "../../http/userApi";
import getUserPhoto from "../../utils/getUserPhoto";
import { PROFILE_PAGE_USER } from "../../utils/constans";
import useOutsideClick from "../../utils/useOutsideClickFunction";

import BirthForm from "./BirthForm";
import ButtonClose from "../buttons/ButtonClose";

import "../userpage.css";
import buttonEditPhoto from "../Img/add_photo_icon.png";
import undefinedUserPhoto from "../Img/user_photo.jpeg";

const EditProfileForm = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();
  const divRef = useRef(null);
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
    formData.append("web_site_url", textWebSiteUrl.trim());
    formData.append("about", about.trim());

    await updateUserProfile(id, formData).catch((error) => {
      console.log(error.response.data.message);
    });

    navigate(PROFILE_PAGE_USER + user.user.id);
  };
  const onClose = () => {
    setActivInputName(false);
    setActivInputAbout(false);
    setActivInputSite(false);
  };

  useOutsideClick(divRef, onClose);
  return (
    <div className="edit-profile-form wrapper-border">
      <header className="edit-profile-form-header">
        <div className="edit-profile-form-header-title">
          <ButtonClose nav={-1} />
          <h4 className="edit-profile-title">Edit Profile</h4>
        </div>
        <button
          className="edit-profile-form-button-save"
          onClick={updateProfile}
        >
          <p>Save</p>
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
        <div className="edit-form-inputs">
          <div
            className={
              activInputName ? "edit-form-input active" : "edit-form-input"
            }
            ref={divRef}
            onClick={() => {
              setActivInputName(true);
              setActivInputAbout(false);
              setActivInputSite(false);
            }}
          >
            <h4>Name</h4>
            <input
              value={name || user.user.user_name || ""}
              onChange={(e) => setName(e.target.value.trim())}
            />
          </div>
          <div
            className={
              activInputAbout
                ? "edit-form-input about active"
                : "edit-form-input about"
            }
            ref={divRef}
            onClick={() => {
              setActivInputName(false);
              setActivInputSite(false);
              setActivInputAbout(true);
            }}
          >
            <h4>About me</h4>
            <textarea
              value={about || user.user.about || ""}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          <div
            className={
              activInputSite ? "edit-form-input active" : "edit-form-input"
            }
            ref={divRef}
            onClick={() => {
              setActivInputName(false);
              setActivInputAbout(false);
              setActivInputSite(true);
            }}
          >
            <h4>Web site</h4>
            <input
              value={textWebSiteUrl || user.user.web_site_url || ""}
              onChange={(e) => setTextWebSiteUrl(e.target.value)}
            />
          </div>
        </div>
        <div className="signup-birth-form">
          <BirthForm />
        </div>
      </main>
    </div>
  );
});

export default EditProfileForm;
