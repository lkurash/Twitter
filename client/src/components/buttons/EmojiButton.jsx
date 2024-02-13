import { useState } from "react";

import Emoji from "../common/Emoji";
import imgEmoji from "../Imgs/emoji_icon.png";

const EmojiButton = ({ addEmojiInTweetText }) => {
  const [emojiVisible, setEmojiVisible] = useState(false);

  const onClosePopUpEmoji = () => {
    setEmojiVisible(false);
  };

  return (
    <div>
      <img
        src={imgEmoji}
        alt="Emoji"
        className="tweet-form-emoji"
        onClick={() => setEmojiVisible(true)}
      />
      {emojiVisible && (
        <Emoji
          emojiVisible={emojiVisible}
          addEmojiInTweetText={addEmojiInTweetText}
          onClosePopUpEmoji={onClosePopUpEmoji}
        />
      )}
    </div>
  );
};
export default EmojiButton;
