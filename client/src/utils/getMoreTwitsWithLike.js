import twitsApi from "../http/twitsApi";
import getAuthUserID from "./getAuthUserID";

export default async function getMoreTwitsWithLike(
  showMoreTwits,
  itemListTwits,
  store,
  setShowMoreTwits,
  setShowButton
) {
  if (showMoreTwits) {
    const authUserID = getAuthUserID();

    await twitsApi
      .getTwitsWithUsersLike(authUserID, 7, itemListTwits)
      .then((twits) => {
        store.setTwitsWithUsersLike(store.twitsWithUsersLike.concat(twits.twits));

        setShowMoreTwits(false);

        if (twits.twits.length < 7) {
          setShowButton(false);
        }
      });
  }
}
