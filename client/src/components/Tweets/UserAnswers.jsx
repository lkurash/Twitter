import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { tweetsStore } from "../../redux/tweet/tweet.selectors";
import { loadingSetup } from "../../utils/loadingSetup";

import spinner from "../../utils/spinner";

import Answers from "./Answers";

const UserAnswers = () => {
  const tweetsStoreSelector = useSelector(tweetsStore);
  const { tweets, loadingStatus, moreTweets } = useSelector(tweetsStore);
  const [isLoading, setIsLoading] = useState(false);
  const boundedSetup = loadingSetup.setup.bind(tweetsStoreSelector);

  useEffect(() => {
    boundedSetup(setIsLoading);
  }, [loadingStatus]);

  return (
    <>
      {isLoading && spinner()}
      {loadingStatus === "COMPLETE" && (
        <Answers tweets={tweets} moreTweets={moreTweets} />
      )}
    </>
  );
};
export default UserAnswers;
