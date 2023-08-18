import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import getMoreComments from "../utils/getMoreComments";

import spinner from "../utils/spinner";
import ButtonShowMoreTwits from "./buttons/ButtonShowMoreTwits";
import TwitDesc from "./TwitDesc";
import UserPhoto from "./UserPhoto";

const UserComments = observer(() => {
  const { commentsStore } = useContext(Context);
  const [loadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingPage(false);
    }, 250);
  }, []);

  if (commentsStore.comments.length === 0 || loadingPage) return spinner();

  return (
    <>
      {commentsStore.comments ? (
        <>
          {commentsStore.comments.map((comment) => (
            <div className="twit" key={comment.id}>
              <div className="content-block">
                <div className="user-block-twit">
                  <div className="connection-twit-comment-photo">
                    <UserPhoto twit={comment.Twit} />
                    <div className="comment-line" />
                    <UserPhoto twit={comment} />
                  </div>
                  <div className="comment-desc">
                    <TwitDesc twit={comment.Twit} />
                    {!comment.Twit.img && (
                      <div className="connection-twit-comment-text" />
                    )}
                    <TwitDesc twit={comment} />
                  </div>
                </div>
              </div>
              <div className="main-line" />
            </div>
          ))}
          {commentsStore.comments.length >= 4 && (
            <ButtonShowMoreTwits
              getMoreTwits={getMoreComments}
              store={commentsStore}
            />
          )}
        </>
      ) : (
        <p className="empty-twits">No twits</p>
      )}
    </>
  );
});

export default UserComments;
