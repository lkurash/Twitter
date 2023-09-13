import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../..";

import activeLike from "../Img/active_like.png";
import notactiveLike from "../Img/notactive_like.png";
import hoverLike from "../Img/hover_like.png";

import twitClient from "../../http/twitClient";
import TooltipUserNotAuth from "../common/TooltipUserNotAuth";
import getAuthUserID from "../../utils/getAuthUserID";

const ButtonLikeOnTwit = observer(({ twit }) => {
  const { twitsStore } = useContext(Context);
  const { usersStore } = useContext(Context);
  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);
  const authUserID = getAuthUserID();

  const createLikeTwit = async (twit) => {
    await twitClient.createLikeTwitByUser(authUserID, twit.id).then((like) => {
      twitClient
        .getCountLikes(twit.id)
        .then((twit) => twitsStore.addLikeTwit(twit, like));
    });
  };

  const hoverAndActiveButtonLike = (twit) => {
    if (twit.id === twitsStore.hoverTwitLike.id) {
      return hoverLike;
    }
    if (twit.id === twitsStore.likedTwit.id) {
      return activeLike;
    }
    return notactiveLike;
  };

  const disLikeButtonImg = (twit) => {
    if (twit.id === twitsStore.dislikeTwit.id) {
      return notactiveLike;
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
            src={disLikeButtonImg(twit)}
            onMouseEnter={() => twitsStore.sethoverTwitLike(twit)}
            onMouseLeave={() => twitsStore.sethoverTwitLike({})}
            onClick={() => {
              createLikeTwit(twit);
              twitsStore.setDislikeTwit(twit);
              twitsStore.setLikedTwit({});
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
              if (usersStore.isAuth) {
                twitsStore.setLikedTwit(twit);
                twitsStore.setDislikeTwit({});
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
              src={hoverAndActiveButtonLike(twit)}
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

export default ButtonLikeOnTwit;
