import LikeTweetButton from "../../buttons/LikeTweetButton";
import RetweetTweetButton from "../../buttons/RetweetTweetButton";
import CommentButton from "../../buttons/CommentButton";
import BookmarkButton from "../../buttons/BookmarkButton";

const TweetActions = ({ tweet, retweet }) => {
  return (
    <div className="tweet-action" key={tweet.id}>
      <CommentButton tweet={tweet} />
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
