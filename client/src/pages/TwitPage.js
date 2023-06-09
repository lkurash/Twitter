import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import "../App.css";
import TwitPageComponent from "../components/TwitPageComponent";
import CheckTokenOnPage from "../utils/checkTokenOnPage";

const TwitPage = observer(() => {
  const { user } = useContext(Context);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();

  CheckTokenOnPage(user, navigate, setLoadingPage);

  return <>{!loadingPage && <TwitPageComponent />}</>;
});

export default TwitPage;
