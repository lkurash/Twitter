import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import Twit from "./Twit";

const ProfilePageLikes = observer(() => {
  const { twits } = useContext(Context);
  const { user } = useContext(Context);

  const userLikesTwits = [];

  const getUserLikesTwits = () => {
    twits.twits.map((twit) => {
      twit.Likes.forEach((like) => {
        if (like.UserId === user.userPage.id) {
          userLikesTwits.push(twit);
        }
      });
    });
  };

  getUserLikesTwits();
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
