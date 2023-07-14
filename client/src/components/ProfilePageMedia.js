import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

import spinner from "../utils/spinner";
import Twit from "./Twit";

const ProfilePageMedia = observer(() => {
  const { twitsStore } = useContext(Context);

  const userTwitsWithMedia = [];

  const getUserTwitsWithMedia = () => {
    if (twitsStore.userTwits) {
      twitsStore.userTwits.map((twit) => {
        if (twit.img) {
          userTwitsWithMedia.push(twit);
        }
      });
    }
  };

  getUserTwitsWithMedia();

  if (twitsStore.userTwits.length === 0) return spinner();

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
