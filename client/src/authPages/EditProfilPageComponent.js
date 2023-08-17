import { observer } from "mobx-react-lite";

import EditProfileForm from "../components/forms/EditProfilForm";

const EditProfilePageComponent = observer(() => {

  return (
    <>
      <div className="edit-profile-page">
        <EditProfileForm />
      </div>
    </>
  );
});

export default EditProfilePageComponent;
