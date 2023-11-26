export default async function getMoreTwits(
  showMoreTwits,
  dispatch,
  getTwits,
  itemListTwits,
  userId
) {
  if (showMoreTwits) {
    if (userId) {
      dispatch(getTwits(userId, 7, itemListTwits));
    } else {
      dispatch(getTwits(7, itemListTwits));
    }
  }
}
