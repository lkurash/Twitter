import { getTwitsByUser } from "../http/twitsApi";

export default async function getMoreUserTwits(
  showMoreTwits,
  itemListTwits,
  twitsStore,
  setShowMoreTwits,
  setShowButton,
  userId
) {
  if (showMoreTwits) {
    console.log(userId);
    await getTwitsByUser(userId, 7, itemListTwits).then((usersTwits) => {
      twitsStore.setUserTwits(twitsStore.userTwits.concat(usersTwits));
      setShowMoreTwits(false);
      if (usersTwits.length < 7) {
        setShowButton(false);
      }
    });
  }
}
