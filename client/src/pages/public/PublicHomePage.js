import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../..";

import twitClient from "../../http/twitClient";

import SidebarContent from "../../components/SidebarContent";
import ContentPublicHomePage from "../../components/ContentPublicHomePage";

const PublicHomePage = observer(() => {
  const { twitsStore } = useContext(Context);

  useEffect(() => {
    try {
      twitClient
        .getAllTwits()
        .then((alltwits) => twitsStore.setTwits(alltwits));
    } catch (error) {
      console.log(error.response.data.message);
    }
  });
  return (
    <>
      <ContentPublicHomePage />
      <SidebarContent />
    </>
  );
});
export default PublicHomePage;
