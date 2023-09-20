import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "..";

import NewMessageComponent from "./NewMessageComponent";

const ContentMessagesPage = observer(() => {
  const { usersStore } = useContext(Context);
  const [writeMessage, setWriteMessage] = useState(false);

  return (
    <>
      <div className="main-stiky-panel">
        <div className="main-page-name-wrapper">
          <div className="main-page-name">
            <h2>Messages</h2>
            <p>@{usersStore.user.user_name}</p>
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

export default ContentMessagesPage;
