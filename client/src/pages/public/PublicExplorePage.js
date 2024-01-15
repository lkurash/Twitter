import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { useDispatch, useSelector } from "react-redux";
import { tweetActions } from "../../redux/tweet/tweet.actions";
import { tweetsStore } from "../../redux/tweet/tweet.selectors";

import MainSectionTrends from "../MainSectionTrends";
import Tweets from "../../components/Tweets/Tweets";

const PublicExplorePage = observer(() => {
  const dispatch = useDispatch();
  const { loadingStatus, tweets } = useSelector(tweetsStore);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(tweetActions.getTweets());

    if (loadingStatus === "PENDING" || isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, []);

  return (
    <div className="main-content">
      <MainSectionTrends
        className="section section-public-page trends"
        mainBlock={true}
      />
      <div className="main-line" />
      <Tweets
        message={
          <div className="lack-tweets-message">
            <h2>No tweets yet.</h2> <p>Write first.</p>
          </div>
        }
        getMoreTweets={tweetActions.getMoreTweets}
      />
    </div>
  );
});

export default PublicExplorePage;
