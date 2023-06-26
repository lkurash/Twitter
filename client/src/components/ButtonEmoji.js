import { useState } from "react";
import Emoji from "./common/Emoji";
import imgEmoji from "./Img/emoji_icon.png";

const ButtonEmoji = ({ addEmojiInTwitText }) => {
  const [showEmoji, setshowEmoji] = useState(false);

  const onClosePopUpEmoji = () => {
    setshowEmoji(false);
  };

  return (
    <>
      <label htmlFor="emoji">
        <img
          src={imgEmoji}
          alt="Emoji"
          className="twit-form-emoji"
          onClick={() => setshowEmoji(true)}
        />
      </label>
      <Emoji
        showEmoji={showEmoji}
        addEmojiInTwitText={addEmojiInTwitText}
        onClosePopUpEmoji={onClosePopUpEmoji}
      />
    </>
  );
};
export default ButtonEmoji;
