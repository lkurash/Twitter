import { observer } from "mobx-react-lite";

import EditProfileForm from "../../components/forms/EditProfilForm";
import UserTweets from "../../components/Tweets/UserTweets";

const EditProfilePage = observer(() => {
  return (
    <>
      <UserTweets />
      <div className="background">
        <EditProfileForm />
      </div>
    </>
  );
});

export default EditProfilePage;
