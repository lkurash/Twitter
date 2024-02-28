import { Fragment } from "react";

import UserPhoto from "./Tweet/UserPhoto";
import UserName from "./Tweet/UserName";
import TweetDesc from "./Tweet/TweetDesc";

const Answer = ({ comment, tweet }) => {
  return (
    <Fragment key={comment.id}>
      <div className="tweet" key={comment.id}>
        <div className="content-block">
          <div className="user-block-comment">
            <div className="comment-tweet-info-block-connection-photo">
              <UserPhoto user={tweet.userOriginalTweets} />
              <div className="comment-line" />
              <UserPhoto user={comment.user} />
            </div>
            <div className="comment-desc">
              <UserName user={tweet.userOriginalTweets} />
              <TweetDesc tweet={tweet} />
              {!tweet.img && (
                <div className="comment-tweet-info-block-connection-text" />
              )}
              <UserName user={comment.user} />
              <TweetDesc tweet={comment} />
            </div>
          </div>
        </div>
      </div>
      <div className="main-line" />
    </Fragment>
  );
};
export default Answer;
