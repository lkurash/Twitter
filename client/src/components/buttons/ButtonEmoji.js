import { useState } from "react";

import Emoji from "../common/Emoji";
import imgEmoji from "../Img/emoji_icon.png";

const ButtonEmoji = ({ addEmojiInTwitText }) => {
  const [emojiVisible, setEmojiVisible] = useState(false);

  const onClosePopUpEmoji = () => {
    setEmojiVisible(false);
  };

  return (
    <div>
      <img
        src={imgEmoji}
        alt="Emoji"
        className="twit-form-emoji"
        onClick={() => setEmojiVisible(true)}
      />
      {emojiVisible && (
        <Emoji
          emojiVisible={emojiVisible}
          addEmojiInTwitText={addEmojiInTwitText}
          onClosePopUpEmoji={onClosePopUpEmoji}
        />
      )}
    </div>
  );
};
export default ButtonEmoji;
