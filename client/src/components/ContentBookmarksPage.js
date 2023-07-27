import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import spinner from "../utils/spinner";
import Twit from "./Twit";

import arrowLeft from "./Img/arrow_left_icon.png";

const ContentBookmarksPage = observer(() => {
  const { usersStore } = useContext(Context);
  const { favoriteTwitsStore } = useContext(Context);
  const navigate = useNavigate();

  if (favoriteTwitsStore.favoriteTwits.length === 0) return spinner();

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
          <p>@{usersStore.user.user_name}</p>
        </div>
      </div>
      <div className="twits">
        {favoriteTwitsStore.favoriteTwits ? (
          <>
            {favoriteTwitsStore.favoriteTwits.map((bookmark) => (
              <Twit twit={bookmark.Twit} key={bookmark.Twit.id} />
            ))}
          </>
        ) : (
          <p className="empty-twits">No twits</p>
        )}
      </div>
    </div>
  );
});

export default ContentBookmarksPage;
