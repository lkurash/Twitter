import ButtonLikeOnTwit from "./ButtonLikeOnTwit";
import ButtonRetwitOnTwit from "./ButtonRetwitOnTwit";
import ButtonCommentOnTwit from "./ButtonCommentOnTwit";
import ButtonBookmarkOnTwit from "./ButtonBookmarkOnTwit";

const TwitActions = ({ twit }) => {
  return (
    <div className="user-twit-panel" key={twit.id}>
      <ButtonCommentOnTwit twit={twit} />
      <ButtonRetwitOnTwit twit={twit} />
      <ButtonLikeOnTwit twit={twit} />
      <ButtonBookmarkOnTwit twit={twit} />
    </div>
  );
};
export default TwitActions;
