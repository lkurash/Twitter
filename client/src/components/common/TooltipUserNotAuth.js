import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { LOGIN_PAGE_PATH, SIGNUP_PAGE_PATH } from "../../utils/constans";
import useOutsideClick from "../../utils/useOutsideClickFunction";

import bookmarkImg from "../Img/tooltip_bookmark_heart_icon.png";
import likeImg from "../Img/active_like.png";
import retwitImg from "../Img/tooltip_retweet_icon.png";
import commentImg from "../Img/tooltip_comment_icon.png";
import logo from "../Img/logo_icon.png";
import close from "../Img/x_icon.png";

function TooltipUserNotAuth({
  tooltipUserNotAuth,
  onCloseTooltip,
  bookmark,
  like,
  retwit,
  comment,
  follow,
}) {
  const tooltipRef = useRef(null);
  const navigate = useNavigate();

  useOutsideClick(tooltipRef, onCloseTooltip, tooltipUserNotAuth);

  if (!tooltipUserNotAuth) return false;
  return (
    <div className="wrapper-tooltip-notauth-user">
      <div ref={tooltipRef} className="tooltip-notauth-user wrapper-border">
        <div className="tooltip-notauth-user-header">
          <div className="button-close" onClick={() => onCloseTooltip()}>
            <img src={close} alt="close-icon" className="close-icon" />
          </div>
        </div>
        {bookmark && (
          <img
            src={bookmarkImg}
            alt="Bookmark"
            className="tooltip-notauth-user-img"
          />
        )}
        {like && (
          <img src={likeImg} alt="Like" className="tooltip-notauth-user-img" />
        )}
        {retwit && (
          <img
            src={retwitImg}
            alt="Retwit"
            className="tooltip-notauth-user-img"
          />
        )}
        {comment && (
          <img
            src={commentImg}
            alt="Comment"
            className="tooltip-notauth-user-img"
          />
        )}
        {follow && (
          <img src={logo} alt="Lomment" className="tooltip-notauth-user-img" />
        )}
        <div className="tooltip-notauth-user-text">
          {bookmark && (
            <>
              <h2>Bookmark a Tweet to save it.</h2>
              <p>Join Twitter now</p>
            </>
          )}
          {like && (
            <>
              <h2>Like a Tweet to share the love.</h2>
              <p>
                Join Twitter now to let internet hall of fame know you like
                their Tweet.
              </p>
            </>
          )}
          {retwit && (
            <>
              <h2>Retweet to spread the word.</h2>
              <p>
                When you join Twitter, you can share internet hall of fame’s
                Tweet with your followers.
              </p>
            </>
          )}
          {comment && (
            <>
              <h2>Reply to join the conversation.</h2>
              <p>
                Once you’ve joined Twitter, you’ll be able to respond to
                internet hall of fame’s Tweet.
              </p>
            </>
          )}
          {follow && (
            <>
              <h2>Don’t miss what’s happening.</h2>
              <p>People on Twitter are the first to know.</p>
            </>
          )}
        </div>
        <button
          className="tooltip-notauth-user-button-login"
          type="button"
          onClick={() => navigate(LOGIN_PAGE_PATH)}
        >
          <span>Log in</span>
        </button>
        <button
          className="tooltip-notauth-user-button-signup"
          type="button"
          onClick={() => navigate(SIGNUP_PAGE_PATH)}
        >
          <span>Sign up</span>
        </button>
      </div>
    </div>
  );
}
export default TooltipUserNotAuth;
