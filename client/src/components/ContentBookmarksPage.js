import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import spinner from "../utils/spinner";

import { useSelector } from "react-redux";
import { tweetsStore } from "../redux/tweet/tweet.selectors";
import { userProfile } from "../redux/user/user.selectors";
import { tweetActions } from "../redux/tweet/tweet.actions";

import Tweets from "./Tweets/Tweets";
import ShowMoreTweetsButton from "./buttons/ShowMoreTweetsButton";

const ContentBookmarksPage = observer(() => {
  const { tweets, loadingStatus } = useSelector(tweetsStore);
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
          <Tweets
            message={
              <div className="lack-tweets-message">
                <h2>Save posts for later.</h2>{" "}
                <p>Bookmark posts to easily find them again in the future.</p>
              </div>
            }
          />
          {tweets && tweets.length >= 7 && (
            <ShowMoreTweetsButton
              getTweets={tweetActions.getMoreBookmarks}
              userId={profile.id}
              store={tweetsStore}
            />
          )}
        </>
      )}
    </>
  );
});

export default ContentBookmarksPage;
