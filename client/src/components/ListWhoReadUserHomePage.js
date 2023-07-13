import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import { createFollowings, getAllUsers, getFollowingsUser } from "../http/userApi";
import { PROFILE_PAGE_USER, TWITTER_USER_PAGE } from "../utils/constans";
import getAuthUserID from "../utils/getAuthUserID";
import getUserPhoto from "../utils/getUserPhoto";
import spinner from "../utils/spinner";

const ListWhoReadUserHomePage = observer(() => {
  const { user } = useContext(Context);
  const { usersFollow } = useContext(Context);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const authUserID = getAuthUserID(user);
  const whoReadingList = [];
  const whoNotReadingList = [];

  const getUsersAndFollowigs = async () => {
    await getAllUsers().then((users) => user.setAllUsers(users));
    await getFollowingsUser(user.user.id).then((followings) =>
      usersFollow.setuserFollowing(followings)
    );
  };

  const createUserFollowings = async (profile) => {
    await createFollowings(authUserID, profile.id);
    getUsersAndFollowigs();
  };

  const chekFollowingsUser = () => {
    if (user.allUsers) {
      user.allUsers.forEach((allUser) => {
        whoReadingList.push(authUserID);
        allUser.Followings.forEach((followUser) => {
          if (authUserID === followUser.UserId) {
            whoReadingList.push(followUser.followUserId);
          }
        });
      });
    }
  };

  const createNotReadingList = () => {
    if (user.allUsers) {
      user.allUsers.forEach((allUser) => {
        if (!whoReadingList.includes(allUser.id)) {
          whoNotReadingList.push(allUser);
        }
      });
    }
  };

  chekFollowingsUser();
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
                    createUserFollowings(profile);
                  }}
                >
                  <span>Follow</span>
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
