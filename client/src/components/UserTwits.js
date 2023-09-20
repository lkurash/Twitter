import { observer } from "mobx-react-lite";
import { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "..";
import { useParams } from "react-router-dom";

import twitClient from "../http/twitClient";

import getAuthUserID from "../utils/getAuthUserID";
import spinner from "../utils/spinner";

import Twits from "./Twits";
import ShowMoreTwitsButton from "./buttons/ShowMoreTwitsButton";

import "./main.css";

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
    <Fragment>
      <Twits />
      {twitsStore.twits.length >= 7 && (
        <ShowMoreTwitsButton
          getTwits={
            authUserID
              ? twitClient.getTwitsByUser
              : twitClient.getPublicTwitsByUser
          }
          userId={usersStore.userPage.id || id}
          store={twitsStore}
        />
      )}
    </Fragment>
  );
});

export default UserTwits;
