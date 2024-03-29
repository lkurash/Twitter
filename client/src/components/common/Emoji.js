import EmojiPicker from "emoji-picker-react";
import { useRef } from "react";

import useOutsideClick from "../../utils/useOutsideClickFunction";

const Emoji = ({ emojiVisible, addEmojiInTweetText, onClosePopUpEmoji }) => {
  const popUpRef = useRef(null);

  useOutsideClick(popUpRef, onClosePopUpEmoji, emojiVisible);

  return (
    <div className="popup-emoji" ref={popUpRef} id="emoji">
      <EmojiPicker
        height={500}
        width={350}
        onEmojiClick={addEmojiInTweetText}
        searchDisabled={true}
        emojiStyle={"google"}
      />
    </div>
  );
};
export default Emoji;
