import twitClient from "../http/twitClient";
import getAuthUserID from "./getAuthUserID";

export default async function getTwitsForAuthUser(
  showMoreTwits,
  itemListTwits,
  twitsStore,
  setShowMoreTwits,
  setShowButton
) {
  const authUserID = getAuthUserID();
  if (showMoreTwits) {
    await twitClient
      .getTwitsForAuthUser(authUserID, 7, itemListTwits)
      .then((alltwits) => {
        twitsStore.setTwits(twitsStore.twits.concat(alltwits));

        setShowMoreTwits(false);

        if (alltwits.length < 7) {
          setShowButton(false);
        }
      });
  }
}
