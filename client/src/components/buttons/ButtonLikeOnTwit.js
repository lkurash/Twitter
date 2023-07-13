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
  getTwitsByUser,
} from "../../http/twitsApi";
import TooltipUserNotAuth from "../common/TooltipUserNotAuth";
import getAuthUserID from "../../utils/getAuthUserID";

const ButtonLikeOnTwit = observer((props) => {
  const { twits } = useContext(Context);
  const { user } = useContext(Context);
  const userPage = useParams();
  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);
  const userLikesTwitId = [];
  const authUserID = getAuthUserID(user);

  const getTwits = () => {
    getAllTwits().then((alltwits) => twits.setTwits(alltwits));

    if (user.isAuth) {

      getTwitsByUser(authUserID).then((usersTwits) =>
        twits.setUserTwits(usersTwits)
      );
    } else {
      getTwitsByUser(userPage.id).then((usersTwits) =>
        twits.setUserTwits(usersTwits)
      );
    }
  };

  const createLikeTwit = async (twit) => {
    
    await createLikeTwitByUser(authUserID, twit.id);

    getTwits();
  };

  const imgButtonLike = (twit) => {
    if (twit.id === twits.hoverTwitLike.id) {
      return hoverLike;
    }
    if (twit.id === twits.likedTwit.id) {
      return activeLike;
    }
    return notactiveLike;
  };

  const disLikeButtonImg = (twit) => {
    if (twit.id === twits.dislikeTwit.id) {
      return notactiveLike;
    }
    return activeLike;
  };

  const getUserLikesTwitId = () => {
    twits.twits.map((twit) => {
      twit.Likes.forEach((like) => {
        if (like.UserId === user.user.id) {
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
              if (user.isAuth) {
                twits.setLikedTwit(props.twit);
                twits.setDislikeTwit({});
                createLikeTwit(props.twit);
              } else {
                setTooltipUserNotAuth(true);
              }
            }}
            onMouseEnter={() => {
              twits.sethoverTwitLike(props.twit);
            }}
            onMouseLeave={() => twits.sethoverTwitLike({})}
          >
            <img
              src={imgButtonLike(props.twit)}
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
            onMouseEnter={() => twits.sethoverTwitLike(props.twit)}
            onMouseLeave={() => twits.sethoverTwitLike({})}
            onClick={() => {
              createLikeTwit(props.twit);
              twits.setDislikeTwit(props.twit);
              twits.setLikedTwit({});
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
