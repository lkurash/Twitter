import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import "../App.css";
import TwitPageComponent from "../components/TwitPageComponent";
import { checkToken } from "../http/userApi";
import { EXPLORE_PAGE } from "../utils/constans";

const TwitPage = observer(()=> {
  const { user } = useContext(Context);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      checkToken()
        .then((data) => {
          user.setAuth(true);
        })
        .finally(() => setLoadingPage(false));
    } catch (e) {
      navigate(EXPLORE_PAGE);
    }
  }, []);

  return (
    <>
      {!loadingPage && <TwitPageComponent />}
    </>
  );
});

export default TwitPage;
