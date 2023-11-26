import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { useDispatch, useSelector } from "react-redux";
import { tweetActions } from "../../redux/tweet/tweet.actions";
import { twitsStore } from "../../redux/tweet/tweet.selectors";

import spinner from "../../utils/spinner";

import Twits from "../../components/Twits";
import MainSectionTrends from "../../components/MainSectionTrends";
import ShowMoreTwitsButton from "../../components/buttons/ShowMoreTwitsButton";

const PublicExplorePage = observer(() => {
  const dispatch = useDispatch();
  const { loadingStatus, twits } = useSelector(twitsStore);

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
      {isLoading ? (
        <div className="twits">{spinner()}</div>
      ) : (
        <>
          <Twits />
          {twits && twits.length >= 7 && (
            <ShowMoreTwitsButton
              getTwits={tweetActions.getMoreTweets}
            />
          )}
        </>
      )}
    </div>
  );
});

export default PublicExplorePage;
