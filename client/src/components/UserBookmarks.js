import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import spinner from "../utils/spinner";
import arrowLeft from "./Img/arrow_left_icon.png";
import Twit from "./Twit";

const UserBookmarks = observer(() => {
  const { user } = useContext(Context);
  const { favoriteTwits } = useContext(Context);
  const navigate = useNavigate();

  if (favoriteTwits.favoriteTwits.length === 0) return spinner();

  return (
    <div className="user-main-content-block">
      <div className="page-name main-stiky-panel">
        <div
          className="main-search-block-button-return"
          onClick={() => navigate(-1)}
        >
          <img src={arrowLeft} alt="Button return" />
        </div>
        <div className="page-name-user-name">
          <h2>Bookmarks</h2>
          <p>@{user.user.user_name}</p>
        </div>
      </div>
      <div className="twits">
        {favoriteTwits.favoriteTwits.map((bookmark) => (
          <Twit twit={bookmark.Twit} key={bookmark.Twit.id} />
        ))}
        {favoriteTwits.favoriteTwits.length === 0 && (
          <p className="empty-twits">No twits</p>
        )}
      </div>
    </div>
  );
});

export default UserBookmarks;
