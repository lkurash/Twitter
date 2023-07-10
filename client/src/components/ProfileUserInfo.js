import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "..";
import birthdateIcon from "./Img/birthday_icon.png";
import webSiteIcon from "./Img/url_web_icon.png";
import registrationIcon from "./Img/month_icon.png";
import undefinedUserPhoto from "./Img/user_photo.jpeg";
import { FOLLOWER_PAGE, FOLLOWING_PAGE } from "../utils/constans";
import getUserPhoto from "../utils/getUserPhoto";
import TooltipUserNotAuth from "./common/TooltipUserNotAuth";
import ButtonEditProfile from "./ButtonEditProfile";
import ButtonFollowProfile from "./ButtonFollowProfile";

const ProfileUserInfo = observer(() => {
  const { user } = useContext(Context);
  const { usersFollow } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();

  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);

  const getRegistrationDate = new Date(user.userPage.createdAt)
    .toString()
    .split(" ");
  const registrationDate = `${getRegistrationDate[1]}, ${getRegistrationDate[3]}`;

  const getUserBackground = () => {
    if (user.userPage.background) {
      return `http://localhost:5500/${user.userPage.background}`;
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
            <img src={getUserPhoto(user.userPage)} alt="User" />
          </div>

          {user.isAuth && (
            <>
              <ButtonEditProfile user={user} />
              <ButtonFollowProfile user={user} usersFollow={usersFollow} />
            </>
          )}
        </div>
      </div>
      <div>
        <div className="profile-panel-user-name">
          <h2>{user.userPage.user_name}</h2>
          <p>@{user.userPage.user_name}</p>
        </div>
        <article className="profile-panel-about-user">
          <p>{user.userPage.about}</p>
        </article>
        <div className="profile-panel-followers">
          <p
            onClick={() => {
              if (user.isAuth) {
                navigate(FOLLOWING_PAGE + id);
              } else {
                setTooltipUserNotAuth(true);
              }
            }}
          >
            <span>{usersFollow.userFollowing.length}</span> Following
          </p>
          <p
            className="profile-panel-count-followers"
            onClick={() => {
              if (user.isAuth) {
                navigate(FOLLOWER_PAGE + id);
              } else {
                setTooltipUserNotAuth(true);
              }
            }}
          >
            <span>{usersFollow.userFollowers.length}</span> Followers
          </p>
          <TooltipUserNotAuth
            tooltipUserNotAuth={tooltipUserNotAuth}
            onCloseTooltip={onCloseTooltip}
            follow
          />
        </div>
        <div className="profile-panel-info-user">
          {user.userPage.web_site_url && (
            <div className="profile-panel-info-user-web-site">
              <img src={webSiteIcon} className="info-icon" alt="Info" />
              <a href={`https://${user.userPage.web_site_url}`}>
                {user.userPage.web_site_url}
              </a>
            </div>
          )}
          <div className="profile-panel-info-user-birthdate">
            <img src={birthdateIcon} className="info-icon" alt="Info" />
            <p>{`Date of birth: ${user.userPage.birthdate}`}</p>
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
