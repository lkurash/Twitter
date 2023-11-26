import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../..";

import getAuthUserID from "../../utils/getAuthUserID";

import TooltipUserNotAuth from "../common/TooltipUserNotAuth";

import activeLike from "../Imgs/active_like.png";
import notactiveLike from "../Imgs/notactive_like.png";
import hoverLike from "../Imgs/hover_like.png";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../redux/user/user.selectors";
import { tweetOptionsActions } from "../../redux/tweetOptions/tweetOptions.actions";

const LikeTwitButton = observer(({ twit }) => {
  const { isAuth } = useSelector(auth);
  const dispatch = useDispatch();
  const { twitsStore } = useContext(Context);
  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);
  const authUserID = getAuthUserID();

  const createLikeTwit = (twit) => {
    dispatch(tweetOptionsActions.createLike(authUserID, twit.id));
  };

  const dislikeTwit = (twit) => {
    dispatch(tweetOptionsActions.deleteLike(authUserID, twit.id));
  };

  const imgOnTweet = (twit) => {
    if (twit.id === twitsStore.hoverTwitLike.id) {
      return hoverLike;
    }
    return notactiveLike;
  };

  const imgOnLikedTweet = (twit) => {
    if (twit.id === twitsStore.hoverTwitLike.id) {
      return hoverLike;
    }
    return activeLike;
  };

  const onCloseTooltip = () => {
    setTooltipUserNotAuth(false);
  };

  return (
    <div className="twit-action-like">
      {twit.authUserLike ? (
        <div className="twit-action-button-like">
          <img
            alt="Like"
            key={twit.id}
            className="twit-action-like-img"
            src={imgOnLikedTweet(twit)}
            onMouseEnter={() => {
              twitsStore.sethoverTwitLike(twit);
            }}
            onMouseLeave={() => twitsStore.sethoverTwitLike({})}
            onClick={() => {
              dislikeTwit(twit);
            }}
          />
        </div>
      ) : (
        <>
          <TooltipUserNotAuth
            tooltipUserNotAuth={tooltipUserNotAuth}
            onCloseTooltip={onCloseTooltip}
            like
          />
          <div
            className="twit-action-button-like"
            key={twit.id}
            onClick={() => {
              if (isAuth) {
                createLikeTwit(twit);
              } else {
                setTooltipUserNotAuth(true);
              }
            }}
            onMouseEnter={() => {
              twitsStore.sethoverTwitLike(twit);
            }}
            onMouseLeave={() => twitsStore.sethoverTwitLike({})}
          >
            <img
              src={imgOnTweet(twit)}
              alt="Like"
              className="twit-action-like-img"
            />
          </div>
        </>
      )}
      <p className="twit-action-count-like">
        {twit.countLikes > 0 && twit.countLikes}
      </p>
    </div>
  );
});

export default LikeTwitButton;
