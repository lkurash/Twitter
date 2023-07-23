import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import EditProfilePageComponent from "../pagesComponents/EditProfilPageComponent";
import CreateNewTokenOnPage from "../utils/createNewTokenOnPage";

const EditProfilePage = observer(() => {
  const { usersStore } = useContext(Context);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();

  CreateNewTokenOnPage(usersStore, navigate, setLoadingPage);

  return <>{!loadingPage && usersStore.isAuth && <EditProfilePageComponent />}</>;
});

export default EditProfilePage;
