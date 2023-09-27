import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import spinner from "../utils/spinner";

import Twit from "./Twit";

import arrowLeft from "./Img/arrow_left_icon.png";
import ButtonShowMoreTwits from "./buttons/ButtonShowMoreTwits";
import twitClient from "../http/twitClient";
import getAuthUserID from "../utils/getAuthUserID";

const ContentBookmarksPage = observer(() => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const authUserID = getAuthUserID(usersStore);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  });

  return (
    <div className="main-content-block">
      <div className="main-stiky-panel users-page-stiky-panel">
        <div
          className="main-search-block-button-return"
          onClick={() => navigate(-1)}
        >
          <img src={arrowLeft} alt="Button return" />
        </div>
        <div className="main-page-name">
          <h2>Bookmarks</h2>
          <p>@{usersStore.user.user_name}</p>
        </div>
      </div>
      {isLoading || twitsStore.twits.length === 0 ? (
        spinner()
      ) : (
        <>
          <div className="twits">
            {twitsStore.twits ? (
              twitsStore.twits.map((bookmark) => (
                <Twit twit={bookmark} key={bookmark.id} />
              ))
            ) : (
              <p className="twit-hint-about-lack-twits">No twits</p>
            )}
          </div>
          {twitsStore.twits.length >= 7 && (
            <ButtonShowMoreTwits
              getTwits={twitClient.getFavoriteTwits}
              userId={authUserID}
              store={twitsStore}
            />
          )}
        </>
      )}
    </div>
  );
});

export default ContentBookmarksPage;
