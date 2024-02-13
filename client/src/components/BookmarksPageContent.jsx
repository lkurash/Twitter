import { useSelector } from "react-redux";
import { userProfile } from "../redux/user/user.selectors";
import { tweetActions } from "../redux/tweet/tweet.actions";

import Tweets from "./Tweets/Tweets";
import MainStikyPanel from "./MainStikyPanel";

const BookmarksPageContent = () => {
  const { profile } = useSelector(userProfile);

  const message = (
    <div className="lack-tweets-message">
      <h2>Save posts for later.</h2>
      <p>Bookmark posts to easily find them again in the future.</p>
    </div>
  );

  return (
    <>
      <MainStikyPanel pageName={"Bookmarks"} userName={profile.user_name} arrowVisible={true}/>
      <Tweets
        message={message}
        getMoreTweets={tweetActions.getMoreBookmarks}
        userId={profile.id}
      />
    </>
  );
};

export default BookmarksPageContent;
