import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../..";

import getAuthUserID from "../../utils/getAuthUserID";

import TooltipUserNotAuth from "../common/TooltipUserNotAuth";

import activeBookmark from "../Imgs/active_bookmark_icon.png";
import notactiveBookmark from "../Imgs/notactive_bookmark_icon.png";
import hoverBookmark from "../Imgs/hover_bookmark.png";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../redux/user/user.selectors";
import { tweetOptionsActions } from "../../redux/tweetOptions/tweetOptions.actions";

const BookmarkButton = observer(({ twit }) => {
  const { isAuth } = useSelector(auth);
  const dispatch = useDispatch();
  const { favoriteTwitsStore } = useContext(Context);
  const { infoMessageStore } = useContext(Context);

  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);
  const authUserID = getAuthUserID();

  const createFavoriteTwits = async (twit) => {
    dispatch(tweetOptionsActions.createBookmark(authUserID, twit.id));

    infoMessageStore.setTextMessage("Added to your Bookmarks.");
    infoMessageStore.setInfoMessageVisible(true);
  };

  const deleteBookmark = async (twit) => {
    dispatch(tweetOptionsActions.deleteBookmark(authUserID, twit.id));

    infoMessageStore.setTextMessage("Removed from your Bookmarks.");
    infoMessageStore.setInfoMessageVisible(true);
  };

  const imgOnTwit = (twit) => {
    if (twit.id === favoriteTwitsStore.hoverTwitBookmark.id) {
      return hoverBookmark;
    }
    return notactiveBookmark;
  };

  const imgOnBookmark = (twit) => {
    if (twit.id === favoriteTwitsStore.hoverTwitBookmark.id) {
      return notactiveBookmark;
    }
    return activeBookmark;
  };

  const onCloseTooltip = () => {
    setTooltipUserNotAuth(false);
  };

  return (
    <div className="twit-action-bookmark">
      {!twit.authUserFavorite ? (
        <>
          <TooltipUserNotAuth
            tooltipUserNotAuth={tooltipUserNotAuth}
            onCloseTooltip={onCloseTooltip}
            bookmark
          />
          <div
            className="twit-action-button-bookmark"
            key={twit.id}
            onClick={() => {
              if (isAuth) {
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
              src={imgOnTwit(twit)}
              alt="Bookmark"
              className="twit-action-bookmark-img"
            />
          </div>
        </>
      ) : (
        <div
          className="twit-action-button-bookmark"
          key={twit.id}
          onClick={() => {
            deleteBookmark(twit);
          }}
          onMouseEnter={() => {
            favoriteTwitsStore.setHoverTwitBookmark(twit);
          }}
          onMouseLeave={() => favoriteTwitsStore.setHoverTwitBookmark({})}
        >
          <img
            src={imgOnBookmark(twit)}
            alt="Bookmark"
            className="twit-action-bookmark-img"
          />
        </div>
      )}
    </div>
  );
});

export default BookmarkButton;
