import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";
import trendsApi from "../http/trendsApi";
import getAuthUserID from "../utils/getAuthUserID";

import loadSectionTrends from "./loadComponents/loadSectionTrends";
import Trends from "./Trends";

const MainSectionTrends = observer((props) => {
  const { trendsStore } = useContext(Context);
  const authUserID = getAuthUserID();

  useEffect(()=>{
    if (authUserID) {
      trendsApi
        .getAllTrends(authUserID)
        .then((allTrends) => trendsStore.setTrends(allTrends));
    }else{
      trendsApi
        .getAllTrends()
        .then((allTrends) => trendsStore.setTrends(allTrends));
    }
  },[])

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
