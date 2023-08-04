import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../..";

import twitsApi from "../../http/twitsApi";
import getAuthUserID from "../../utils/getAuthUserID";

import TooltipUserNotAuth from "../common/TooltipUserNotAuth";

import "../userTwitPanel.css";
import activeBookmark from "../Img/active_bookmark_icon.png";
import notactiveBookmark from "../Img/notactive_bookmark_icon.png";
import hoverBookmark from "../Img/hover_bookmark.png";

const ButtonBookmarkOnTwit = observer((props) => {
  const { twitsStore } = useContext(Context);
  const { favoriteTwitsStore } = useContext(Context);
  const { usersStore } = useContext(Context);
  const { id } = useParams();
  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);
  const userBookmarksTwitId = [];
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

  const createFavoriteTwits = async (twit) => {
    await twitsApi.createFavoriteTwitByUser(authUserID, twit.id);

    getTwits();
  };

  const hoverAndActiveButtonBookmark = (twit) => {
    if (twit.id === favoriteTwitsStore.hoverTwitBookmark.id) {
      return hoverBookmark;
    }
    if (twit.id === favoriteTwitsStore.setNewTwitBookmark.id) {
      return activeBookmark;
    }
    return notactiveBookmark;
  };

  const notActiveButtonBookmark = (twit) => {
    if (twit.id === favoriteTwitsStore.setNotActiveFavoriteTwit.id) {
      return notactiveBookmark;
    }
    return activeBookmark;
  };

  const getUserBookmarksTwitId = () => {
    twitsStore.twits.map((twit) => {
      twit.Favorite_twits.forEach((bookmark) => {
        if (bookmark.UserId === usersStore.user.id) {
          userBookmarksTwitId.push(twit.id);
        }
      });
    });
  };

  getUserBookmarksTwitId();

  const onCloseTooltip = () => {
    setTooltipUserNotAuth(false);
  };

  return (
    <div className="user-twit-panel-bookmark">
      {!userBookmarksTwitId.includes(props.twit.id) ? (
        <>
          <TooltipUserNotAuth
            tooltipUserNotAuth={tooltipUserNotAuth}
            onCloseTooltip={onCloseTooltip}
            bookmark
          />
          <div
            className="user-twit-panel-button-bookmark"
            key={props.twit.id}
            onClick={() => {
              if (usersStore.isAuth) {
                favoriteTwitsStore.setNewTwitBookmark(props.twit);
                createFavoriteTwits(props.twit);
              } else {
                setTooltipUserNotAuth(true);
              }
            }}
            onMouseEnter={() => {
              favoriteTwitsStore.setHoverTwitBookmark(props.twit);
            }}
            onMouseLeave={() => favoriteTwitsStore.setHoverTwitBookmark({})}
          >
            <img
              src={hoverAndActiveButtonBookmark(props.twit)}
              alt="Bookmark"
              className="user-twit-panel-bookmark-img"
            />
          </div>
        </>
      ) : (
        <div
          className="user-twit-panel-button-bookmark"
          key={props.twit.id}
          onClick={() => {
            favoriteTwitsStore.setNotActiveFavoriteTwit(props.twit);
            favoriteTwitsStore.setNewTwitBookmark({});
            createFavoriteTwits(props.twit);
          }}
          onMouseEnter={() => {
            favoriteTwitsStore.setHoverTwitBookmark(props.twit);
          }}
          onMouseLeave={() => favoriteTwitsStore.setHoverTwitBookmark({})}
        >
          <img
            src={notActiveButtonBookmark(props.twit)}
            alt="Bookmark"
            className="user-twit-panel-bookmark-img"
          />
        </div>
      )}
    </div>
  );
});

export default ButtonBookmarkOnTwit;
