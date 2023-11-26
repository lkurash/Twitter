import { observer } from "mobx-react-lite";
import { useContext, useRef, useState } from "react";
import { Context } from "../..";

import { useDispatch } from "react-redux";
import { tweetOptionsActions } from "../../redux/tweetOptions/tweetOptions.actions";

import useOutsideClick from "../../utils/useOutsideClickFunction";

import dotMenu from "../Imgs/more_dots_icon.png";
import deleteIcon from "../Imgs/delete_trash_icon.png";

const DeleteTwitButton = observer(({ twit }) => {
  const dispatch = useDispatch();
  const { infoMessageStore } = useContext(Context);
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
  const [deleteMessageVisible, setDeleteMessageVisible] = useState(false);
  const tooltipDeleteTwit = useRef(null);

  const deleteTwit = (twit) => {
    dispatch(tweetOptionsActions.deleteTweet(twit.id));
    infoMessageStore.setTextMessage("Tweet has been deleted.");
    infoMessageStore.setInfoMessageVisible(true);
  };

  const onClose = () => {
    setDeleteButtonVisible(false);
    setDeleteMessageVisible(false);
  };

  useOutsideClick(tooltipDeleteTwit, onClose, deleteButtonVisible);

  return (
    <div className="button-dotmenu-twit">
      {deleteButtonVisible && (
        <div
          ref={tooltipDeleteTwit}
          className="tooltip-delete-twit"
          onClick={() => {
            setDeleteButtonVisible(false);
            setDeleteMessageVisible(true);
          }}
        >
          <button className="button-delete-twit" type="reset">
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
        <div className="message-page-delete-twit">
          <div
            className="message-delete-twit wrapper-border"
            ref={tooltipDeleteTwit}
          >
            <span className="message-delete-twit-title">Delete post?</span>
            <p className="message-delete-twit-text">
              This action cannot be undone and the post will be permanently
              removed from your profile, all your followers' feeds, and search
              results.
            </p>
            <div className="message-delete-twit-buttons">
              <button
                type="button"
                className="message-delete-twit-button button-delete"
                onClick={() => {
                  deleteTwit(twit);
                  setDeleteMessageVisible(false);
                }}
              >
                Delete
              </button>
              <button
                type="button"
                className="message-delete-twit-button button-cancel"
                onClick={() => setDeleteMessageVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default DeleteTwitButton;
