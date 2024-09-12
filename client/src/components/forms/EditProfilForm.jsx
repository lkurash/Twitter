import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../redux/user/user.selectors";
import { userActions } from "../../redux/user/user.actions";
import { visibilityUserInfo } from "../../redux/user/visibilityUserInfo/userInfo.selector";

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

const EditProfileForm = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(userProfile);
  const userInfoState = useSelector(visibilityUserInfo);
  const navigate = useNavigate();
  const authUserID = getAuthUserID();
  const divRef = useRef(null);
  const [userPhoto, setUserPhoto] = useState("");
  const [userBackground, setUserBackground] = useState("");
  const [userName, setUserName] = useState(profile.user_name);
  const [userAbout, setUserAbout] = useState(profile.about);
  const [userWebSite, setUserWebSite] = useState(profile.web_site_url);
  const [activInputName, setActivInputName] = useState(false);
  const [activInputAbout, setActivInputAbout] = useState(false);
  const [activInputSite, setActivInputSite] = useState(false);

  const selectedFilePhoto = (e) => {
    setUserPhoto(e.target.files[0]);
  };

  const selectedFileBackground = (e) => {
    setUserBackground(e.target.files[0]);
  };

  const getUserBackground = () => {
    if (profile.background) {
      return `${BASE_URL}/${profile.background}`;
    }
    return undefinedUserPhoto;
  };

  const updateProfile = async () => {
    const formData = new FormData();

    if (userPhoto) {
      formData.append("photo", userPhoto);
    }
    if (userBackground) {
      formData.append("background", userBackground);
    }
    if (userName !== profile.user_name) {
      formData.append("name", userName);
    }
    if (userWebSite !== profile.web_site_url) {
      formData.append("web_site_url", userWebSite && userWebSite.trim());
    }
    if (userAbout !== profile.about) {
      formData.append("about", userAbout && userAbout.trim());
    }
    formData.append("birthdate", userInfoState.birthDate);

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
          data-testid="save-new-profile"
          className="edit-profile-form-button-save"
          onClick={updateProfile}
        >
          <p>Save</p>
        </button>
      </header>
      <main className="edit-profile-form-main">
        <div className="edit-profile-background">
          <div className="edit-profile-background-photo">
            {userBackground ? (
              <img src={URL.createObjectURL(userBackground)} alt="background" />
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
            {userPhoto ? (
              <img src={URL.createObjectURL(userPhoto)} alt="user" />
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
              value={userName || ""}
              onChange={(e) => {
                setUserName(e.target.value);
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
              value={userAbout || ""}
              onChange={(e) => {
                setUserAbout(e.target.value);
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
              value={userWebSite || ""}
              onChange={(e) => {
                setUserWebSite(e.target.value);
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
};

export default EditProfileForm;
