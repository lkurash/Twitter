import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import UserPage from "../pages/UserPage";
import EditProfileForm from "./EditProfilForm";

const EditProfilePageComponent = observer(() => {
  const {user} = useContext(Context);

  return(
    <div>
      <UserPage />
      <div className="edit-profile-page">
        <EditProfileForm userName= {user.user.user_name}/>
      </div>
    </div>
  );
});

export default EditProfilePageComponent;
