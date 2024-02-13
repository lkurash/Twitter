import { observer } from "mobx-react-lite";

const NewMessageComponent = observer(({ writeMessage }) => {

  if (!writeMessage) return null;

  return <div className="message-background"></div>;
});

export default NewMessageComponent;
