import twitsClient from "../http/twitsClient";
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
    await twitsClient
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
