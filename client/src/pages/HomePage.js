import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosHeaders } from "axios";
import { Context } from "..";
import { checkToken } from "../http/userApi";
import { LOGIN_PAGE } from "../utils/constans";
import HomePageComponent from "../components/HomePageComponent";

const HomePage = observer(()=>{
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
            navigate(LOGIN_PAGE)
          }
        });
    } catch (error) {
      console.log(error.response.data.message);
    }
  }, []);

  return (
    <>
      {!loadingPage && user.isAuth && <HomePageComponent />}
    </>
  );
});

export default HomePage;
