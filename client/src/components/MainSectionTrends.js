import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

import loadSectionTrends from "./loadComponents/loadSectionTrends";
import Trends from "./Trends";

const MainSectionTrends = observer((props) => {
  const { trendsStore } = useContext(Context);

  if (trendsStore.trends.length === 0) {
    return loadSectionTrends();
  }

  return (
    <section className={props.className}>
      <h2 className="main-section-name">Trends for you</h2>
      {trendsStore.trends ? (
        trendsStore.trends.map((trend) => (
          <Trends key={trend.id} topic={trend} />
        ))
      ) : (
        <p className="section-aside-hidden"> No trends today</p>
      )}
    </section>
  );
});

export default MainSectionTrends;
