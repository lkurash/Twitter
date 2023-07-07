import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { createFollow, getAllUsers, getFollowingUser } from "../http/userApi";
import { PROFILE_PAGE_USER, TWITTER_USER_PAGE } from "../utils/constans";
import getUserPhoto from "../utils/getUserPhoto";
import spinner from "../utils/spinner";

const ListWhoReadUserHomePage = observer(() => {
  const { user } = useContext(Context);
  const { usersFollow } = useContext(Context);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const whoReadingList = [];
  const whoNotReadingList = [];

  const textOnButtonFollow = (id) => {
    if (usersFollow.startFollowUser.id === id) {
      return "Following";
    }
    return "Follow";
  };
  const getUsersAndFollowigs = async () => {
    await getAllUsers().then((users) => user.setAllUsers(users));
    await getFollowingUser(user.user.id).then((allFollowing) =>
      usersFollow.setuserFollowing(allFollowing)
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

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  }, []);

  if (isLoading || user.allUsers.length === 0) {
    return spinner();
  }

  return (
    <ul className="follow-page-main-users">
      {whoNotReadingList[0] ? (
        <>
          {whoNotReadingList.map((profile) => (
            <li className="follow-page-main-user" key={profile.id}>
              <div
                className="section-read-main-user-info"
                onClick={() => {
                  if (user.isAuth) {
                    navigate(PROFILE_PAGE_USER + profile.id);
                  } else {
                    navigate(TWITTER_USER_PAGE + profile.id);
                  }
                }}
              >
                <img src={getUserPhoto(profile)} alt="User" />
                <div className="section-read-main-user-name">
                  <p className="user-name">{profile.user_name}</p>
                  <p className="profile-name">{`@${profile.user_name}`}</p>
                </div>
              </div>
              {user.isAuth && (
                <button
                  className="follow-page-main-button-follow"
                  onClick={() => {
                    usersFollow.setStartFollowUser(profile);
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
        <p className="section-aside-hidden">You are following all users</p>
      )}
    </ul>
  );
});

export default ListWhoReadUserHomePage;
