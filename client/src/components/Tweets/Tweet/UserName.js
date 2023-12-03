import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { auth } from "../../../redux/user/user.selectors";

import path from "../../../utils/path";
import { PUBLIC_USER_PAGE_PATH, USER_PAGE_PATH } from "../../../utils/routs";

const UserName = observer(({ tweet, user }) => {
  const { isAuth } = useSelector(auth);

  const navigate = useNavigate();

  return (
    <div className="tweet-user-name">
      <div className="tweet-user-name-block">
        <h4
          className="tweet-user-name"
          onClick={() => {
            if (isAuth) {
              navigate(path(USER_PAGE_PATH, user.id));
            } else {
              navigate(path(PUBLIC_USER_PAGE_PATH, user.id));
            }
          }}
        >
          {user.user_name}
        </h4>
        <p className="profile-name">{`@${user.user_name}`}</p>
      </div>
    </div>
  );
});
export default UserName;
