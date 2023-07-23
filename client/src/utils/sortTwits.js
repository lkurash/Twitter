const sort = (userTwits) => {
  userTwits.sort((a, b) => {
    const dateOne = new Date(a.createdAt);
    const dateTwo = new Date(b.createdAt);

    return dateTwo - dateOne;
  });
};

export default function sortTwits(twits) {
  const userTwits = [];

  for (let index = 0; index < arguments.length; index++) {
    if (arguments[index]) {
      arguments[index].forEach((twit) => {
        userTwits.push(twit);
      });
    }
  }

  sort(userTwits);

  return userTwits;
}
