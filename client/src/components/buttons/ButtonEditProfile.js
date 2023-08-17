import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import getAuthUserID from "../../utils/getAuthUserID";

const ButtonEditProfile = observer(({ usersStore }) => {
  const navigate = useNavigate();
  const authUserID = getAuthUserID(usersStore);

  return (
    <button
      type="button"
      className="button-edit-profile"
      onClick={() => navigate(`/home/profile/${authUserID}/edit`)}
    >
      <span>Edit Profile</span>
    </button>
  );
});

export default ButtonEditProfile;
