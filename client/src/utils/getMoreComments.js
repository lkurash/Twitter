import twitClient from "../http/twitClient";
import getAuthUserID from "./getAuthUserID";

export default async function getMoreComments(
  showMoreTwits,
  itemListTwits,
  store,
  setShowMoreTwits,
  setShowButton
) {
  if (showMoreTwits) {
    const authUserID = getAuthUserID();

    await twitClient
      .getCommentsByUser(authUserID, 4, itemListTwits)
      .then((comments) => {
        store.setComments(store.comments.concat(comments));

        setShowMoreTwits(false);

        if (comments.length < 4) {
          setShowButton(false);
        }
      });
  }
}
