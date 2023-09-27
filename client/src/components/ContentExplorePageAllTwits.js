import { observer } from "mobx-react-lite";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Context } from "..";

import spinner from "../utils/spinner";

import ButtonShowMoreTwits from "./buttons/ButtonShowMoreTwits";
import Twit from "./Twit";
import twitClient from "../http/twitClient";
import getAuthUserID from "../utils/getAuthUserID";

const ContentExplorePageAllTwits = observer(() => {
  const { twitsStore } = useContext(Context);
  const ref = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const authUserID = getAuthUserID();

  useLayoutEffect(() => {
    ref.current.scrollIntoView();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  }, []);

  return (
    <main className="main-wrapper">
      <div className="main">
        <div className="main-content" ref={ref}>
          <div className="main-stiky-panel explore-page-stiky-panel">
            <div className="main-page-name">
              <h2>Explore</h2>
            </div>
          </div>
          {twitsStore.twits.length === 0 || isLoading ? (
            spinner()
          ) : (
            <div className="twits">
              {twitsStore.twits ? (
                <>
                  {twitsStore.twits.map((twit) => (
                    <Twit twit={twit} key={twit.id} />
                  ))}
                  {twitsStore.twits.length >= 7 && (
                    <ButtonShowMoreTwits
                      getTwits={
                        authUserID
                          ? twitClient.getTwitsForAuthUser
                          : twitClient.getAllTwits
                      }
                      userId={authUserID}
                      store={twitsStore}
                    />
                  )}
                </>
              ) : (
                <p className="twit-hint-about-lack-twits">No twits</p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
});

export default ContentExplorePageAllTwits;
