import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import spinner from "../utils/spinner";

import Twits from "./Twits";
import ShowMoreTwitsButton from "./buttons/ShowMoreTwitsButton";
import { useSelector } from "react-redux";
import { twitsStore } from "../redux/tweet/tweet.selectors";
import { userProfile } from "../redux/user/user.selectors";
import { tweetActions } from "../redux/tweet/tweet.actions";

const ContentBookmarksPage = observer(() => {
  const { twits, loadingStatus } = useSelector(twitsStore);
  const { profile } = useSelector(userProfile);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loadingStatus === "PENDING") {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [loadingStatus]);

  return (
    <>
      <div className="main-stiky-panel users-page-stiky-panel">
        <div className="main-page-name">
          <h2>Bookmarks</h2>
          <p>@{profile.user_name}</p>
        </div>
      </div>
      {isLoading ? (
        spinner()
      ) : (
        <>
          <Twits />
          {twits && twits.length >= 7 && (
            <ShowMoreTwitsButton
              getTwits={tweetActions.getMoreBookmarks}
              userId={profile.id}
              store={twitsStore}
            />
          )}
        </>
      )}
    </>
  );
});

export default ContentBookmarksPage;
