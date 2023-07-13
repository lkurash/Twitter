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
import Twit from "./Twit";

const ContentExplorePageAllTwits = observer(() => {
  const { twitsStore } = useContext(Context);
  const ref = useRef();
  const [isLoading, setIsLoading] = useState(true);

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
          <div className="page-name main-stiky-panel">
            <div className="page-name-user-name">
              <h2>Explore</h2>
            </div>
          </div>
          {twitsStore.twits.length === 0 || isLoading ? (
            spinner()
          ) : (
            <div className="twits">
              {twitsStore.twits ? (
                twitsStore.twits.map((twit) => <Twit twit={twit} key={twit.id} />)
              ) : (
                <p className="empty-twits">No twits</p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
});

export default ContentExplorePageAllTwits;
