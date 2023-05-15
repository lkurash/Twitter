import { observer } from "mobx-react-lite";
import EditProfileForm from "../components/EditProfilForm";
import HomePage from "./HomePage";

const EditProfilePage = observer(() => (
  <div>
    <HomePage />
    <div className="edit-profile-page">
      <EditProfileForm />
    </div>
  </div>
));

export default EditProfilePage;
