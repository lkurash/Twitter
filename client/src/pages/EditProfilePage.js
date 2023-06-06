import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import EditProfilePageComponent from "../components/EditProfilPageComponent";
import { checkToken } from "../http/userApi";
import { LOGIN_PAGE } from "../utils/constans";

const EditProfilePage = observer(() => {
  const { user } = useContext(Context);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      checkToken()
        .then((data) => {
          user.setAuth(true);
        })
        .finally(() => {
          setLoadingPage(false);
          if (!user.isAuth) {
            navigate(LOGIN_PAGE);
          }
        });
    } catch (e) {}
  }, []);

  return <>{!loadingPage && user.isAuth && <EditProfilePageComponent />}</>;
});

export default EditProfilePage;
