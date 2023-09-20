import LikeTwitButton from "../buttons/LikeTwitButton";
import RetwitTwitButton from "../buttons/RetwitTwitButton";
import CommentButton from "../buttons/CommentButton";
import BookmarkButton from "../buttons/BookmarkButton";

const TwitActions = ({ twit }) => {
  return (
    <div className="twit-action" key={twit.id}>
      <CommentButton twit={twit} />
      <RetwitTwitButton twit={twit} />
      <LikeTwitButton twit={twit} />
      <BookmarkButton twit={twit} />
    </div>
  );
};

export default TwitActions;
