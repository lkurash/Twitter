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

  useEffect(() => {
    const checkCookieTwitsForYou = () => {
      if (cookies.twitsWhoReading === "true") {
        setTwitsForYouVisible(false);
        return setTwitsWhoReadingVisible(true);
      } else {
        setTwitsForYouVisible(true);
        return setTwitsWhoReadingVisible(false);
      }
    };
    checkCookieTwitsForYou();
  }, [cookies.twitsWhoReading]);

  return (
    <>
      <div className="main-stiky-panel">
        <div className="main-page-name-wrapper">
          <div className="main-page-name">
            <h2>Home</h2>
          </div>
        </div>
        <div className="main-content-button-panel">
          <div className="wrapper-button">
            <button
              type="button"
              className="main-button-foryou"
              onClick={() => {
                setCookieTwitsForYou(false);
              }}
            >
              <span>For you</span>
            </button>
            <div
              className={
                twitsForYouVisible
                  ? "main-button-active"
                  : "main-button-notactive"
              }
            />
          </div>
          <div className="wrapper-button">
            <button
              type="button"
              className="main-button-whoyouread"
              onClick={() => {
                setCookieTwitsForYou(true);
              }}
            >
              <span> You are reading</span>
            </button>
            <div
              className={
                twitsWhoReadingVisible
                  ? "main-button-active"
                  : "main-button-notactive"
              }
            />
          </div>
        </div>
      </div>
      <div className="main-line" />
      <div className="main-content-block main-content-block-mobile">
        <TwitForm />
      </div>
      <div className="main-line" />
      <>
        {twitsForYouVisible && <TwitsForYou />}

        {twitsWhoReadingVisible && (
          <TwitsWhoYouRead userTwits={twitsStore.userTwits} />
        )}
      </>
    </>
  );
});

export default ContentHomePage;
