import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../..";

import twitsApi from "../../http/twitsApi";

import SidebarContent from "../../components/SidebarContent";
import ContentExplorePage from "../../components/ContentExplorePage";

const PublicHomePage = observer(() => {
  const { twitsStore } = useContext(Context);

  useEffect(() => {
    try {
      twitsApi.getAllTwits().then((alltwits) => twitsStore.setTwits(alltwits));

    } catch (error) {
      console.log(error.response.data.message);
    }
  });
  return (
    <>
      <ContentExplorePage />
      <SidebarContent />
    </>
  );
});
export default PublicHomePage;
