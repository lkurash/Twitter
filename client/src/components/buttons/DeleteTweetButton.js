import { observer } from "mobx-react-lite";
import { useContext, useRef, useState } from "react";
import { Context } from "../..";

import { useDispatch } from "react-redux";
import { tweetOptionsActions } from "../../redux/tweet/tweetOptions/tweetOptions.actions";

import useOutsideClick from "../../utils/useOutsideClickFunction";

import dotMenu from "../Imgs/more_dots_icon.png";
import deleteIcon from "../Imgs/delete_trash_icon.png";


const DeleteTweetButton = observer(({ tweet }) => {
  const dispatch = useDispatch();
  const { infoMessageStore } = useContext(Context);
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
  const [deleteMessageVisible, setDeleteMessageVisible] = useState(false);
  const tooltipDeleteTweet = useRef(null);

  const deleteTweet = (tweet) => {
    dispatch(tweetOptionsActions.deleteTweet(tweet.id));
    infoMessageStore.setTextMessage("Tweet has been deleted.");
    infoMessageStore.setInfoMessageVisible(true);
  };

  const onClose = () => {
    setDeleteButtonVisible(false);
    setDeleteMessageVisible(false);
  };

  useOutsideClick(tooltipDeleteTweet, onClose, deleteButtonVisible);

  return (
    <>
      {deleteButtonVisible && (
        <div
          ref={tooltipDeleteTweet}
          className="tooltip-delete-tweet"
          onClick={() => {
            setDeleteButtonVisible(false);
            setDeleteMessageVisible(true);
          }}
        >
          <button className="button-delete-tweet" type="reset">
            <img alt="Delete" src={deleteIcon} className="delete-icon" />
            <span>Delete</span>
          </button>
        </div>
      )}
      <div
        className="dotmenu"
        onClick={() => {
          setDeleteButtonVisible(true);
        }}
      >
        <img src={dotMenu} alt="dot menu" className="dotmenu-icon" />
      </div>
      {deleteMessageVisible && (
        <div className="message-page-delete-tweet">
          <div
            className="message-delete-tweet wrapper-border"
            ref={tooltipDeleteTweet}
          >
            <span className="message-delete-tweet-title">Delete post?</span>
            <p className="message-delete-tweet-text">
              This action cannot be undone and the post will be permanently
              removed from your profile, all your followers' feeds, and search
              results.
            </p>
            <div className="message-delete-tweet-buttons">
              <button
                type="button"
                className="message-delete-tweet-button button-delete"
                onClick={() => {
                  deleteTweet(tweet);
                  setDeleteMessageVisible(false);
                }}
              >
                Delete
              </button>
              <button
                type="button"
                className="message-delete-tweet-button button-cancel"
                onClick={() => setDeleteMessageVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default DeleteTweetButton;
