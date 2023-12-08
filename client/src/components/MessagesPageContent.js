import { observer } from "mobx-react-lite";
import { useState } from "react";

import { userProfile } from "../redux/user/user.selectors";
import { useSelector } from "react-redux";

import NewMessageComponent from "./NewMessageComponent";

const MessagesPageContent = observer(() => {
  const { profile } = useSelector(userProfile);
  const [writeMessage, setWriteMessage] = useState(false);
  return (
    <>
      <div className="main-stiky-panel">
        <div className="main-page-name-wrapper">
          <div className="main-page-name">
            <h2>Messages</h2>
            <p>@{profile.user_name}</p>
          </div>
        </div>
      </div>
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
