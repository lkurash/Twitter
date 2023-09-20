import { observer } from "mobx-react-lite";
import { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "..";

import spinner from "../utils/spinner";

import twitClient from "../http/twitClient";

import ShowMoreTwitsButton from "./buttons/ShowMoreTwitsButton";
import TwitDesc from "./Twit/TwitDesc";
import UserName from "./Twit/UserName";
import UserPhoto from "./Twit/UserPhoto";

const UserComments = observer(() => {
  const { twitsStore } = useContext(Context);
  const { usersStore } = useContext(Context);

  const [loadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingPage(false);
    }, 250);
  }, []);

  if (twitsStore.twits.length === 0 || loadingPage) return spinner();

  return (
    <>
      {twitsStore.twits ? (
        <>
          {twitsStore.twits.map(({ Comment, Twit }) => (
            <Fragment key={Comment.id}>
              <div className="twit" key={Comment.id}>
                <div className="content-block">
                  <div className="user-block-comment">
                    <div className="comment-twit-info-block-connection-photo">
                      <UserPhoto user={Twit.userOriginalTwits} />
                      <div className="comment-line" />
                      <UserPhoto user={Comment.user} />
                    </div>
                    <div className="comment-desc">
                      <UserName user={Twit.userOriginalTwits} />
                      <TwitDesc twit={Twit} />
                      {!Twit.img && (
                        <div className="comment-twit-info-block-connection-text" />
                      )}
                      <UserName user={Comment.user} />
                      <TwitDesc twit={Comment} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-line" />
            </Fragment>
          ))}
          {twitsStore.twits.length >= 7 && (
            <ShowMoreTwitsButton
              getTwits={twitClient.getCommentsByUser}
              userId={usersStore.userPage.id}
              store={twitsStore}
            />
          )}
        </>
      ) : (
        <p className="twit-hint-about-lack-twits">No twits</p>
      )}
    </>
  );
});

export default UserComments;
