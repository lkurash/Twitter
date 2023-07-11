import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import EditProfilePageComponent from "../pagesComponents/EditProfilPageComponent";
import CheckTokenOnPage from "../utils/checkTokenOnPage";

const EditProfilePage = observer(() => {
  const { user } = useContext(Context);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();

  CheckTokenOnPage(user, navigate, setLoadingPage);

  return <>{!loadingPage && user.isAuth && <EditProfilePageComponent />}</>;
});

export default EditProfilePage;
