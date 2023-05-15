
import { useNavigate } from "react-router-dom";
import { TRENDS_PAGE } from "../utils/constans";
import ButtonDotMenu from "./common/ButtonDotMenu";

function Trends({ topic }) {
  const navigate = useNavigate();

  return (
    <div className="main-trends-item">
      <div
        className="trends-item"
        onClick={() => navigate(TRENDS_PAGE + topic.title)}
      >
        <p className="trends-item-title">{topic.trend}</p>
        <h4 className="trends-item-body">{topic.title}</h4>
        <p className="trends-item-footer">{topic.count_twits}</p>
      </div>
      <ButtonDotMenu class="main-dotmenu" />
    </div>
  );
}

export default Trends;
