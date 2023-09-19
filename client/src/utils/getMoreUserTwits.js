import twitClient from "../http/twitClient";
import getAuthUserID from "./getAuthUserID";

export default async function getMoreUserTwits(
  showMoreTwits,
  itemListTwits,
  twitsStore,
  setShowMoreTwits,
  setShowButton,
  userId
) {
  const authUserID = getAuthUserID();
  if (showMoreTwits) {
    if (authUserID) {
      await twitClient
        .getTwitsByUser(userId, 7, itemListTwits)
        .then((usersTwits) => {
          twitsStore.setTwits(twitsStore.twits.concat(usersTwits));

          setShowMoreTwits(false);

          if (usersTwits.length < 7) {
            setShowButton(false);
          }
        });
    }else{
      await twitClient
        .getPublicTwitsByUsergit (userId, 7, itemListTwits)
        .then((usersTwits) => {
          twitsStore.setTwits(twitsStore.twits.concat(usersTwits));

          setShowMoreTwits(false);

          if (usersTwits.length < 7) {
            setShowButton(false);
          }
        });
    }
  }
}
