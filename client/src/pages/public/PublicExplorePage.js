import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

import twitClient from "../../http/twitClient";

import getFlagIsAuth from "../../utils/getFlagIsAuth";
import spinner from "../../utils/spinner";
import getAuthUserID from "../../utils/getAuthUserID";

import Twits from "../../components/Twits";
import MainSectionTrends from "../../components/MainSectionTrends";
import ShowMoreTwitsButton from "../../components/buttons/ShowMoreTwitsButton";

const PublicExplorePage = observer(() => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  const authUserID = getAuthUserID();

  useEffect(() => {
    try {
      twitClient
        .getAllTwits()
        .then((alltwits) => twitsStore.setTwits(alltwits));
      usersStore.setAuth(getFlagIsAuth());
    } catch (error) {
      console.log(error.response.data.message);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  return (
    <div className="main-content">
      {isLoading ? (
        spinner()
      ) : (
        <MainSectionTrends className="section section-public-page trends" />
      )}
      <div className="main-line" />
      {isLoading ? (
        spinner()
      ) : (
        <>
          <Twits />
          {twitsStore.twits.length >= 7 && !isLoading && (
            <ShowMoreTwitsButton
              getTwits={
                authUserID
                  ? twitClient.getTwitsForAuthUser
                  : twitClient.getAllTwits
              }
              userId={authUserID}
              store={twitsStore}
            />
          )}
        </>
      )}
    </div>
  );
});

export default PublicExplorePage;
