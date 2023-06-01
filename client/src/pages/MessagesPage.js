import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import MessagesPageComponent from "../components/MessagePageComponent";
import { checkToken } from "../http/userApi";
import { LOGIN_PAGE } from "../utils/constans";

const MessagesPage = observer(()=>{
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
    } catch (e) {
    }
  }, []);

  return(
    <>
      {!loadingPage && user.isAuth && <MessagesPageComponent />}
    </>
  );
});

export default MessagesPage;
