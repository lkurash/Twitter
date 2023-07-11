import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { EDIT_PROFILE_PAGE } from "../../utils/constans";
import getAuthUserID from "../../utils/getAuthUserID";

const ButtonEditProfile = observer(({ user }) => {
  const navigate = useNavigate();
  const authUserID = getAuthUserID(user);
  const { id } = useParams();

  if (authUserID !== +id) return null;

  return (
    <button
      type="button"
      className="button-edit-profile"
      onClick={() => navigate(EDIT_PROFILE_PAGE + authUserID)}
    >
      <span>Edit Profile</span>
    </button>
  );
});

export default ButtonEditProfile;
