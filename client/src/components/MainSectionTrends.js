import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

import loadSectionTrends from "./loadComponents/loadSectionTrends";
import Trends from "./Trends";

const MainSectionTrends = observer((props) => {
  const { topicsStore } = useContext(Context);

  if (topicsStore.topics.length === 0) {
    return loadSectionTrends();
  }

  return (
    <section className={props.className}>
      <h2 className="main-section-name">Trends for you</h2>
      {topicsStore.topics ? (
        topicsStore.topics.map((topic) => <Trends key={topic.id} topic={topic} />)
      ) : (
        <p className="section-aside-hidden"> No trends today</p>
      )}
    </section>
  );
});

export default MainSectionTrends;
