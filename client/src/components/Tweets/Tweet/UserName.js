import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { auth } from "../../../redux/user/user.selectors";

import navigateClickOnUser from "../../../utils/navigateClickOnUser";

const UserName = observer(({ tweet, user }) => {
  const { isAuth } = useSelector(auth);

  const navigate = useNavigate();

  return (
    <div className="tweet-user-name">
      <div className="tweet-user-name-block">
        <h4
          className="tweet-user-name"
          onClick={() => navigate(navigateClickOnUser(isAuth, user.id))}
        >
          {user.user_name}
        </h4>
        <p className="profile-name">{`@${user.user_name}`}</p>
      </div>
    </div>
  );
});
export default UserName;
