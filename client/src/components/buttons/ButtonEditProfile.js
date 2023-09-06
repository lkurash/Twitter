import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { PRIVATE_EDIT_PROFILE_PAGE_PATH } from "../../utils/constans";

const ButtonEditProfile = observer(({ usersStore }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="button-edit-profile"
      onClick={() => navigate(PRIVATE_EDIT_PROFILE_PAGE_PATH)}
    >
      <span>Edit Profile</span>
    </button>
  );
});

export default ButtonEditProfile;
