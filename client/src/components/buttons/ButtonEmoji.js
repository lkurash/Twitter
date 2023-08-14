import { useState } from "react";

import Emoji from "../common/Emoji";
import imgEmoji from "../Img/emoji_icon.png";

const ButtonEmoji = ({ addEmojiInTwitText }) => {
  const [emojiVisible, setEmojiVisible] = useState(false);

  const onClosePopUpEmoji = () => {
    setEmojiVisible(false);
  };

  return (
    <>
      <label htmlFor="emoji">
        <img
          src={imgEmoji}
          alt="Emoji"
          className="twit-form-emoji"
          onClick={() => setEmojiVisible(true)}
        />
      </label>
      {emojiVisible && (
        <Emoji
          emojiVisible={emojiVisible}
          addEmojiInTwitText={addEmojiInTwitText}
          onClosePopUpEmoji={onClosePopUpEmoji}
        />
      )}
    </>
  );
};
export default ButtonEmoji;
