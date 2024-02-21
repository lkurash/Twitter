import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { tweetActions } from "../../redux/tweet/tweet.actions";

import MainSectionTrends from "../MainSectionTrends";
import ExploreTweets from "../../components/Tweets/ExploreTweets";

const PublicExplorePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tweetActions.getTweets());
  }, []);

  return (
    <div className="main-content" data-testid="explore-page">
      <MainSectionTrends
        className="section section-public-page trends"
        mainBlock={true}
      />
      <div className="main-line" />
      <ExploreTweets />
    </div>
  );
};

export default PublicExplorePage;
