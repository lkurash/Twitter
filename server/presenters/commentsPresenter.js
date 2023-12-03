class CommentsPresenter {
  constructor(tweets) {
    this.comments = tweets;
    this.comment = {};
    this.userComments = [];
  }

  toJSON() {
    this.comments.forEach((comment) => {
      this.comment = {
        Tweet: comment.Tweet && {
          id: comment.tweetId,
          img: comment.Tweet.img
            ? comment.Tweet.img.split(",")
            : comment.Tweet.img,
          countLikes: comment.Tweet.countLikes,
          countRetweets: comment.Tweet.countRetweets,
          countComments: comment.Tweet.countComments,
          retweet: comment.Tweet.retweet,
          text: comment.Tweet.text,
          tweetId: comment.Tweet.tweetId,
          tweetUserId: comment.Tweet.tweetUserId,
          userId: comment.Tweet.userId,
          userOriginalTweets: {
            id: comment.Tweet.user.id,
            user_name: comment.Tweet.user.user_name,
            photo: comment.Tweet.user.photo,
            about: comment.Tweet.user.about,
          },
          userRetweets: comment.Tweet.tweet_user && {
            id: comment.Tweet.tweet_user.id,
            user_name: comment.Tweet.tweet_user.user_name,
            photo: comment.Tweet.tweet_user.photo,
            about: comment.Tweet.tweet_user.about,
          },
        },
        Comment: {
          id: comment.id,
          text: comment.text,
          user: {
            id: comment.user.id,
            user_name: comment.user.user_name,
            photo: comment.user.photo,
            about: comment.user.about,
          },
        },
        comment_createDate: comment.createdAt,
        authUserFavorite:
          comment.favorite_tweets && comment.favorite_tweets.id != null,
        authUserLike: comment.likes && comment.likes.id != null,
        authUserRetweets: comment.retweets && comment.retweets.id != null,
      };

      this.userComments.push(this.comment);
    });
    return this.userComments;
  }
}

module.exports = CommentsPresenter;
