import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../..";

import twitAPI from "../../http/twitAPI";

import ContentPublicHomePage from "../../components/ContentPublicHomePage";

const PublicHomePage = observer(() => {
  return (
    <>
      <ContentPublicHomePage />
    </>
  );
});
export default PublicHomePage;
