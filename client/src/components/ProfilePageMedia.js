import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import Twit from "./Twit";

const ProfilePageMedia = observer(() => {
  const { twits } = useContext(Context);

  const userTwitsWithMedia = [];

  const getUserTwitsWithMedia = () => {
    twits.userTwits.map((twit) => {
      if (twit.img) {
        userTwitsWithMedia.push(twit);
      }
    });
  };

  getUserTwitsWithMedia();
  return (
    <div className="twits">
      {userTwitsWithMedia.map((twit) => (
        <Twit twit={twit} key={twit.id} />
      ))}
      {userTwitsWithMedia.length === 0 && (
        <p className="empty-twits">No twits</p>
      )}
    </div>
  );
});

export default ProfilePageMedia;
