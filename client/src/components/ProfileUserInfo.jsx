import { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { auth, userProfileById } from "../redux/user/user.selectors";
import { userPreview } from "../redux/user/userOptions/userOptions.selectors";
import { userOptionsActions } from "../redux/user/userOptions/userOptions.actions";

import {
  FOLLOWERS_PAGE_PATH,
  FOLLOWINGS_PAGE_PATH,
  USER_FOLLOWER_PAGE_PATH,
  USER_FOLLOWING_PAGE_PATH,
  PROFILE_PAGE_USER_PATH,
} from "../utils/routs";
import getUserPhoto from "../utils/getUserPhoto";
import path from "../utils/path";
import getAuthUserID from "../utils/getAuthUserID";

import TooltipUserNotAuth from "./common/TooltipUserNotAuth";
import EditProfileButton from "./buttons/EditProfileButton";
import FollowButton from "./buttons/FollowButton";

import birthdateIcon from "./Imgs/birthday_icon.png";
import webSiteIcon from "./Imgs/url_web_icon.png";
import registrationIcon from "./Imgs/month_icon.png";
import undefinedUserPhoto from "./Imgs/user_photo.jpeg";

let BASE_URL = `${process.env.REACT_APP_API_SCHEMA}://${process.env.REACT_APP_API_HOST}`;
BASE_URL += process.env.REACT_APP_API_PORT
  ? `:${process.env.REACT_APP_API_PORT}`
  : "";

const ProfileUserInfo = ({ pathHomeProfileUser }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector(userProfileById);
  const { isAuth } = useSelector(auth);
  const { userInfo, loadingStatus } = useSelector(userPreview);
  const { id } = useParams();

  const location = useLocation().pathname;

  const authUserID = getAuthUserID();

  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);

  const getRegistrationDate = new Date(profile.createdAt).toString().split(" ");
  const registrationDate = `${getRegistrationDate[1]}, ${getRegistrationDate[3]}`;

  const getUserBackground = () => {
    if (profile.background) {
      return `${BASE_URL}/${profile.background}`;
    }
    return undefinedUserPhoto;
  };

  const onCloseTooltip = () => {
    setTooltipUserNotAuth(false);
  };

  useEffect(() => {
    if (id) {
      dispatch(userOptionsActions.getPreviewProfile(id, authUserID));
    }
  }, []);

  if (!profile) {
    return null;
  }

  return (
    <>
      <div className="profile-panel-photo">
        <div className="profile-panel-background-user">
          <img src={getUserBackground()} alt="background" />
        </div>
        <div className="profile-panel-block-photo-button">
          <div className="profile-panel-photo-user">
            <img src={getUserPhoto(profile)} alt="User" />
          </div>

          {isAuth && (
            <>
              <div className="wrapper-follow-button">
                {(location === PROFILE_PAGE_USER_PATH ||
                  authUserID === profile.id) && <EditProfileButton />}

                {loadingStatus === "COMPLETE" && authUserID !== profile.id && (
                  <FollowButton
                    follow={userInfo.following}
                    profile={profile}
                    classButton="button-follow-user-profile"
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <div className="profile-panel-user-name">
          <h2>{profile.user_name}</h2>
          <p>@{profile.user_name}</p>
        </div>
        <article className="profile-panel-about-user">
          <p>{profile.about}</p>
        </article>
        <div className="profile-button-panel-followers">
          <NavLink
            data-testid="nav-to-followings"
            onClick={() => {
              if (!authUserID) {
                setTooltipUserNotAuth(true);
              }
            }}
            to={
              authUserID
                ? pathHomeProfileUser && authUserID
                  ? FOLLOWINGS_PAGE_PATH
                  : path(USER_FOLLOWING_PAGE_PATH, profile.id)
                : ""
            }
            id="following"
          >
            <span className="profile-panel-button-text-followers">
              {profile.following} Following
            </span>
          </NavLink>
          <NavLink
            className="profile-panel-button-followers"
            onClick={() => {
              if (!authUserID) {
                setTooltipUserNotAuth(true);
              }
            }}
            to={
              authUserID
                ? authUserID && pathHomeProfileUser
                  ? FOLLOWERS_PAGE_PATH
                  : path(USER_FOLLOWER_PAGE_PATH, profile.id)
                : ""
            }
            id="followers"
          >
            <span className="profile-panel-button-text-followers">
              {profile.followers} Followers
            </span>
          </NavLink>
          <TooltipUserNotAuth
            tooltipUserNotAuth={tooltipUserNotAuth}
            onCloseTooltip={onCloseTooltip}
            follow
          />
        </div>
        <div className="profile-panel-info-user">
          {profile.web_site_url && (
            <div className="profile-panel-info-user-web-site">
              <img src={webSiteIcon} className="info-icon" alt="Info" />
              <a className="link" href={`https://${profile.web_site_url}`}>
                {profile.web_site_url}
              </a>
            </div>
          )}
          <div className="profile-panel-info-user-birthdate">
            <img src={birthdateIcon} className="info-icon" alt="Info" />
            <p>{`Date of birth: ${profile.birthdate}`}</p>
          </div>
          <div className="profile-panel-info-user-registration">
            <img src={registrationIcon} className="info-icon" alt="Info" />
            <p>Registration: {registrationDate}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUserInfo;
