import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PublicProfileUser from "../../components/PublicProfileUser";
import { userActions } from "../../redux/user/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../redux/user/user.selectors";
import { USER_PAGE_PATH } from "../../utils/routs";
import path from "../../utils/path";

const PublicProfilePageUser = observer(() => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(auth);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (isAuth) {
      navigate(path(USER_PAGE_PATH, id));
    } else {
      dispatch(userActions.getUserProfileById(id));
    }
  }, [id, isAuth]);

  return (
    <>
      <PublicProfileUser />
    </>
  );
});

export default PublicProfilePageUser;
