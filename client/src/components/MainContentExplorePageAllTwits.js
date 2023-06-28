import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import Twit from "./Twit";

const MainContentExplorePageAllTwits = observer(() => {
  const { twits } = useContext(Context);

  return (
    <main className="main-wrapper">
      <div className="main">
        <div className="main-content">
          <div className="page-name main-stiky-panel">
            <div className="page-name-user-name">
              <h2>Explore</h2>
            </div>
          </div>
          <div className="twits">
            {twits.twits.map((twit) => (
              <Twit twit={twit} key={twit.id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
});

export default MainContentExplorePageAllTwits;
