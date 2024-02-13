import { Fragment } from "react";

import getAuthUserID from "../../../utils/getAuthUserID";
import UserPhoto from "./UserPhoto";
import UserName from "./UserName";
import TweetDesc from "./TweetDesc";
import TooltipRetweetOnTweet from "../../common/TolltipRetweetOnTweet";
import DeleteTweetButton from "../../buttons/DeleteTweetButton";
import TweetActions from "./TweetActions";

import "./tweetActions.css";
import "./tweet.css";
import dot from "../../Imgs/dot_icon.png";

const Tweet = ({ tweet, userInfo, retweet }) => {
  const authUserID = getAuthUserID();

  const isRetweet = (tweet) => {
    if (tweet.retweet && tweet.userId === authUserID) {
      return true;
    } else {
      return tweet.authUserRetweets;
    }
  };

  return (
    <>
      <div className="tweet-block">
        {retweet && (
          <TooltipRetweetOnTweet
            retweet={tweet}
            key={`tooltip-${tweet.id}`}
            user={tweet.userOriginalTweets}
          />
        )}
        <div className="tweet-content">
          <UserPhoto tweet={tweet} user={userInfo} />
          <div className="tweet-info">
            <div className="tweet-user-name-and-data">
              <UserName tweet={tweet} user={userInfo} />
              <img src={dot} alt="Dot" className="dot-tweet" />

              <p className="tweet-data">{tweet.tweet_createDate}</p>
            </div>
            <TweetDesc tweet={tweet} user={userInfo} />
          </div>
          <div className="button-dotmenu-tweet">
            {authUserID === tweet.userId && (
              <DeleteTweetButton tweet={tweet} key={`button-${tweet.id}`} />
            )}
          </div>
        </div>
        <TweetActions tweet={tweet} retweet={isRetweet(tweet)} />
      </div>
      <div className="main-line" />
    </>
  );
};
export default Tweet;
