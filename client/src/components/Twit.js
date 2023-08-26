import getAuthUserID from "../utils/getAuthUserID";

import ButtonDeleteTwit from "./buttons/ButtonDeleteTwit";
import TwitActions from "./TwitActions";
import TwitDesc from "./TwitDesc";
import UserPhoto from "./UserPhoto";

const Twit = ({ twit }) => {
  const authUserID = getAuthUserID();

  return (
    <>
      <div className="twit">
        {/* <div className="content-block"> */}
        <div className="user-block-twit">
          <UserPhoto twit={twit} />
          <TwitDesc twit={twit} />
          {authUserID === twit.UserId && (
            <ButtonDeleteTwit twit={twit} key={`button-${twit.id}`} />
          )}
        </div>
        <TwitActions twit={twit} />
      </div>
      <div className="main-line" />
    </>
  );
};
export default Twit;
