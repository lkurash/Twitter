import LikeTweetButton from "../../buttons/LikeTweetButton";
import RetweetTweetButton from "../../buttons/RetweetTweetButton";
import RepliesButton from "../../buttons/RepliesButton";
import BookmarkButton from "../../buttons/BookmarkButton";

const TweetActions = ({ tweet, retweet }) => {
  return (
    <div className="tweet-action" key={tweet.id}>
      <RepliesButton tweet={tweet} />
      <RetweetTweetButton tweet={tweet} retweet={retweet} />
      <LikeTweetButton
        tweet={tweet}
        like={tweet.authUserLike}
        countLikes={tweet.countLikes}
      />
      <BookmarkButton tweet={tweet} bookmark={tweet.authUserFavorite} />
    </div>
  );
};

export default TweetActions;
