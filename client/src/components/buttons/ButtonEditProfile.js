import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { EDIT_PROFILE_PAGE_PATH } from "../../utils/constans";
import getAuthUserID from "../../utils/getAuthUserID";

const ButtonEditProfile = observer(({ usersStore }) => {
  const navigate = useNavigate();
  const authUserID = getAuthUserID(usersStore);

  return (
    <button
      type="button"
      className="button-edit-profile"
      onClick={() => navigate(EDIT_PROFILE_PAGE_PATH + authUserID)}
    >
      <span>Edit Profile</span>
    </button>
  );
});

export default ButtonEditProfile;
