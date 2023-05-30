import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import EditProfileForm from "../components/EditProfilForm";
import UserPage from "./UserPage";

const EditProfilePage = observer(() => {
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

export default EditProfilePage;
