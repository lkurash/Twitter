import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

const NewMessageComponent = observer(({ writeMessage }) => {
  const { user } = useContext(Context);

  if (!writeMessage) return null;

  return <div className="message-background"></div>;
});

export default NewMessageComponent;
