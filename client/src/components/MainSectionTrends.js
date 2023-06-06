import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import Trends from "./Trends";

const MainSectionTrends = observer((props) => {
  const { topics } = useContext(Context);

  return (
    <section className={props.className}>
      <h2 className="main-section-name">Trends for you</h2>
      {topics.topics.map((topic) => (
        <Trends key={topic.id} topic={topic} />
      ))}
      {topics.topics.length === 0 && (
        <p className="section-trends-hidden"> No trends today</p>
      )}
    </section>
  );
});

export default MainSectionTrends;
