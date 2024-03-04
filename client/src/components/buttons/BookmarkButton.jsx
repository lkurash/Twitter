import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../redux/user/user.selectors";
import { tweetOptionsActions } from "../../redux/tweet/tweetOptions/tweetOptions.actions";
import { buttonsStateStore } from "../../redux/buttons/buttons.selectors";
import {
  setBookmarkedTweet,
  setHoverBookmarkTweet,
} from "../../redux/buttons/buttonsOnTweet";
import {
  setInfoMessageVisible,
  setTextMessage,
} from "../../redux/popupElements/infoMessage";

import getAuthUserID from "../../utils/getAuthUserID";

import TooltipUserNotAuth from "../common/TooltipUserNotAuth";

import activeBookmark from "../Imgs/active_bookmark_icon.png";
import notactiveBookmark from "../Imgs/notactive_bookmark_icon.png";
import hoverBookmark from "../Imgs/hover_bookmark.png";

const BookmarkButton = ({ tweet, bookmark }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(auth);
  const buttonState = useSelector(buttonsStateStore);

  const [tooltipUserNotAuth, setTooltipUserNotAuth] = useState(false);
  const authUserID = getAuthUserID();

  const createFavoriteTweets = async (tweet) => {
    dispatch(tweetOptionsActions.createBookmark(authUserID, tweet.id));

    dispatch(setTextMessage("Added to your Bookmarks."));
    dispatch(setInfoMessageVisible(true));
  };

  const deleteBookmark = async (tweet) => {
    dispatch(tweetOptionsActions.deleteBookmark(authUserID, tweet.id));
    dispatch(setTextMessage("Removed from your Bookmarks."));
    dispatch(setInfoMessageVisible(true));
  };

  const imgBookmarkButton = (tweet) => {
    if (tweet.id === buttonState.hoverBookmarkTweet.id) {
      return hoverBookmark;
    }

    if (bookmark) {
      if (tweet.id === buttonState.bookmarkedTweet.id) {
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
        dispatch(setBookmarkedTweet({ id: tweet.id }));
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
    <div className="tweet-action-bookmark" data-testid="bookmark-button">
      <TooltipUserNotAuth
        tooltipUserNotAuth={tooltipUserNotAuth}
        onCloseTooltip={onCloseTooltip}
        bookmark
      />
      <div
        className="tweet-action-button-bookmark"
        key={tweet.id}
        onClick={() => onClickBookmark(tweet)}
        onMouseEnter={() => dispatch(setHoverBookmarkTweet({ id: tweet.id }))}
        onMouseLeave={() => dispatch(setHoverBookmarkTweet({ id: null }))}
      >
        <img
          src={imgBookmarkButton(tweet)}
          alt="Bookmark"
          className="tweet-action-bookmark-img"
        />
      </div>
    </div>
  );
};

export default BookmarkButton;
