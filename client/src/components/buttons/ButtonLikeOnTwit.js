import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../..";

import activeLike from "../Img/active_like.png";
import notactiveLike from "../Img/notactive_like.png";
import hoverLike from "../Img/hover_like.png";
import "../userTwitPanel.css";

import twitsApi from "../../http/twitsApi";
import TooltipUserNotAuth from "../common/TooltipUserNotAuth";
import getAuthUserID from "../../utils/getAuthUserID";

const ButtonLikeOnTwit = observer(({twit}) => {
  const { twitsStore } = useContext(Context);
  const { usersStore } = useContext(Context);
  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);
  const userLikesTwitId = [];
  const { id } = useParams();
  const authUserID = getAuthUserID(usersStore);

  const getTwits = async () => {
    await twitsApi
      .getAllTwits()
      .then((alltwits) => twitsStore.setTwits(alltwits));

    if (id) {
      await twitsApi
        .getTwitsByUser(id)
        .then((usersTwits) => twitsStore.setUserTwits(usersTwits));
    }
  };

  const createLikeTwit = async (twit) => {
    await twitsApi.createLikeTwitByUser(authUserID, twit.id).then((twit)=>console.log(twit))
    await twitsApi.getCountLikes(twit.id);

    getTwits();
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

  const getUserLikesTwitId = () => {
    twitsStore.twits.map((twit) => {
      twit.Likes.forEach((like) => {
        if (like.UserId === usersStore.user.id) {
          userLikesTwitId.push(twit.id);
        }
      });
    });
  };

  getUserLikesTwitId();

  const onCloseTooltip = () => {
    setTooltipUserNotAuth(false);
  };

  return (
    <div className="user-twit-panel-like">
      {!userLikesTwitId.includes(twit.id) ? (
        <>
          <TooltipUserNotAuth
            tooltipUserNotAuth={tooltipUserNotAuth}
            onCloseTooltip={onCloseTooltip}
            like
          />
          <div
            className="user-twit-panel-button-like"
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
              className="user-twit-panel-like-img"
            />
          </div>
        </>
      ) : (
        <div className="user-twit-panel-button-like">
          <img
            alt="Like"
            key={twit.id}
            className="user-twit-panel-like-img"
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
      )}
      <p className="user-twit-panel-count-like">
        {twit.countLikes > 0 && twit.countLikes}
      </p>
    </div>
  );
});

export default ButtonLikeOnTwit;
