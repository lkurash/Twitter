import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

import loadSectionTrends from "./loadComponents/loadSectionTrends";
import Trends from "./Trends";

const MainSectionTrends = observer((props) => {
  const { topics } = useContext(Context);

  if (topics.topics.length === 0) {
    return loadSectionTrends();
  }

  return (
    <section className={props.className}>
      <h2 className="main-section-name">Trends for you</h2>
      {topics.topics ? (
        topics.topics.map((topic) => <Trends key={topic.id} topic={topic} />)
      ) : (
        <p className="section-aside-hidden"> No trends today</p>
      )}
    </section>
  );
});

export default MainSectionTrends;
