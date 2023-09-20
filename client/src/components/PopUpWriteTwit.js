import { observer } from "mobx-react-lite";

import TwitForm from "./forms/TwitForm";

import close from "./Imgs/x_icon.png";

const PopUpWriteTwit = observer(({ twitFormVisible, setTwitFormVisible }) => {
  return (
    <div className="twit-page">
      <div className="twit-page-form wrapper-border">
        <div className="button-close" onClick={() => setTwitFormVisible(false)}>
          <img src={close} alt="close-icon" className="close-icon" />
        </div>
        <div className="twit-page-twit-form">
          <TwitForm
            setTwitFormVisible={setTwitFormVisible}
            twitFormVisible={twitFormVisible}
          />
        </div>
      </div>
    </div>
  );
});

export default PopUpWriteTwit;
