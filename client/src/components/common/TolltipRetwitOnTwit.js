import { useContext, useState } from "react";
import { Context } from "../..";
import { useNavigate } from "react-router-dom";

import userClient from "../../http/userClient";

import getAuthUserID from "../../utils/getAuthUserID";

import path from "../../utils/path";
import { PUBLIC_USER_PAGE_PATH, USER_PAGE_PATH } from "../../utils/constans";

import PreviewUserOnTwit from "./PreviewUserOnTwit";

import retwitIcon from "../Imgs/notactive_retweet_icon.png";

const TooltipRetwitOnTwit = ({ retwit, user }) => {
  const { usersStore } = useContext(Context);
  const { usersFollowingsStore } = useContext(Context);

  const [showProfileUser, setShowProfileUser] = useState(false);
  const navigate = useNavigate();

  const checkFollowing = async (id) => {
    await userClient.checkFollowing(id).then((following) => {
      usersFollowingsStore.setStartFollowUser(following);
    });
  };

  const onMouseLeave = () => {
    setTimeout(() => {
      setShowProfileUser(false);
    }, 200);
  };

  const onMouseEnter = () => {
    checkFollowing(user.id);
    setTimeout(() => {
      setShowProfileUser(true);
    }, 200);
  };

  return (
    <>
      {retwit && (
        <>
          {retwit.userId === getAuthUserID(usersStore) ? (
            <div className="twit-hint-about-retwit">
              <div className="twit-hint-about-retwit-img-text">
                <img
                  src={retwitIcon}
                  alt="Retwit"
                  className="twit-hint-about-retwit-img"
                />{" "}
                <p className="twit-hint-about-retwit-text">You retweeted</p>
              </div>
            </div>
          ) : (
            <>
              <div
                className="twit-hint-about-retwit"
                onMouseEnter={() => {
                  onMouseEnter(user);
                }}
                onMouseLeave={() => {
                  onMouseLeave();
                }}
              >
                <div
                  className="twit-hint-about-retwit-img-text"
                  onClick={() => {
                    if (usersStore.isAuth) {
                      navigate(path(USER_PAGE_PATH, user.id));
                    } else {
                      navigate(path(PUBLIC_USER_PAGE_PATH, user.id));
                    }
                  }}
                >
                  <img
                    src={retwitIcon}
                    alt="Retwit"
                    className="twit-hint-about-retwit-img"
                  />
                  <p className="twit-hint-about-retwit-text">
                    {user.user_name} retweeted
                  </p>
                </div>
                {showProfileUser && (
                  <PreviewUserOnTwit
                    user={user}
                    setShowProfileUser={setShowProfileUser}
                  />
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default TooltipRetwitOnTwit;
