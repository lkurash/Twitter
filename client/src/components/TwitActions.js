import ButtonLikeOnTwit from "./buttons/ButtonLikeOnTwit";
import ButtonRetwitOnTwit from "./buttons/ButtonRetwitOnTwit";
import ButtonCommentOnTwit from "./buttons/ButtonCommentOnTwit";
import ButtonBookmarkOnTwit from "./buttons/ButtonBookmarkOnTwit";

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
