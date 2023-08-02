import ButtonDeleteTwit from "./buttons/ButtonDeleteTwit";
import TwitActions from "./TwitActions";
import TwitDesc from "./TwitDesc";
import UserPhoto from "./UserPhoto";

const Twit = ({ twit }) => {
  return (
    <>
      <div className="twit">
        {/* <div className="content-block"> */}
        <div className="user-block-twit">
          <UserPhoto twit={twit} />
          <TwitDesc twit={twit} />
          <ButtonDeleteTwit twit={twit} key={`button-${twit.id}`} />
        </div>
        <TwitActions twit={twit} />
      </div>
      <div className="main-line" />
    </>
  );
};
export default Twit;
