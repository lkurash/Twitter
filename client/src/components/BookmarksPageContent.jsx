import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { userProfile } from "../redux/user/user.selectors";
import { tweetActions } from "../redux/tweet/tweet.actions";
import { tweetsStore } from "../redux/tweet/tweet.selectors";

import spinner from "../utils/spinner";
import { loadingSetup } from "../utils/loadingSetup";

import Tweets from "./Tweets/Tweets";
import MainStikyPanel from "./MainStikyPanel";

const BookmarksPageContent = () => {
  const tweetsStoreSelector = useSelector(tweetsStore);
  const { tweets, loadingStatus, moreTweets } = useSelector(tweetsStore);
  const { profile } = useSelector(userProfile);
  const [isLoading, setIsLoading] = useState(false);
  const boundedSetup = loadingSetup.setup.bind(tweetsStoreSelector);

  const message = (
    <div className="lack-tweets-message">
      <h2>Save posts for later.</h2>
      <p>Bookmark posts to easily find them again in the future.</p>
    </div>
  );

  useEffect(() => {
    boundedSetup(setIsLoading);
  }, [loadingStatus]);

  return (
    <div className="main-content-block">
      {isLoading && spinner()}
      {loadingStatus === "COMPLETE" && (
        <>
          <MainStikyPanel
            pageName={"Bookmarks"}
            userName={profile.user_name}
            arrowVisible={true}
          />
          <Tweets
            tweets={tweets}
            moreTweets={moreTweets}
            message={message}
            getMoreTweets={tweetActions.getMoreBookmarks}
            userId={profile.id}
          />
        </>
      )}
    </div>
  );
};

export default BookmarksPageContent;
