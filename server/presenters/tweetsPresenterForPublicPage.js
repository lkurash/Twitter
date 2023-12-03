class TweetsPresenterForPublicPage {
  constructor(tweets) {
    this.tweets = tweets;
    this.tweet = {};
    this.tweetsForPublicPage = [];
  }

  toJSON() {
    this.tweets.forEach((tweet) => {
      this.tweet = {
        id: tweet.id,
        img: tweet.img ? tweet.img.split(",") : tweet.img,
        countLikes: tweet.countLikes,
        countRetweets: tweet.countRetweets,
        countComments: tweet.countComments,
        retweet: tweet.retweet,
        text: tweet.text,
        tweetId: tweet.tweetId,
        tweetUserId: tweet.tweetUserId,
        userId: tweet.userId,
        userOriginalTweets: {
          id: tweet.user.id,
          user_name: tweet.user.user_name,
          photo: tweet.user.photo,
        },
        userRetweets: {
          id: tweet.tweet_user ? tweet.tweet_user.id : null,
          user_name: tweet.tweet_user ? tweet.tweet_user.user_name : null,
          photo: tweet.tweet_user ? tweet.tweet_user.photo : null,
        },
      };

      this.tweetsForPublicPage.push(this.tweet);
    });
    return this.tweetsForPublicPage;
  }
}

module.exports = TweetsPresenterForPublicPage;
