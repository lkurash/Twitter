import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Context } from "..";

import {
  PRIVATE_FOLLOWERS_PAGE_PATH,
  PRIVATE_FOLLOWINGS_PAGE_PATH,
  PRIVATE_USER_FOLLOWER_PAGE_PATH,
  PRIVATE_USER_FOLLOWING_PAGE_PATH,
  PRIVATE_PROFILE_PAGE_USER_PATH,
} from "../utils/constans";
import getUserPhoto from "../utils/getUserPhoto";

import TooltipUserNotAuth from "./common/TooltipUserNotAuth";
import ButtonEditProfile from "./buttons/ButtonEditProfile";
import ButtonFollowingUsersProfile from "./buttons/ButtonFollowingUsersProfile";

import birthdateIcon from "./Img/birthday_icon.png";
import webSiteIcon from "./Img/url_web_icon.png";
import registrationIcon from "./Img/month_icon.png";
import undefinedUserPhoto from "./Img/user_photo.jpeg";
import getAuthUserID from "../utils/getAuthUserID";
import path from "../utils/path";

const ProfileUserInfo = observer(({ pathHomeProfileUser }) => {
  const { usersStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);

  const location = useLocation().pathname;

  const authUserID = getAuthUserID();

  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);

  const getRegistrationDate = new Date(usersStore.userPage.createdAt)
    .toString()
    .split(" ");
  const registrationDate = `${getRegistrationDate[1]}, ${getRegistrationDate[3]}`;

  const getUserBackground = () => {
    if (usersStore.userPage.background) {
      return `http://localhost:5500/${usersStore.userPage.background}`;
    }
    return undefinedUserPhoto;
  };

  const onCloseTooltip = () => {
    setTooltipUserNotAuth(false);
  };

  return (
    <>
      <div className="profile-panel-photo">
        <div className="profile-panel-background-user">
          <img src={getUserBackground()} alt="background" />
        </div>
        <div className="profile-panel-block-photo-button">
          <div className="profile-panel-photo-user">
            <img src={getUserPhoto(usersStore.userPage)} alt="User" />
          </div>

          {usersStore.isAuth && (
            <>
              {(location === PRIVATE_PROFILE_PAGE_USER_PATH ||
                authUserID === usersStore.userPage.id) && (
                <ButtonEditProfile usersStore={usersStore} />
              )}
              {location !== PRIVATE_PROFILE_PAGE_USER_PATH &&
                authUserID !== usersStore.userPage.id && (
                  <ButtonFollowingUsersProfile
                    user={usersStore}
                    usersFollow={usersFollowingsStore}
                  />
                )}
            </>
          )}
        </div>
      </div>
      <div>
        <div className="profile-panel-user-name">
          <h2>{usersStore.userPage.user_name}</h2>
          <p>@{usersStore.userPage.user_name}</p>
        </div>
        <article className="profile-panel-about-user">
          <p>{usersStore.userPage.about}</p>
        </article>
        <div className="profile-button-panel-followers">
          <NavLink
            onClick={() => {
              if (!authUserID) {
                setTooltipUserNotAuth(true);
              }
            }}
            to={
              authUserID
                ? pathHomeProfileUser && authUserID
                  ? PRIVATE_FOLLOWINGS_PAGE_PATH
                  : path(
                      PRIVATE_USER_FOLLOWING_PAGE_PATH,
                      usersStore.userPage.id
                    )
                : ""
            }
            id="following"
          >
            <span className="profile-panel-button-text-followers">
              {usersStore.userPage.following} Following
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
                  ? PRIVATE_FOLLOWERS_PAGE_PATH
                  : path(
                      PRIVATE_USER_FOLLOWER_PAGE_PATH,
                      usersStore.userPage.id
                    )
                : ""
            }
            id="followers"
          >
            <span className="profile-panel-button-text-followers">
              {usersStore.userPage.followers} Followers
            </span>
          </NavLink>
          <TooltipUserNotAuth
            tooltipUserNotAuth={tooltipUserNotAuth}
            onCloseTooltip={onCloseTooltip}
            follow
          />
        </div>
        <div className="profile-panel-info-user">
          {usersStore.userPage.web_site_url && (
            <div className="profile-panel-info-user-web-site">
              <img src={webSiteIcon} className="info-icon" alt="Info" />
              <a
                className="link"
                href={`https://${usersStore.userPage.web_site_url}`}
              >
                {usersStore.userPage.web_site_url}
              </a>
            </div>
          )}
          <div className="profile-panel-info-user-birthdate">
            <img src={birthdateIcon} className="info-icon" alt="Info" />
            <p>{`Date of birth: ${usersStore.userPage.birthdate}`}</p>
          </div>
          <div className="profile-panel-info-user-registration">
            <img src={registrationIcon} className="info-icon" alt="Info" />
            <p>Registration: {registrationDate}</p>
          </div>
        </div>
      </div>
    </>
  );
});

export default ProfileUserInfo;
