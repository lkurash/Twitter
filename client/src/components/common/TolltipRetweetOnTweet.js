import { useState } from "react";
import { useNavigate } from "react-router-dom";

import getAuthUserID from "../../utils/getAuthUserID";

import path from "../../utils/path";
import { PUBLIC_USER_PAGE_PATH, USER_PAGE_PATH } from "../../utils/routs";

import PreviewUserOnTweet from "./PreviewUserOnTweet";

import retweetIcon from "../Imgs/notactive_retweet_icon.png";
import { auth } from "../../redux/user/user.selectors";
import { useSelector } from "react-redux";

const TooltipRetweetOnTweet = ({ retweet, user }) => {
  const { isAuth } = useSelector(auth);

  const [showProfileUser, setShowProfileUser] = useState(false);
  const navigate = useNavigate();

  const onMouseLeave = () => {
    setTimeout(() => {
      setShowProfileUser(false);
    }, 500);
  };

  const onMouseEnter = () => {
    setTimeout(() => {
      setShowProfileUser(true);
    }, 500);
  };

  return (
    <>
      {retweet && (
        <>
          {retweet.userId === getAuthUserID() ? (
            <div className="tweet-hint-about-retweet">
              <div className="tweet-hint-about-retweet-img-text">
                <img
                  src={retweetIcon}
                  alt="Retweet"
                  className="tweet-hint-about-retweet-img"
                />{" "}
                <p className="tweet-hint-about-retweet-text">You retweeted</p>
              </div>
            </div>
          ) : (
            <>
              <div
                className="tweet-hint-about-retweet"
                onMouseEnter={() => {
                  onMouseEnter(user);
                }}
                onMouseLeave={() => {
                  onMouseLeave();
                }}
              >
                <div
                  className="tweet-hint-about-retweet-img-text"
                  onClick={() => {
                    if (isAuth) {
                      navigate(path(USER_PAGE_PATH, user.id));
                    } else {
                      navigate(path(PUBLIC_USER_PAGE_PATH, user.id));
                    }
                  }}
                >
                  <img
                    src={retweetIcon}
                    alt="Retweet"
                    className="tweet-hint-about-retweet-img"
                  />
                  <p className="tweet-hint-about-retweet-text">
                    {user.user_name} retweeted
                  </p>
                </div>
                {showProfileUser && (
                  <PreviewUserOnTweet
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

export default TooltipRetweetOnTweet;
