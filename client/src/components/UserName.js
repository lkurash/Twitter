import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { USER_PAGE_PATH, PUBLIC_USER_PAGE_PATH } from "../utils/constans";
import path from "../utils/path";
import { auth } from "../redux/user/user.selectors";
import { useSelector } from "react-redux";

const UserName = observer(({ twit, user }) => {
  const { isAuth } = useSelector(auth);

  const navigate = useNavigate();

  return (
    <div className="twit-user-name">
      <div className="twit-user-name-block">
        <h4
          className="twit-user-name"
          onClick={() => {
            if (isAuth) {
              navigate(path(USER_PAGE_PATH, user.id));
            } else {
              navigate(path(PUBLIC_USER_PAGE_PATH, twit.user.id));
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
