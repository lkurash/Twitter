import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

import spinner from "../utils/spinner";
import Twit from "./Twit";

const ProfilePageLikes = observer(() => {
  const { twitsStore } = useContext(Context);
  const { usersStore } = useContext(Context);

  const userLikesTwits = [];

  const getUserLikesTwits = () => {
    if (twitsStore.twits) {
      twitsStore.twits.map((twit) => {
        twit.Likes.forEach((like) => {
          if (like.UserId === usersStore.userPage.id) {
            userLikesTwits.push(twit);
          }
        });
      });
    }
  };

  getUserLikesTwits();

  if (twitsStore.twits.length === 0) return spinner();

  return (
    <div className="twits">
      {userLikesTwits.map((twit) => (
        <Twit twit={twit} key={twit.id} />
      ))}
      {userLikesTwits.length === 0 && <p className="empty-twits">No twits</p>}
    </div>
  );
});

export default ProfilePageLikes;
