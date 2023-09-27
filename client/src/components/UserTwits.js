import { observer } from "mobx-react-lite";
import { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "..";

import spinner from "../utils/spinner";
import getMoreTwits from "../utils/getMoreTwits";

import Twit from "./Twit";
import ButtonShowMoreTwits from "./buttons/ButtonShowMoreTwits";

import "./main.css";
import twitClient from "../http/twitClient";
import getAuthUserID from "../utils/getAuthUserID";
import { useParams } from "react-router-dom";

const UserTwits = observer(() => {
  const { usersStore } = useContext(Context);
  const { twitsStore } = useContext(Context);
  const authUserID = getAuthUserID();
  const { id } = useParams();

  const [loadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    if (authUserID) {
      twitClient
        .getTwitsByUser(usersStore.userPage.id)
        .then((usersTwits) => twitsStore.setTwits(usersTwits));
    } else {
      twitClient
        .getPublicTwitsByUser(id)
        .then((usersTwits) => twitsStore.setTwits(usersTwits));
    }

    setTimeout(() => {
      setIsLoadingPage(false);
    }, 250);
  }, []);

  if (usersStore.userPage.length === 0 || loadingPage)
    return <div className="twits">{spinner()}</div>;

  return (
    <div className="twits">
      {twitsStore.twits ? (
        <>
          {twitsStore.twits.map((twit) => (
            <Twit twit={twit} key={twit.id} />
          ))}
          {twitsStore.twits.length >= 7 && (
            <ButtonShowMoreTwits
              getTwits={twitClient.getTwitsByUser}
              userId={usersStore.userPage.id || id}
              store={twitsStore}
            />
          )}
        </>
      ) : (
        <p className="twit-hint-about-lack-twits">No twits</p>
      )}
    </div>
  );
});

export default UserTwits;
