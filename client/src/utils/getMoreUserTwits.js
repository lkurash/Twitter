import twitsApi from "../http/twitsApi";

export default async function getMoreUserTwits(
  showMoreTwits,
  itemListTwits,
  twitsStore,
  setShowMoreTwits,
  setShowButton,
  userId
) {
  if (showMoreTwits) {
    await twitsApi
      .getTwitsByUser(userId, 7, itemListTwits)
      .then((usersTwits) => {
        twitsStore.setUserTwits(twitsStore.userTwits.concat(usersTwits));
        
        setShowMoreTwits(false);

        if (usersTwits.length < 7) {
          setShowButton(false);
        }
      });
  }
}
