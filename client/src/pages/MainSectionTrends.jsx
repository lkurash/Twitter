import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { trendStore } from "../redux/trend/trend.selectors";

import spinner from "../utils/spinner";

import loadSectionTrends from "../components/loadComponents/loadSectionTrends";
import Trend from "../components/Trend";

const MainSectionTrends = ({ mainBlock, className }) => {
  const { trends, loadingStatus } = useSelector(trendStore);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loadingStatus === "PENDING" || isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    }
  }, [loadingStatus]);

  if (isLoading) {
    if (mainBlock) {
      return (
        <div className="section section-public-page trends load-trends-main-block">
          <h2 className="main-section-name">Trends for you</h2>
          {spinner()}
        </div>
      );
    } else {
      return loadSectionTrends();
    }
  }

  return (
    <section className={className} data-testid="section-trends">
      <h2 className="main-section-name">Trends for you</h2>
      {trends.length > 0 ? (
        trends.map((trend) => <Trend key={trend.id} topic={trend} />)
      ) : (
        <p className="section-whoyouread-hint-about-lack-section">
          {" "}
          No trends today
        </p>
      )}
    </section>
  );
};

export default MainSectionTrends;
