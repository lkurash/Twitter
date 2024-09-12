import { useSelector } from "react-redux";
import { trendStore } from "../redux/trend/trend.selectors";

import Trend from "../components/Trend";

const MainSectionTrends = ({ mainBlock, className }) => {
  const { trends, loadingStatus } = useSelector(trendStore);

  return (
    <section className={className} data-testid="section-trends">
      <h2 className="main-section-name">Trends for you</h2>
      {loadingStatus === "COMPLETE" && (
        <>
          {trends.length > 0 ? (
            trends.map((trend) => <Trend key={trend.id} topic={trend} />)
          ) : (
            <p className="section-whoyouread-hint-about-lack-section">
              {" "}
              No trends today
            </p>
          )}
        </>
      )}
    </section>
  );
};

export default MainSectionTrends;
