export default async function getMoreTwits(
  showMoreTwits,
  getTwits,
  itemListTwits,
  twitsStore,
  setShowMoreTwits,
  setShowButton,
  userId
) {
  if (showMoreTwits) {
    if (userId) {
      await getTwits(userId, 7, itemListTwits).then((twits) => {
        twitsStore.setTwits(twitsStore.twits.concat(twits));

        setShowMoreTwits(false);

        if (twits.length < 7) {
          setShowButton(false);
        }
      });
    } else {
      await getTwits(7, itemListTwits).then((twits) => {
        twitsStore.setTwits(twitsStore.twits.concat(twits));

        setShowMoreTwits(false);

        if (twits.length < 7) {
          setShowButton(false);
        }
      });
    }
  }
}
