import { observer } from "mobx-react-lite";
import { Fragment } from "react";

import ShowMoreTwitsButton from "./buttons/ShowMoreTwitsButton";
import TwitDesc from "./Twit/TwitDesc";
import UserName from "./Twit/UserName";
import UserPhoto from "./Twit/UserPhoto";
import { twitsStore } from "../redux/tweet/tweet.selectors";
import { useSelector } from "react-redux";
import { tweetActions } from "../redux/tweet/tweet.actions";
import { userProfileById } from "../redux/user/user.selectors";

const UserComments = observer(() => {
  const { twits } = useSelector(twitsStore);
  const { profile } = useSelector(userProfileById);

  return (
    <>
      {twits ? (
        <>
          {twits.map(({ Comment, Twit }) => (
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
          {twits && twits.length >= 7 && (
            <ShowMoreTwitsButton
              getTwits={tweetActions.getMoreAnswers}
              userId={profile.id}
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
