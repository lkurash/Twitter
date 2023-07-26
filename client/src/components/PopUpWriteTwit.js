import { observer } from "mobx-react-lite";

import TwitForm from "./forms/TwitForm";

import close from "./Img/x_icon.png";
import "../App.css";

const PopUpWriteTwit = observer(({ showTwitForm, setShowTwitForm }) => {
  if (!showTwitForm) return null;

  return (
    <div className="twit-page">
      <div className="twit-page-form wrapper-border">
        <div className="button-close" onClick={() => setShowTwitForm(false)}>
          <img src={close} alt="close-icon" className="close-icon" />
        </div>
        <div className="twit-page-twit-form">
          <TwitForm
            setShowTwitForm={setShowTwitForm}
            showTwitForm={showTwitForm}
          />
        </div>
      </div>
    </div>
  );
});

export default PopUpWriteTwit;
