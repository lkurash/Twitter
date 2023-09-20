import { observer } from "mobx-react-lite";
import { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "..";

import twitClient from "../http/twitClient";

import spinner from "../utils/spinner";
import getAuthUserID from "../utils/getAuthUserID";

import Twits from "./Twits";
import ShowMoreTwitsButton from "./buttons/ShowMoreTwitsButton";

const ContentExplorePageAllTwits = observer(() => {
  const { twitsStore } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const authUserID = getAuthUserID();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  }, []);

  return (
    <>
      <div className="main-stiky-panel explore-page-stiky-panel">
        <div className="main-page-name">
          <h2>Explore</h2>
        </div>
      </div>
      {twitsStore.twits.length === 0 || isLoading ? (
        spinner()
      ) : (
        <Fragment>
          <Twits />
          {twitsStore.twits.length >= 7 && (
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
        </Fragment>
      )}
    </>
  );
});

export default ContentExplorePageAllTwits;
