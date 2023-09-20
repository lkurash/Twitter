import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "..";

import twitClient from "../http/twitClient";

import getAuthUserID from "../utils/getAuthUserID";
import spinner from "../utils/spinner";

import Twits from "./Twits";
import ShowMoreTwitsButton from "./buttons/ShowMoreTwitsButton";

const ContentBookmarksPage = observer(() => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);

  const [isLoading, setIsLoading] = useState(true);

  const authUserID = getAuthUserID(usersStore);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  });

  return (
    <>
      <div className="main-stiky-panel users-page-stiky-panel">
        <div className="main-page-name">
          <h2>Bookmarks</h2>
          <p>@{usersStore.user.user_name}</p>
        </div>
      </div>
      {isLoading || twitsStore.twits.length === 0 ? (
        spinner()
      ) : (
        <>
          <Twits />
          {twitsStore.twits.length >= 7 && (
            <ShowMoreTwitsButton
              getTwits={twitClient.getFavoriteTwits}
              userId={authUserID}
              store={twitsStore}
            />
          )}
        </>
      )}
    </>
  );
});

export default ContentBookmarksPage;
