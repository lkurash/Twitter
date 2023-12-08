import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../..";

import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../redux/user/user.selectors";
import { tweetOptionsActions } from "../../redux/tweet/tweetOptions/tweetOptions.actions";

import getAuthUserID from "../../utils/getAuthUserID";

import TooltipUserNotAuth from "../common/TooltipUserNotAuth";

import activeBookmark from "../Imgs/active_bookmark_icon.png";
import notactiveBookmark from "../Imgs/notactive_bookmark_icon.png";
import hoverBookmark from "../Imgs/hover_bookmark.png";

const BookmarkButton = observer(({ tweet, bookmark }) => {
  const { isAuth } = useSelector(auth);
  const dispatch = useDispatch();
  const { favoriteTweetsStore } = useContext(Context);
  const { infoMessageStore } = useContext(Context);

  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);
  const authUserID = getAuthUserID();

  const createFavoriteTweets = async (tweet) => {
    dispatch(tweetOptionsActions.createBookmark(authUserID, tweet.id));

    infoMessageStore.setTextMessage("Added to your Bookmarks.");
    infoMessageStore.setInfoMessageVisible(true);
  };

  const deleteBookmark = async (tweet) => {
    dispatch(tweetOptionsActions.deleteBookmark(authUserID, tweet.id));

    infoMessageStore.setTextMessage("Removed from your Bookmarks.");
    infoMessageStore.setInfoMessageVisible(true);
  };

  const imgBookmarkButton = (tweet) => {
    if (tweet.id === favoriteTweetsStore.hoverTweetBookmark.id) {
      return hoverBookmark;
    }

    if (bookmark) {
      if (tweet.id === favoriteTweetsStore.tweetBookmark.id) {
        return activeBookmark;
      }
      return activeBookmark;
    } else {
      return notactiveBookmark;
    }
  };

  const onClickBookmark = () => {
    if (isAuth) {
      if (bookmark) {
        deleteBookmark(tweet);
      } else {
        favoriteTweetsStore.setTweetBookmark(tweet);
        createFavoriteTweets(tweet);
      }
    } else {
      setTooltipUserNotAuth(true);
    }
  };

  const onCloseTooltip = () => {
    setTooltipUserNotAuth(false);
  };

  return (
    <div className="tweet-action-bookmark">
      <TooltipUserNotAuth
        tooltipUserNotAuth={tooltipUserNotAuth}
        onCloseTooltip={onCloseTooltip}
        bookmark
      />
      <div
        className="tweet-action-button-bookmark"
        key={tweet.id}
        onClick={() => onClickBookmark(tweet)}
        onMouseEnter={() => favoriteTweetsStore.setHoverTweetBookmark(tweet)}
        onMouseLeave={() => favoriteTweetsStore.setHoverTweetBookmark({})}
      >
        <img
          src={imgBookmarkButton(tweet)}
          alt="Bookmark"
          className="tweet-action-bookmark-img"
        />
      </div>
    </div>
  );
});

export default BookmarkButton;
