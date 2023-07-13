import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";

import "../App.css";
import "../components/common/common.css";

import MainComponentExplorePage from "../pagesComponents/ExplorePageComponent";
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import CheckTokenOnPage from "../utils/checkTokenOnPage";

const ExplorePage = observer(() => {
  const { usersStore } = useContext(Context);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();

  CheckTokenOnPage(usersStore, navigate, setLoadingPage);

  return <MainComponentExplorePage />;
});

export default ExplorePage;
