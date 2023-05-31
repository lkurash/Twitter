import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Context } from "..";
import activeLike from "./Img/active_like.png";
import notactiveLike from "./Img/notactive_like.png";
import hoverLike from "./Img/hover_like.png";
import "./userTwitPanel.css";

import {
  createLikeTwitByUser,
  getAllTwits,
  getTwitsByUser,
} from "../http/twitsApi";
import { PROFILE_PAGE_USER } from "../utils/constans";

const ButtonLikeOnTwit = observer((props) => {
  const { twits } = useContext(Context);
  const { user } = useContext(Context);
  const location = useLocation().pathname;
  const { id } = useParams();
  const userLikesTwitId = [];

  const getTwits = () => {
    getAllTwits().then((alltwits) => twits.setTwits(alltwits));

    if (location === PROFILE_PAGE_USER + user.user.id) {
      getTwitsByUser(user.user.id).then((twitsById) => twits.setUserTwits(twitsById));
    } else {
      getTwitsByUser(id).then((twitsById) => twits.setUserTwits(twitsById));
    }
  };

  const createLikeTwit = async (twit) => {
    const formData = new FormData();

    formData.append("TwitId", twit.id);
    await createLikeTwitByUser(formData);

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
  return (
    <div className="user-twit-panel-like">
      {!userLikesTwitId.includes(props.twit.id) ? (
        <div
          className="user-twit-panel-button-like"
          key={props.twit.id}
          onClick={() => {
            twits.setLikedTwit(props.twit);
            twits.setDislikeTwit({});
            createLikeTwit(props.twit);
          }}
          onMouseEnter={() => {
            twits.sethoverTwitLike(props.twit);
          }}
          onMouseLeave={() => twits.sethoverTwitLike({})}
        >
          <img src={imgButtonLike(props.twit)} alt="Like" />
        </div>
      ) : (
        <div className="user-twit-panel-button-like">
          <img
            alt="Like"
            key={props.twit.id}
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
