import { Fragment } from "react";

import ShowMoreTweetsButton from "../buttons/ShowMoreTweetsButton";
import TweetDesc from "./Tweet/TweetDesc";
import UserName from "./Tweet/UserName";
import UserPhoto from "./Tweet/UserPhoto";
import { tweetsStore } from "../../redux/tweet/tweet.selectors";
import { useSelector } from "react-redux";
import { tweetActions } from "../../redux/tweet/tweet.actions";
import { userProfileById } from "../../redux/user/user.selectors";

const UserComments = () => {
  const { tweets, loadingStatus } = useSelector(tweetsStore);
  const { profile } = useSelector(userProfileById);

  if (tweets === null) {
    return null;
  }

  return (
    <>
      {tweets && loadingStatus === "COMPLETE" && (
        <>
          {tweets.map(({ Comment, Tweet }) => (
            <Fragment key={Comment.id}>
              <div className="tweet" key={Comment.id}>
                <div className="content-block">
                  <div className="user-block-comment">
                    <div className="comment-tweet-info-block-connection-photo">
                      <UserPhoto user={Tweet.userOriginalTweets} />
                      <div className="comment-line" />
                      <UserPhoto user={Comment.user} />
                    </div>
                    <div className="comment-desc">
                      <UserName user={Tweet.userOriginalTweets} />
                      <TweetDesc tweet={Tweet} />
                      {!Tweet.img && (
                        <div className="comment-tweet-info-block-connection-text" />
                      )}
                      <UserName user={Comment.user} />
                      <TweetDesc tweet={Comment} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-line" />
            </Fragment>
          ))}
          {tweets && tweets.length >= 7 && (
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

export default UserComments;
