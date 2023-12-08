import { useContext, useRef } from "react";
import useOutsideClick from "../../utils/useOutsideClickFunction";

import bookmarkImg from "../Imgs/tooltip_bookmark_heart_icon.png";
import likeImg from "../Imgs/active_like.png";
import retweetImg from "../Imgs/tooltip_retweet_icon.png";
import commentImg from "../Imgs/tooltip_comment_icon.png";
import logo from "../Imgs/logo_icon.png";
import close from "../Imgs/x_icon.png";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const TooltipUserNotAuth = observer(
  ({
    tooltipUserNotAuth,
    onCloseTooltip,
    bookmark,
    like,
    retweet,
    comment,
    follow,
  }) => {
    const { visiblePopUpStore } = useContext(Context);
    const tooltipRef = useRef(null);

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
            <img
              src={likeImg}
              alt="Like"
              className="tooltip-notauth-user-img"
            />
          )}
          {retweet && (
            <img
              src={retweetImg}
              alt="Retweet"
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
            <img
              src={logo}
              alt="Lomment"
              className="tooltip-notauth-user-img"
            />
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
            {retweet && (
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
            onClick={() => {
              onCloseTooltip();
              visiblePopUpStore.setLoginPageVisible(true);
            }}
          >
            <span>Log in</span>
          </button>
          <button
            className="tooltip-notauth-user-button-signup"
            type="button"
            onClick={() => {
              onCloseTooltip();
              visiblePopUpStore.setSignPageUpVisible(true);
            }}
          >
            <span>Sign up</span>
          </button>
        </div>
      </div>
    );
  }
);
export default TooltipUserNotAuth;
