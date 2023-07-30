import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Context } from "..";

import spinner from "../utils/spinner";
import TwitForm from "./forms/TwitForm";
import TwitsForYou from "./TwitsForYou";
import TwitsWhoYouRead from "./TwitsWhoYouReading";

const ContentHomePage = observer(() => {
  const { twitsStore } = useContext(Context);
  const [cookies, setCookie] = useCookies();

  const [showTwitsForYou, setShowTwitsForYou] = useState(true);
  const [showTwitsWhoReading, setShowTwitsWhoReading] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const setCookieTwitsForYou = (show) => {
    setCookie("twitsWhoReading", show);
  };

  const checkCookieTwitsForYou = () => {

    if (cookies.twitsWhoReading === "true") {
      setShowTwitsForYou(false);
      return setShowTwitsWhoReading(true);
    } else {
      setShowTwitsForYou(true);
      return setShowTwitsWhoReading(false);
    }
  };

  useEffect(() => {
    checkCookieTwitsForYou();
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  });

  return (
    <main className="main-wrapper">
      <div className="main">
        <div className="user-main-content">
          <div className="user-main-content-block">
            <div className="main-stiky-panel">
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
                      setCookieTwitsForYou(false);
                      checkCookieTwitsForYou();
                    }}
                  >
                    <span>For you</span>
                  </button>
                  <div
                    className={
                      showTwitsForYou
                        ? "active-button-panel-main"
                        : "button-panel-main"
                    }
                  />
                </div>
                <div className="wrapper-button">
                  <button
                    type="button"
                    className="user-main-content-reading-button-panel"
                    onClick={() => {
                      setCookieTwitsForYou(true);
                      checkCookieTwitsForYou();
                    }}
                  >
                    <span> You are reading</span>
                  </button>
                  <div
                    className={
                      showTwitsWhoReading
                        ? "active-button-panel-main"
                        : "button-panel-main"
                    }
                  />
                </div>
              </div>
            </div>
            <div className="main-line" />
            <div className="user-main-content-block user-main-content-block-mobile">
              <TwitForm />
            </div>
            <div className="main-line" />
            {twitsStore.twits.length === 0 || isLoading ? (
              spinner()
            ) : (
              <>
                <TwitsForYou showTwitsForYou={showTwitsForYou} />
                <TwitsWhoYouRead
                  showTwitsWhoReading={showTwitsWhoReading}
                  userTwits={twitsStore.userTwits}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
});

export default ContentHomePage;
