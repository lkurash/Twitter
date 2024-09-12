import EditProfileForm from "../../components/forms/EditProfilForm";
import UserPageTweetsContent from "../../components/UserPageTweetsContent";

const EditProfilePage = () => {
  return (
    <>
      <UserPageTweetsContent />
      <div className="background">
        <EditProfileForm />
      </div>
    </>
  );
};

export default EditProfilePage;
