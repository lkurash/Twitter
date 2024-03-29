import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../redux/user/user.selectors";
import { userActions } from "../../redux/user/user.actions";

import getUserPhoto from "../../utils/getUserPhoto";
import { PROFILE_PAGE_USER_PATH } from "../../utils/routs";
import getAuthUserID from "../../utils/getAuthUserID";
import useOutsideClick from "../../utils/useOutsideClickFunction";

import BirthForm from "./BirthForm";
import CloseButton from "../buttons/CloseButton";

import buttonEditPhoto from "../Imgs/add_photo_icon.png";
import undefinedUserPhoto from "../Imgs/user_photo.jpeg";

let BASE_URL = `${process.env.REACT_APP_API_SCHEMA}://${process.env.REACT_APP_API_HOST}`;
BASE_URL += process.env.REACT_APP_API_PORT
  ? `:${process.env.REACT_APP_API_PORT}`
  : "";

const EditProfileForm = observer(() => {
  const dispatch = useDispatch();
  const { profile } = useSelector(userProfile);
  const { userStore } = useContext(Context);
  const navigate = useNavigate();
  const authUserID = getAuthUserID();
  const divRef = useRef(null);
  const [newPhoto, setNewPhoto] = useState("");
  const [newBackground, setNewBackground] = useState("");
  const [newName, setNewName] = useState("");
  const [newAbout, setNewAbout] = useState("");
  const [newWebSiteUrl, setNewWebSiteUrl] = useState("");
  const [activInputName, setActivInputName] = useState(false);
  const [activInputAbout, setActivInputAbout] = useState(false);
  const [activInputSite, setActivInputSite] = useState(false);

  useEffect(() => {
    userStore.setUserInfo(profile);
  }, []);

  const selectedFilePhoto = (e) => {
    setNewPhoto(e.target.files[0]);
  };

  const selectedFileBackground = (e) => {
    setNewBackground(e.target.files[0]);
  };

  const getUserBackground = () => {
    if (profile.background) {
      return `${BASE_URL}/${profile.background}`;
    }
    return undefinedUserPhoto;
  };

  const updateProfile = async () => {
    const formData = new FormData();

    if (newPhoto) {
      formData.append("photo", newPhoto);
    }
    if (newBackground) {
      formData.append("background", newBackground);
    }
    if (newName) {
      formData.append("name", userStore.name);
    }
    if (newWebSiteUrl) {
      formData.append(
        "web_site_url",
        userStore.webSite && userStore.webSite.trim()
      );
    }
    if (newAbout) {
      formData.append("about", userStore.about && userStore.about.trim());
    }
    formData.append("birthdate", userStore.birthDate);

    dispatch(userActions.updateProfile(authUserID, formData));
    navigate(PROFILE_PAGE_USER_PATH);
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
          <CloseButton nav={-1} />
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
            {newBackground ? (
              <img src={URL.createObjectURL(newBackground)} alt="background" />
            ) : (
              <img src={getUserBackground()} alt="background" />
            )}
            <div className="edit-profile-form-photo-button">
              <input
                name="editProfileFormInputBackground"
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
            {newPhoto ? (
              <img src={URL.createObjectURL(newPhoto)} alt="user" />
            ) : (
              <img src={getUserPhoto(profile)} alt="user" />
            )}
            <div className="edit-profile-form-photo-button">
              <input
                name="editProfileFormInputPhoto"
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
              name="editProfileFormInputName"
              value={userStore.name || ""}
              onChange={(e) => {
                userStore.setName(e.target.value);
                setNewName(true);
              }}
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
              name="editProfileFormInputAbout"
              value={userStore.about || ""}
              onChange={(e) => {
                userStore.setAbout(e.target.value);
                setNewAbout(true);
              }}
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
              name="editProfileFormInputWebSite"
              value={userStore.webSite || ""}
              onChange={(e) => {
                userStore.setWebSite(e.target.value);
                setNewWebSiteUrl(true);
              }}
            />
          </div>
        </div>
        <div className="signup-birth-form">
          <h4 className="edit-form-input-birth">Date of birth:</h4>
          <BirthForm user={profile} />
        </div>
      </main>
    </div>
  );
});

export default EditProfileForm;
