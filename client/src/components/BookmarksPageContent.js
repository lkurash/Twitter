import { observer } from "mobx-react-lite";

import { useSelector } from "react-redux";
import { userProfile } from "../redux/user/user.selectors";
import { tweetActions } from "../redux/tweet/tweet.actions";

import Tweets from "./Tweets/Tweets";

const BookmarksPageContent = observer(() => {
  const { profile } = useSelector(userProfile);

  const message = (
    <div className="lack-tweets-message">
      <h2>Save posts for later.</h2>
      <p>Bookmark posts to easily find them again in the future.</p>
    </div>
  );

  return (
    <>
      <div className="main-stiky-panel users-page-stiky-panel">
        <div className="main-page-name">
          <h2>Bookmarks</h2>
          <p>@{profile.user_name}</p>
        </div>
      </div>
      <Tweets
        message={message}
        getMoreTweets={tweetActions.getMoreBookmarks}
        userId={profile.id}
      />
    </>
  );
});

export default BookmarksPageContent;
