const sort = (userTweets) => {
  userTweets.sort((a, b) => {
    const dateOne = new Date(a.createdAt);
    const dateTwo = new Date(b.createdAt);

    return dateTwo - dateOne;
  });
};

export default function sortTweets(tweets) {
  const userTweets = [];

  for (let index = 0; index < arguments.length; index++) {
    if (arguments[index]) {
      arguments[index].forEach((tweet) => {
        userTweets.push(tweet);
      });
    }
  }

  sort(userTweets);

  return userTweets;
}
