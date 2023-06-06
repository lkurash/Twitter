import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Context } from "..";
import { createFollow, getFollowingUser } from "../http/userApi";
import birthdateIcon from "./Img/birthday_icon.png";
import webSiteIcon from "./Img/url_web_icon.png";
import registrationIcon from "./Img/month_icon.png";
import undefinedUserPhoto from "./Img/user_photo.jpeg";
import {
  EDIT_PROFILE_PAGE,
  FOLLOWER_PAGE,
  FOLLOWING_PAGE,
} from "../utils/constans";
import getUserPhoto from "../utils/getUserPhoto";

const ProfileUserInfo = observer(() => {
  const { user } = useContext(Context);

  const location = useLocation().pathname;
  const navigate = useNavigate();
  const { id } = useParams();
  const [following, setFollowing] = useState(false);
  const followingUser = [];

  const date = new Date(user.userPage.createdAt).toString().split(" ");
  const registrationDate = `${date[1]}, ${date[3]}`;

  const getUserBackground = () => {
    if (user.userPage.background) {
      return `http://localhost:5500/${user.userPage.background}`;
    }
    return undefinedUserPhoto;
  };

  const checkFollowingUser = () => {
    user.userFollowers.map((follower) => {
      if (follower.UserId === user.user.id) {
        followingUser.push(follower);
      }
    });
  };

  const createFollowing = () => {
    setFollowing(true);
    createFollow(user.userPage.id);
    getFollowingUser(id).then((allFollowing) =>
      user.setuserFollowing(allFollowing)
    );
  };

  checkFollowingUser();

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

          {location !== `/twitter/profile/${user.userPage.id}` && (
            <>
              {location === `/profile/${user.user.id}` ||
              location === `/profile/answers/${user.user.id}` ||
              location === `/profile/media/${user.user.id}` ||
              location === `/profile/likes/${user.user.id}` ? (
                <button
                  type="button"
                  className="button-edit-profile"
                  onClick={() => navigate(EDIT_PROFILE_PAGE + user.user.id)}
                >
                  <span>Edit Profile</span>
                </button>
              ) : (
                <>
                  {followingUser.length > 0 || following ? (
                    <button type="button" className="button-edit-profile">
                      <span>Following</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="button-edit-profile"
                      onClick={() => {
                        createFollowing();
                      }}
                    >
                      <span>Follow</span>
                    </button>
                  )}
                </>
              )}
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
          <p onClick={() => navigate(FOLLOWING_PAGE + id)}>
            <span>{user.userFollowing.length}</span> Following
          </p>
          <p
            className="profile-panel-count-followers"
            onClick={() => navigate(FOLLOWER_PAGE + id)}
          >
            <span>{user.userFollowers.length}</span> Followers
          </p>
        </div>
        <div className="profile-panel-info-user">
          {user.userPage.web_site_url ? (
            <div className="profile-panel-info-user-web-site">
              <img src={webSiteIcon} className="info-icon" alt="Info" />
              <a href={`https://${user.userPage.web_site_url}`}>
                {user.userPage.web_site_url}
              </a>
            </div>
          ) : (
            <div />
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
