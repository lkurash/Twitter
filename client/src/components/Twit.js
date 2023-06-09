import TwitActions from "./TwitActions";
import TwitDesc from "./TwitDesc";
import UserPhoto from "./UserPhoto";

const Twit = ({ twit }) => {
  return (
    <div>
      <div className="twit">
        <div className="content-block">
          <div className="user-block-twit">
            <UserPhoto twit={twit} />
            <TwitDesc twit={twit} />
          </div>
        </div>
        <TwitActions twit={twit} />
      </div>
      <div className="main-line" />
    </div>
  );
};
export default Twit;
