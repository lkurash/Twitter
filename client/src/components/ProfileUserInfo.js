import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { Context } from "..";

import {
  FOLLOWERS_PAGE_PATH,
  FOLLOWINGS_PAGE_PATH,
  PRIVATE_USERS_FOLLOWERS_PAGE_PATH,
  PRIVATE_USERS_FOLLOWINGS_PAGE_PATH,
  PROFILE_PAGE_USER_PATH,
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

const ProfileUserInfo = observer(({ pathHomeProfileUser }) => {
  const { usersStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);

  const navigate = useNavigate();
  const { id } = useParams();
  const authUserID = getAuthUserID();
  const location = useLocation().pathname;

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
              {(location === PROFILE_PAGE_USER_PATH || authUserID === +id) && (
                <ButtonEditProfile usersStore={usersStore} />
              )}
              {location !== PROFILE_PAGE_USER_PATH && authUserID !== +id && (
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
            to={
              pathHomeProfileUser && usersStore.isAuth
                ? FOLLOWINGS_PAGE_PATH
                : `/${usersStore.userPage.id}${PRIVATE_USERS_FOLLOWINGS_PAGE_PATH}`
            }
            id="following"
          >
            <span className="profile-panel-button-text-followers">
              {usersFollowingsStore.userFollowing.length} Following
            </span>
          </NavLink>
          <NavLink
            className="profile-panel-button-followers"
            to={
              pathHomeProfileUser && usersStore.isAuth
                ? FOLLOWERS_PAGE_PATH
                : `/${usersStore.userPage.id}${PRIVATE_USERS_FOLLOWERS_PAGE_PATH}`
            }
            id="followers"
          >
            <span className="profile-panel-button-text-followers">
              {usersFollowingsStore.userFollowers.length} Followers
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
