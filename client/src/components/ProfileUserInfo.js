import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "..";

import { FOLLOWER_PAGE_PATH, FOLLOWING_PAGE_PATH } from "../utils/constans";
import getUserPhoto from "../utils/getUserPhoto";

import TooltipUserNotAuth from "./common/TooltipUserNotAuth";
import ButtonEditProfile from "./buttons/ButtonEditProfile";
import ButtonFollowingUsersProfile from "./buttons/ButtonFollowingUsersProfile";

import birthdateIcon from "./Img/birthday_icon.png";
import webSiteIcon from "./Img/url_web_icon.png";
import registrationIcon from "./Img/month_icon.png";
import undefinedUserPhoto from "./Img/user_photo.jpeg";
import getAuthUserID from "../utils/getAuthUserID";

const ProfileUserInfo = observer(() => {
  const { usersStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);

  const navigate = useNavigate();
  const { id } = useParams();
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
              {authUserID === +id && (
                <ButtonEditProfile usersStore={usersStore} />
              )}
              {authUserID !== +id && (
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
        <div className="profile-panel-followers">
          <p
            onClick={() => {
              if (usersStore.isAuth) {
                navigate(FOLLOWING_PAGE_PATH + id);
              } else {
                setTooltipUserNotAuth(true);
              }
            }}
          >
            <span>{usersFollowingsStore.userFollowing.length}</span> Following
          </p>
          <p
            className="profile-panel-count-followers"
            onClick={() => {
              if (usersStore.isAuth) {
                navigate(FOLLOWER_PAGE_PATH + id);
              } else {
                setTooltipUserNotAuth(true);
              }
            }}
          >
            <span>{usersFollowingsStore.userFollowers.length}</span> Followers
          </p>
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
