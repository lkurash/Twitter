class tweetsWithUserLikesPresenter {
  constructor(tweets) {
    this.likes = tweets;
    this.tweet = {};
    this.tweetsWithUserLikesPresenter = [];
  }

  toJSON() {
    this.likes.forEach((like) => {
      this.tweet = {
        id: like.tweet.id,
        img: like.tweet.img ? like.tweet.img.split(",") : like.tweet.img,
        countLikes: like.tweet.countLikes,
        countRetweets: like.tweet.countRetweets,
        countComments: like.tweet.countComments,
        retweet: like.tweet.retweet,
        text: like.tweet.text,
        tweetId: like.tweet.tweetId,
        tweetUserId: like.tweet.tweetUserId,
        userId: like.tweet.userId,
        userOriginalTweets: {
          id: like.tweet.user.id,
          user_name: like.tweet.user.user_name,
          photo: like.tweet.user.photo,
        },
        userRetweets: {
          id: like.tweet.tweet_user.id,
          user_name: like.tweet.tweet_user.user_name,
          photo: like.tweet.tweet_user.photo,
        },
        authUserFavorite: like.tweet.favorite_tweets.id != null,
        authUserLike: like.tweet.likes.id != null,
        authUserRetweets: like.tweet.retweets.id != null,
      };
      this.tweetsWithUserLikesPresenter.push(this.tweet);
    });
    return this.tweetsWithUserLikesPresenter;
  }
}

module.exports = tweetsWithUserLikesPresenter;
