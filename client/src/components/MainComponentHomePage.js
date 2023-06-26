import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import TwitForm from "./TwitForm";
import TwitsForYou from "./TwitsForYou";
import TwitsWhoYouRead from "./TwitsWhoYouReading";

const MainComponentHomePage = observer(() => {
  const { twits } = useContext(Context);
  const [showTwitsForYou, setShowTwitsForYou] = useState(true);
  const [showTwitsWhoReading, setShowTwitsWhoReading] = useState("");

  const setLocalStorageTwitsForYou = (show) => {
    localStorage.setItem("twitsWhoReading", show);
  };
console.log(localStorage.getItem("twitsWhoReading"));
  const checkLocalStorageTwitsForYou = () => {
    if (localStorage.getItem("twitsWhoReading") === "true") {
      setShowTwitsForYou(false);
      setShowTwitsWhoReading(true);
    } else {
      setShowTwitsForYou(true);
      setShowTwitsWhoReading(false);
    }
  };

  useEffect(() => {
    checkLocalStorageTwitsForYou();
  }, []);

  return (
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
                <div className="wrapper-button">
                  <button
                    type="button"
                    className="user-main-content-foryou-button-panel"
                    onClick={() => {
                      setLocalStorageTwitsForYou(false);
                      checkLocalStorageTwitsForYou();
                    }}
                  >
                    <span>For you</span>
                  </button>
                  {showTwitsForYou && <div className="active-button-panel" />}
                </div>
                <div className="wrapper-button">
                  <button
                    type="button"
                    className="user-main-content-reading-button-panel"
                    onClick={() => {
                      setLocalStorageTwitsForYou(true);
                      checkLocalStorageTwitsForYou();
                    }}
                  >
                    <span> You are reading</span>
                  </button>
                  {showTwitsWhoReading && (
                    <div className="active-button-panel" />
                  )}
                </div>
              </div>
            </div>
            <div className="main-line" />
            <div className="user-main-content-block user-main-content-block-mobile">
              <TwitForm />
            </div>
            <div className="main-line" />
            <TwitsForYou showTwitsForYou={showTwitsForYou} />
            <TwitsWhoYouRead
              showTwitsWhoReading={showTwitsWhoReading}
              userTwits={twits.userTwits}
            />
          </div>
        </div>
      </div>
    </main>
  );
});

export default MainComponentHomePage;
