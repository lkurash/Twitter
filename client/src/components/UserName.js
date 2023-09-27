import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import { USER_PAGE_PATH, PUBLIC_USER_PAGE_PATH } from "../utils/constans";
import path from "../utils/path";

const UserName = observer(({ twit, user }) => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);

  const navigate = useNavigate();

  return (
    <div className="twit-user-name">
      <div className="twit-user-name-block">
        <h4
          className="twit-user-name"
          onClick={() => {
            if (usersStore.isAuth) {
              usersStore.setUserPage({});
              twitsStore.setUserTwits([]);

              navigate(path(USER_PAGE_PATH, user.id));
            } else {
              usersStore.setUserPage({});
              twitsStore.setUserTwits([]);

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
