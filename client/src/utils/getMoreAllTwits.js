import twitsApi from "../http/twitsApi";

export default async function getMoreAllTwits(
  showMoreTwits,
  itemListTwits,
  twitsStore,
  setShowMoreTwits,
  setShowButton
) {
  if (showMoreTwits) {
    await twitsApi.getAllTwits(7, itemListTwits).then((alltwits) => {
      twitsStore.setTwits(twitsStore.twits.concat(alltwits));
      
      setShowMoreTwits(false);

      if (alltwits.length < 7) {
        setShowButton(false);
      }
    });
  }
}
