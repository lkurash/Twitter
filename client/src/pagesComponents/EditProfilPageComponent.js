import { observer } from "mobx-react-lite";
import EditProfileForm from "../components/forms/EditProfilForm";
import UserPageComponent from "./UserPageComponent";

const EditProfilePageComponent = observer(() => {
  return (
    <div>
      <UserPageComponent />
      <div className="edit-profile-page">
        <EditProfileForm />
      </div>
    </div>
  );
});

export default EditProfilePageComponent;
