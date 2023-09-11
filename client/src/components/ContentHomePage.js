import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Context } from "..";

import TwitForm from "./forms/TwitForm";
import TwitsForYou from "./TwitsForYou";
import TwitsWhoYouRead from "./TwitsWhoYouReading";

const ContentHomePage = observer(() => {
  const { twitsStore } = useContext(Context);
  const [cookies, setCookie, removeCookie] = useCookies(["twitsWhoReading"]);

  const [twitsForYouVisible, setTwitsForYouVisible] = useState("true");
  const [twitsWhoReadingVisible, setTwitsWhoReadingVisible] = useState("");

  const setCookieTwitsForYou = (show) => {
    removeCookie("twitsWhoReading");
    setCookie("twitsWhoReading", show);
  };

  const checkCookieTwitsForYou = () => {
    if (cookies.twitsWhoReading === "true") {
      setTwitsForYouVisible(false);
      return setTwitsWhoReadingVisible(true);
    } else {
      setTwitsForYouVisible(true);
      return setTwitsWhoReadingVisible(false);
    }
  };

  useEffect(() => {
    checkCookieTwitsForYou();
  }, [cookies.twitsWhoReading]);

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
                    }}
                  >
                    <span>For you</span>
                  </button>
                  <div
                    className={
                      twitsForYouVisible
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
                    }}
                  >
                    <span> You are reading</span>
                  </button>
                  <div
                    className={
                      twitsWhoReadingVisible
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
            <>
              {twitsForYouVisible && <TwitsForYou />}

              {twitsWhoReadingVisible && (
                <TwitsWhoYouRead userTwits={twitsStore.userTwits} />
              )}
            </>
          </div>
        </div>
      </div>
    </main>
  );
});

export default ContentHomePage;
