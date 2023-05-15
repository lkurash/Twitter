import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Context } from "..";
import "./userTwitPanel.css";
import {
  createFavoriteTwitByUser,
  getAllTwits,
  getTwitsByUser,
} from "../hhtp/twitsApi";
import { PROFILE_PAGE_USER } from "../utils/constans";

import activeBookmark from "./Img/active_bookmark_icon.png";
import notactiveBookmark from "./Img/notactive_bookmark_icon.png";

const ButtonBookmarkOnTwit = observer((props) => {
  const { twits } = useContext(Context);
  const { user } = useContext(Context);
  const location = useLocation().pathname;
  const { id } = useParams();
  const userBookmarksTwitId = [];

  const getTwits = () => {
    getAllTwits().then((data) => twits.setTwits(data));

    if (location === PROFILE_PAGE_USER + user.user.id) {
      getTwitsByUser(user.user.id).then((data) => twits.setUserTwits(data));
    } else {
      getTwitsByUser(id).then((data) => twits.setUserTwits(data));
    }
  };

  const createFavoriteTwits = async (twit) => {
    const formData = new FormData();

    formData.append("twitId", twit.id);
    await createFavoriteTwitByUser(formData);
    getTwits();
  };

  const hoverAndActiveButtonBookmark = (twit) => {
    if (twit.id === twits.hoverTwitBookmark.id) {
      return activeBookmark;
    }
    if (twit.id === twits.favoriteTwit.id) {
      return activeBookmark;
    }
    return notactiveBookmark;
  };

  const notActiveButtonBookmark = (twit) => {
    if (twit.id === twits.deleteFavoriteTwit.id) {
      return notactiveBookmark;
    }
    return activeBookmark;
  };

  const getUserBookmarksTwitId = () => {
    twits.twits.map((twit) => {
      twit.favorite_twits.forEach((bookmark) => {
        if (
          bookmark.userId === user.userPage.id ||
          bookmark.userId === user.user.id
        ) {
          userBookmarksTwitId.push(twit.id);
        }
      });
    });
  };

  getUserBookmarksTwitId();

  return (
    <div className="user-twit-panel-bookmark">
      {!userBookmarksTwitId.includes(props.twit.id) ? (
        <div
          className="user-twit-panel-button-bookmark"
          key={props.twit.id}
          onClick={() => {
            twits.setFavoriteTwit(props.twit);
            createFavoriteTwits(props.twit);
          }}
          onMouseEnter={() => {
            twits.sethoverTwitBookmark(props.twit);
          }}
          onMouseLeave={() => twits.sethoverTwitBookmark({})}
        >
          <img src={hoverAndActiveButtonBookmark(props.twit)} alt="Bookmark" />
        </div>
      ) : (
        <div
          className="user-twit-panel-button-bookmark"
          key={props.twit.id}
          onClick={() => {
            twits.setDeleteFavoriteTwit(props.twit);
            twits.setFavoriteTwit({});
            createFavoriteTwits(props.twit);
          }}
          onMouseEnter={() => {
            twits.sethoverTwitBookmark(props.twit);
          }}
          onMouseLeave={() => twits.sethoverTwitBookmark({})}
        >
          <img src={notActiveButtonBookmark(props.twit)} alt="Bookmark" />
        </div>
      )}
    </div>
  );
});

export default ButtonBookmarkOnTwit;
