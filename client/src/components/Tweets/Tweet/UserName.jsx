import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { auth } from "../../../redux/user/user.selectors";

import navigateClickOnUser from "../../../utils/navigateClickOnUser";

const UserName = ({ user }) => {
  const isAuth = useSelector(auth);

  const navigate = useNavigate();

  return (
    <div className="tweet-user-name">
      <div className="tweet-user-name-block">
        <h4
          data-testid="tweet-user-name"
          className="tweet-user-name"
          onClick={() => navigate(navigateClickOnUser(isAuth, user.id))}
        >
          {user.user_name}
        </h4>
        <p
          className="profile-name"
          data-testid="profile-name"
        >{`@${user.user_name}`}</p>
      </div>
    </div>
  );
};
export default UserName;
