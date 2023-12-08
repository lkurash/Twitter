import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { userActions } from "../../redux/user/user.actions";

import LoyoutProfilePage from "../../components/LoyoutProfilePage";

const ProfileUserPage = observer(() => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(userActions.getUserProfileById(id));
  }, [id]);

  return <LoyoutProfilePage />;
});

export default ProfileUserPage;
