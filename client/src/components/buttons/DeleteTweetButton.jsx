import { useRef, useState } from "react";

import useOutsideClick from "../../utils/useOutsideClickFunction";

import dotMenu from "../Imgs/more_dots_icon.png";
import deleteIcon from "../Imgs/delete_trash_icon.png";
import DeleteTweetConfirmation from "../forms/DeleteTweetConfirmation";

const DeleteTweetButton = ({ tweet }) => {
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
  const [deleteTweetFormVisible, setDeleteTweetFormVisible] = useState(false);
  const tooltipDeleteTweet = useRef(null);

  const onClose = () => {
    setDeleteButtonVisible(false);
    setDeleteTweetFormVisible(false);
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
            setDeleteTweetFormVisible(true);
          }}
        >
          <button className="button-delete-tweet" type="reset" data-testid='delete'>
            <img alt="Delete" src={deleteIcon} className="delete-icon" />
            <span>Delete</span>
          </button>
        </div>
      )}
      <div
        className="dotmenu"
        data-testid="delete-tweet-button"
        onClick={() => {
          setDeleteButtonVisible(true);
        }}
      >
        <img src={dotMenu} alt="dot menu" className="dotmenu-icon" />
      </div>
      <DeleteTweetConfirmation
        tweet={tweet}
        deleteTweetFormVisible={deleteTweetFormVisible}
        setDeleteTweetFormVisible={setDeleteTweetFormVisible}
      />
    </>
  );
};

export default DeleteTweetButton;
