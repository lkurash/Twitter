import { useNavigate } from "react-router-dom";

import { EDIT_PROFILE_PAGE_PATH } from "../../utils/routs";

const EditProfileButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="button-edit-profile"
      onClick={() => navigate(EDIT_PROFILE_PAGE_PATH)}
    >
      <span>Edit Profile</span>
    </button>
  );
};

export default EditProfileButton;
