import { useContext, useState } from "react";
import { Context } from "../..";

import getAuthUserID from "../../utils/getAuthUserID";

import retwitIcon from "../Img/notactive_retweet_icon.png";
import { useNavigate } from "react-router-dom";
import path from "../../utils/path";
import { PUBLIC_USER_PAGE_PATH, USER_PAGE_PATH } from "../../utils/constans";
import userClient from "../../http/userClient";
import PreviewUserOnTwit from "./PreviewUserOnTwit";

const TooltipRetwitOnTwit = ({ retwit, user }) => {
  const { usersStore } = useContext(Context);
  const [showProfileUser, setShowProfileUser] = useState(false);
  const { usersFollowingsStore } = useContext(Context);
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
              <div className="twit-hint-about-retwit">
                <div
                  className="twit-hint-about-retwit-img-text"
                  onMouseEnter={() => {
                    onMouseEnter(user);
                  }}
                  onMouseLeave={() => {
                    onMouseLeave();
                  }}
                  onClick={() => {
                    if (usersStore.isAuth) {
                      navigate(path(USER_PAGE_PATH, retwit.user.id));
                    } else {
                      navigate(path(PUBLIC_USER_PAGE_PATH, retwit.user.id));
                    }
                  }}
                >
                  <img
                    src={retwitIcon}
                    alt="Retwit"
                    className="twit-hint-about-retwit-img"
                  />
                  <p className="twit-hint-about-retwit-text">
                    {retwit.user.user_name} retweeted
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
