class ChangingTweets {
  bookmark(tweets, bookmark) {
    tweets.map((tweet) => {
      if (tweet.id === bookmark.tweetId) {
        tweet.authUserFavorite = !tweet.authUserFavorite;
      }
      return tweets;
    });
    return tweets;
  }

  like(tweets, like) {
    tweets.map((tweet) => {
      if (tweet.id === like.id) {
        tweet.countLikes = like.countLikes;
        tweet.authUserLike = !tweet.authUserLike;
      }
      return tweets;
    });
    return tweets;
  }

  addRetweet(tweets, retweet) {
    tweets.unshift(retweet);

    tweets.map((tweet) => {
      if (tweet.id === retweet.tweetId) {
        tweet.authUserRetweets = !tweet.authUserRetweets;
        tweet.countRetweets = retweet.countRetweets;
      }
      if (tweet.id === retweet.id) {
        tweet.authUserRetweets = !tweet.authUserRetweets;
        tweet.countRetweets = retweet.countRetweets;
      }
      return tweets;
    });
    return tweets;
  }

  deleteRetweet(tweets, retweet) {
    let originalTweetsIndex = tweets.findIndex(
      (tweet) => tweet.id === retweet.tweet.tweetId
    );

    let retweetsIndex = tweets.findIndex(
      (tweet) => tweet.id === retweet.tweet.id
    );

    tweets[originalTweetsIndex].authUserRetweets = false;
    tweets[originalTweetsIndex].countRetweets = retweet.count;
    tweets.splice(retweetsIndex, 1);

    return tweets;
  }

  deleteTweet(tweets, deletedTweet) {
    let tweetIndex = tweets.findIndex((tweet) => tweet.id === deletedTweet.id);

    tweets.splice(tweetIndex, 1);

    return tweets;
  }
}

export const changingTweets = new ChangingTweets();
