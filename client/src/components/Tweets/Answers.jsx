import { Fragment } from "react";

import { useSelector } from "react-redux";
import { tweetActions } from "../../redux/tweet/tweet.actions";
import { userProfileById } from "../../redux/user/user.selectors";

import ShowMoreTweetsButton from "../buttons/ShowMoreTweetsButton";
import Answer from "./Answer";

const Answers = ({ moreTweets, tweets }) => {
  const { profile } = useSelector(userProfileById);

  return (
    <>
      <>
        {tweets.map(({ Comment, Tweet }) => (
          <Answer key={Comment.id} tweet={Tweet} comment={Comment} />
        ))}
        {moreTweets && (
          <ShowMoreTweetsButton
            getTweets={tweetActions.getMoreAnswers}
            userId={profile.id}
          />
        )}
      </>
      )}
      <>
        {tweets.length === 0 && (
          <div className="tweet-hint-about-lack-tweets">
            <div className="lack-tweets-message">
              <h2>No tweets yet.</h2> <p>Write first.</p>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default Answers;
