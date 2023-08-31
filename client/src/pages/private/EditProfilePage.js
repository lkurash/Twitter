import { observer } from "mobx-react-lite";

import EditProfileForm from "../../components/forms/EditProfilForm";
import UserTwits from "../../components/UserTwits";

const EditProfilePage = observer(() => {
  return (
    <>
      <UserTwits />
      <div className="edit-profile-page">
        <EditProfileForm />
      </div>
    </>
  );
});

export default EditProfilePage;