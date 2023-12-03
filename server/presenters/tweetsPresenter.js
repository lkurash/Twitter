class TweetsPresenter {
  constructor(tweets) {
    this.tweets = tweets;
    this.tweet = {};
    this.tweetsForAuthUser = [];
  }

  createTweetDate(date) {
    const tweetDate = new Date(date).toString().split(" ");

    return `${tweetDate[2]} ${tweetDate[1]}. ${tweetDate[3]}`;
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
          about: tweet.user.about,
        },
        userRetweets: tweet.tweet_user && {
          id: tweet.tweet_user.id,
          user_name: tweet.tweet_user.user_name,
          photo: tweet.tweet_user.photo,
          about: tweet.tweet_user.about,
        },

        tweet_createDate: this.createTweetDate(tweet.createdAt),
        authUserFavorite:
          tweet.favorite_tweets && tweet.favorite_tweets.id != null,
        authUserLike: tweet.likes && tweet.likes.id != null,
        authUserRetweets: tweet.retweets && tweet.retweets.id != null,
      };

      this.tweetsForAuthUser.push(this.tweet);
    });
    return this.tweetsForAuthUser;
  }
}

module.exports = TweetsPresenter;
