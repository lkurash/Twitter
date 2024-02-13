import { observer } from "mobx-react-lite";
import { useState } from "react";

import { userProfile } from "../redux/user/user.selectors";
import { useSelector } from "react-redux";

import NewMessageComponent from "./NewMessageComponent";
import MainStikyPanel from "./MainStikyPanel";

const MessagesPageContent = observer(() => {
  const { profile } = useSelector(userProfile);
  const [writeMessage, setWriteMessage] = useState(false);

  return (
    <>
      <MainStikyPanel pageName="Messages" userName={profile.user_name} arrowVisible={true} />
      <div className="main-line" />
      <div className="messages-welcome">
        <div className="messages-welcome-desc">
          <h2>Welcome to inbox!</h2>
          <p>Send a message in a private message with other Twitter users.</p>
          <button
            className="messages-button-write"
            type="button"
            onClick={() => setWriteMessage(true)}
          >
            <span>Write a new message</span>
          </button>
        </div>
      </div>
      <NewMessageComponent writeMessage={writeMessage} />
    </>
  );
});

export default MessagesPageContent;
