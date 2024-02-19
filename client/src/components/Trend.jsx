import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { TRENDS_PAGE_PATH, PUBLIC_TRENDS_PAGE_PATH } from "../utils/routs";

import NotInterestingTrendButton from "./buttons/NotInterestingTrendButton";
import { useSelector } from "react-redux";
import { auth } from "../redux/user/user.selectors";

const Trend = observer(({ topic }) => {
  const { isAuth } = useSelector(auth);
  const navigate = useNavigate();

  return (
    <div className="main-trends-item">
      <div
        className="trends-item"
        onClick={() => {
          if (isAuth) {
            navigate({
              pathname: `${TRENDS_PAGE_PATH}`,
              search: `trend=${topic.title}`,
            });
          } else {
            navigate({
              pathname: `${PUBLIC_TRENDS_PAGE_PATH}`,
              search: `trend=${topic.title}`,
            });
          }
        }}
      >
        <p className="trends-item-title">{topic.trend}</p>
        <h4 className="trends-item-body">{topic.title}</h4>
        <p className="trends-item-footer">{topic.count_tweets} posts</p>
      </div>
      <NotInterestingTrendButton trend={topic} />
    </div>
  );
});

export default Trend;
