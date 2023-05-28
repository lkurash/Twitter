import { observer } from "mobx-react-lite";
import { useState } from "react";
import TwitForm from "./TwitForm";
import TwitsForYou from "./TwitsForYou";
import TwitsWhoYouRead from "./TwitsWhoYouReading";

const MainComponentHomePage = observer(()=>{
  const [showTwitsForYou, setShowTwitsForYou] = useState(true);
  const [showTwitsWhoReading, setShowTwitsWhoReading] = useState(false);

  return(
    <main className="main-wrapper">
      <div className="main">
        <div className="user-main-content">
          <div className="user-main-content-block">
            <div>
              <div className="page-name">
                <div className="page-name-user-name">
                  <h2>Home</h2>
                </div>
              </div>
              <div className="user-main-content-button-panel">
                {showTwitsForYou ? (
                  <button
                    type="button"
                    className="user-main-content-foryou-button-panel active-button-panel"
                    onClick={() => {
                      setShowTwitsForYou(true);
                      setShowTwitsWhoReading(false);
                    }}
                  >
                    <span>For you</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="user-main-content-foryou-button-panel"
                    onClick={() => {
                      setShowTwitsForYou(true);
                      setShowTwitsWhoReading(false);
                    }}
                  >
                    <span>For you</span>
                  </button>
                )}
                {showTwitsWhoReading ? (
                  <button
                    type="button"
                    className="user-main-content-reading-button-panel active-button-panel"
                    onClick={() => {
                      setShowTwitsForYou(false);
                      setShowTwitsWhoReading(true);
                    }}
                  >
                    <span> You ara reading</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="user-main-content-reading-button-panel"
                    onClick={() => {
                      setShowTwitsForYou(false);
                      setShowTwitsWhoReading(true);
                    }}
                  >
                    <span> You are reading</span>
                  </button>
                )}
              </div>
            </div>
            <div className="main-line" />
            <div className="user-main-content-block user-main-content-block-mobile">
              <TwitForm />
            </div>
            <div className="main-line" />
            <TwitsForYou showTwitsForYou={showTwitsForYou}/>
            <TwitsWhoYouRead showTwitsWhoReading={showTwitsWhoReading}/>
          </div>
        </div>
      </div>
    </main>
  );
});

export default MainComponentHomePage;
