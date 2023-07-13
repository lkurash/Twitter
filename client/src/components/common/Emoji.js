import EmojiPicker from "emoji-picker-react";
import { useRef } from "react";

import useOutsideClick from "../../utils/useOutsideClickFunction";

const Emoji = ({ showEmoji, addEmojiInTwitText, onClosePopUpEmoji }) => {
  const popUpRef = useRef(null);

  useOutsideClick(popUpRef, onClosePopUpEmoji, showEmoji);

  if (!showEmoji) return null;
  return (
    <div className="popup-emoji" id="emoji" ref={popUpRef}>
      <EmojiPicker
        height={500}
        width={350}
        onEmojiClick={addEmojiInTwitText}
        searchDisabled={true}
        emojiStyle={"google"}
      />
    </div>
  );
};
export default Emoji;
