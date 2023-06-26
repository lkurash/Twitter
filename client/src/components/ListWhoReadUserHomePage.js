import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { createFollow, getAllUsers, getFollowingUser } from "../http/userApi";
import { PROFILE_PAGE_USER } from "../utils/constans";
import getUserPhoto from "../utils/getUserPhoto";

const ListWhoReadUserHomePage = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const whoReadingList = [];
  const whoNotReadingList = [];

  const textOnButtonFollow = (id) => {
    if (user.startFollowUser.id === id) {
      return "Following";
    }
    return "Follow";
  };
  const getUsersAndFollowigs = async () => {
    await getAllUsers().then((users) => user.setAllUsers(users));
    await getFollowingUser(user.user.id).then((allFollowing) =>
      user.setuserFollowing(allFollowing)
    );
  };

  const createFollowing = async (profile) => {
    await createFollow(profile.id);
    getUsersAndFollowigs();
  };

  const chekFollowingUser = () => {
    user.allUsers.map((allUser) => {
      whoReadingList.push(user.user.id);
      allUser.Followings.forEach((followUser) => {
        if (user.user.id === followUser.UserId) {
          whoReadingList.push(followUser.followUserId);
        }
      });
    });
  };

  const createNotReadingList = () => {
    user.allUsers.map((allUser) => {
      if (!whoReadingList.includes(allUser.id)) {
        whoNotReadingList.push(allUser);
      }
    });
  };

  chekFollowingUser();
  createNotReadingList();
  return (
    <ul className="follow-page-main-users">
      {whoNotReadingList.length > 0 ? (
        <>
          {whoNotReadingList.map((profile) => (
            <li className="follow-page-main-user" key={profile.id}>
              <div
                className="section-read-main-user-info"
                onClick={() => navigate(PROFILE_PAGE_USER + profile.id)}
              >
                <img src={getUserPhoto(profile)} alt="User" />
                <div className="section-read-main-user-name">
                  <p className="user-name">{profile.user_name}</p>
                  <p className="profile-name">{`@${profile.user_name}`}</p>
                </div>
              </div>
              {user.user.id && (
                <button
                  type="reset"
                  className="follow-page-main-button-follow"
                  onClick={() => {
                    user.setStartFollowUser(profile);
                    createFollowing(profile);
                  }}
                >
                  <span>{textOnButtonFollow(profile.id)}</span>
                </button>
              )}
            </li>
          ))}
        </>
      ) : (
        <p className="section-read-main-hidden">You are following all users</p>
      )}
    </ul>
  );
});

export default ListWhoReadUserHomePage;
