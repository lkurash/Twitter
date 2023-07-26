import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../..";

import activeLike from "../Img/active_like.png";
import notactiveLike from "../Img/notactive_like.png";
import hoverLike from "../Img/hover_like.png";
import "../userTwitPanel.css";

import {
  createLikeTwitByUser,
  getAllTwits,
  getCountLikes,
  getTwitsByUser,
} from "../../http/twitsApi";
import TooltipUserNotAuth from "../common/TooltipUserNotAuth";
import getAuthUserID from "../../utils/getAuthUserID";

const ButtonLikeOnTwit = observer((props) => {
  const { twitsStore } = useContext(Context);
  const { usersStore } = useContext(Context);
  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);
  const userLikesTwitId = [];
  const { id } = useParams();
  const authUserID = getAuthUserID(usersStore);

  const getTwits = async () => {
    await getAllTwits().then((alltwits) => twitsStore.setTwits(alltwits));

    if (id) {
      await getTwitsByUser(id).then((usersTwits) =>
        twitsStore.setUserTwits(usersTwits)
      );
    }
  };

  const createLikeTwit = async (twit) => {
    await createLikeTwitByUser(authUserID, twit.id);
    console.log(twit.id);
    await getCountLikes(twit.id);

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
      {!userLikesTwitId.includes(props.twit.id) ? (
        <>
          <TooltipUserNotAuth
            tooltipUserNotAuth={tooltipUserNotAuth}
            onCloseTooltip={onCloseTooltip}
            like
          />
          <div
            className="user-twit-panel-button-like"
            key={props.twit.id}
            onClick={() => {
              if (usersStore.isAuth) {
                twitsStore.setLikedTwit(props.twit);
                twitsStore.setDislikeTwit({});
                createLikeTwit(props.twit);
              } else {
                setTooltipUserNotAuth(true);
              }
            }}
            onMouseEnter={() => {
              twitsStore.sethoverTwitLike(props.twit);
            }}
            onMouseLeave={() => twitsStore.sethoverTwitLike({})}
          >
            <img
              src={hoverAndActiveButtonLike(props.twit)}
              alt="Like"
              className="user-twit-panel-like-img"
            />
          </div>
        </>
      ) : (
        <div className="user-twit-panel-button-like">
          <img
            alt="Like"
            key={props.twit.id}
            className="user-twit-panel-like-img"
            src={disLikeButtonImg(props.twit)}
            onMouseEnter={() => twitsStore.sethoverTwitLike(props.twit)}
            onMouseLeave={() => twitsStore.sethoverTwitLike({})}
            onClick={() => {
              createLikeTwit(props.twit);
              twitsStore.setDislikeTwit(props.twit);
              twitsStore.setLikedTwit({});
            }}
          />
        </div>
      )}
      <p className="user-twit-panel-count-like">
        {props.twit.Likes.length > 0 && props.twit.Likes.length}
      </p>
    </div>
  );
});

export default ButtonLikeOnTwit;
