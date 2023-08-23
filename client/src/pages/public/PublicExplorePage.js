import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

import twitsApi from "../../http/twitsApi";

import getFlagIsAuth from "../../utils/getFlagIsAuth";

import SidebarContent from "../../components/SidebarContent";
import ContentExplorePageAllTwits from "../../components/ContentExplorePageAllTwits";

const PublicExplorePage = observer(() => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);

  useEffect(() => {
    try {
      twitsApi.getAllTwits().then((alltwits) => twitsStore.setTwits(alltwits));
      usersStore.setAuth(getFlagIsAuth());

    } catch (error) {
      console.log(error.response.data.message);
    }
  }, []);

  return (
    <>
      <ContentExplorePageAllTwits />
      <SidebarContent />
    </>
  );
});

export default PublicExplorePage;
