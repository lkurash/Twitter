import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import { AUTHTRENDS_PAGE_PATH, TRENDS_PAGE_PATH } from "../utils/constans";

import ButtonOnTrend from "./buttons/ButtonOnTrend";

const Trends = observer(({ topic }) => {
  const navigate = useNavigate();
  const { usersStore } = useContext(Context);

  return (
    <div className="main-trends-item">
      <div
        className="trends-item"
        onClick={() => {
          if (usersStore.isAuth) {
            navigate({
              pathname: `${AUTHTRENDS_PAGE_PATH}`,
              search: `trend=${topic.title}`,
            });
          } else {
            navigate({
              pathname: `${TRENDS_PAGE_PATH}`,
              search: `trend=${topic.title}`,
            });
          }
        }}
      >
        <p className="trends-item-title">{topic.trend}</p>
        <h4 className="trends-item-body">{topic.title}</h4>
        <p className="trends-item-footer">{topic.count_twits} posts</p>
      </div>
      <ButtonOnTrend trend={topic} />
    </div>
  );
});

export default Trends;
