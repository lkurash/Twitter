import { observer } from "mobx-react-lite";
import "./main.css";
import { useContext } from "react";
import { Context } from "..";
import { ColorRing } from "react-loader-spinner";
import Twit from "./Twit";

const TwitsForYou = observer(({ showTwitsForYou }) => {
  const { twits } = useContext(Context);

  if (!showTwitsForYou) return null;

  if (twits.twits.length === 0) {
    return (
      <div className="load-spinner">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#1d9bf0", "#2188cc", "#1d9bf0", "#2188cc", "#1d9bf0"]}
        />
      </div>
    );
  }

  return (
    <div className="twits">
      {twits.twits.map((twit) => (
        <Twit twit={twit} key={twit.id}/>
      ))}
      {twits.twits.length === 0 && <p className="empty-twits">No twits</p>}
    </div>
  );
});

export default TwitsForYou;
