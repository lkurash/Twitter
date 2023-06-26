import { observer } from "mobx-react-lite";
import "../App.css";
import TwitForm from "./TwitForm";
import close from "./Img/x_icon.png";

const TwitPageComponent = observer(({ showTwitForm, setShowTwitForm }) => {
  if (!showTwitForm) return null;

  return (
    <div className="twit-page">
      <div className="twit-page-form wrapper-border">
        <div className="button-close" onClick={() => setShowTwitForm(false)}>
          <img src={close} alt="close-icon" className="close-icon" />
        </div>
        <div className="twit-page-twit-form">
          <TwitForm setShowTwitForm={setShowTwitForm} />
        </div>
      </div>
    </div>
  );
});

export default TwitPageComponent;
