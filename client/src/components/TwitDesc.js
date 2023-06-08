import { useNavigate } from "react-router-dom";
import { PROFILE_PAGE_USER } from "../utils/constans";

const TwitDesc = ({ twit }) => {
  const navigate = useNavigate();

  return (
    <div className="twit-desc" key={twit.id}>
      <h4
        className="twit-user-name"
        onClick={() => navigate(PROFILE_PAGE_USER + twit.User.id)}
      >
        {twit.User.user_name}
      </h4>
      <p className="twit-text">{twit.text}</p>
      {twit.img && (
        <div className="wrapper-twit-img">
          <img
            src={`http://localhost:5500/${twit.img}`}
            alt=""
            className="twit-img"
          />
        </div>
      )}
    </div>
  );
};
export default TwitDesc;
