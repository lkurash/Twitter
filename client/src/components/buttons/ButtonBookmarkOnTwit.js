import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../..";

import twitsClient from "../../http/twitsClient";
import getAuthUserID from "../../utils/getAuthUserID";

import TooltipUserNotAuth from "../common/TooltipUserNotAuth";

import activeBookmark from "../Img/active_bookmark_icon.png";
import notactiveBookmark from "../Img/notactive_bookmark_icon.png";
import hoverBookmark from "../Img/hover_bookmark.png";

const ButtonBookmarkOnTwit = observer(({ twit }) => {
  const { favoriteTwitsStore } = useContext(Context);
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);
  const authUserID = getAuthUserID(usersStore);

  const createFavoriteTwits = async (twit) => {
    await twitsClient
      .createFavoriteTwitByUser(authUserID, twit.id)
      .then((bookmark) => {
        twitsStore.addFavoriteTwit(twit, bookmark);
      });
  };

  const hoverAndActiveButtonBookmark = (twit) => {
    if (twit.id === favoriteTwitsStore.hoverTwitBookmark.id) {
      return hoverBookmark;
    } else if (twit.id === favoriteTwitsStore.newTwitBookmark.id) {
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

  const onCloseTooltip = () => {
    setTooltipUserNotAuth(false);
  };

  return (
    <div className="user-twit-panel-bookmark">
      {!twit.authUserFavorite ? (
        <>
          <TooltipUserNotAuth
            tooltipUserNotAuth={tooltipUserNotAuth}
            onCloseTooltip={onCloseTooltip}
            bookmark
          />
          <div
            className="user-twit-panel-button-bookmark"
            key={twit.id}
            onClick={() => {
              if (usersStore.isAuth) {
                favoriteTwitsStore.setNewTwitBookmark(twit);
                createFavoriteTwits(twit);
              } else {
                setTooltipUserNotAuth(true);
              }
            }}
            onMouseEnter={() => {
              favoriteTwitsStore.setHoverTwitBookmark(twit);
            }}
            onMouseLeave={() => favoriteTwitsStore.setHoverTwitBookmark({})}
          >
            <img
              src={hoverAndActiveButtonBookmark(twit)}
              alt="Bookmark"
              className="user-twit-panel-bookmark-img"
            />
          </div>
        </>
      ) : (
        <div
          className="user-twit-panel-button-bookmark"
          key={twit.id}
          onClick={() => {
            favoriteTwitsStore.setNotActiveFavoriteTwit(twit);
            favoriteTwitsStore.setNewTwitBookmark({});
            createFavoriteTwits(twit);
          }}
          onMouseEnter={() => {
            favoriteTwitsStore.setHoverTwitBookmark(twit);
          }}
          onMouseLeave={() => favoriteTwitsStore.setHoverTwitBookmark({})}
        >
          <img
            src={notActiveButtonBookmark(twit)}
            alt="Bookmark"
            className="user-twit-panel-bookmark-img"
          />
        </div>
      )}
    </div>
  );
});

export default ButtonBookmarkOnTwit;
