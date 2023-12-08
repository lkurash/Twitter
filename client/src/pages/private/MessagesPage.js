import { observer } from "mobx-react-lite";

import MessagesPageContent from "../../components/MessagesPageContent";

const MessagesPage = observer(() => {
  return (
    <>
      <MessagesPageContent />
    </>
  );
});

export default MessagesPage;
