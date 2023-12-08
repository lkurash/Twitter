const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const uuid = require("uuid");
const path = require("path");
const TweetsPresenter = require("../presenters/tweetsPresenter");
const helpers = require("./helpers");

const db = require("../models");
const ApiError = require("../error/ApiError");

const deleteActions = async (tweetId) => {
  await db.Likes.destroy({ where: { tweetId: tweetId } });

  await db.Comments.destroy({ where: { tweetId: tweetId } });

  await db.Favorite_tweets.destroy({ where: { tweetId: tweetId } });
};

class DbRequestActionsTweet {
  async getCountLikes(tweetId) {
    const count = await db.Likes.count({
      where: { tweetId: tweetId },
    });

    const countLikes = await db.Tweets.update(
      {
        countLikes: +count,
      },
      {
        where: { id: tweetId },
      }
    );

    const tweet = await db.Tweets.findOne({
      where: { id: tweetId },
    });

    return tweet;
  }

  async likeTweetByUser(tweetId, userId) {
    const likedTweet = await db.Likes.create({
      userId: userId,
      tweetId: tweetId,
      like: true,
    });

    return likedTweet;
  }

  async deleteLike(tweetId, userId) {
    const dislikeTweet = await db.Likes.findOne({
      where: { tweetId: tweetId, userId: userId },
    });

    if (dislikeTweet) {
      const disLike = await db.Likes.destroy({
        where: { tweetId: tweetId, userId: userId },
      });

      return dislikeTweet;
    }
  }

  async createFavoriteTweetByUser(tweetId, userId) {
    const favoriteTweet = await db.Favorite_tweets.create({
      userId: userId,
      tweetId: tweetId,
      bookmark: true,
    });

    return favoriteTweet;
  }

  async deleteBookmark(tweetId, userId) {
    const favoriteTweet = await db.Favorite_tweets.findOne({
      where: { tweetId: tweetId, userId: userId },
    });

    if (favoriteTweet) {
      const deleteFavoriteTweet = await db.Favorite_tweets.destroy({
        where: { tweetId: tweetId, userId: userId },
      });

      return favoriteTweet;
    }
  }

  async createRetweetByUser(tweetId, userId, tweetUserId, text, img) {
    const retweet = await db.Tweets.create({
      userId: userId,
      tweetId: tweetId,
      text,
      img,
      retweet: true,
      tweetUserId: tweetUserId,
    });
    return retweet;
  }

  async deleteRetweetByUser(retweetId, userId) {
    const retweetFoundId = await db.Tweets.findOne({
      where: { id: +retweetId, userId: +userId, retweet: true },
    });
    const retweetFoundTweetId = await db.Tweets.findOne({
      where: { tweetId: +retweetId, userId: +userId, retweet: true },
    });

    if (retweetFoundId) {
      await db.Tweets.destroy({
        where: { id: retweetId, userId: userId, retweet: true },
      });

      return retweetFoundId;
    } else if (retweetFoundTweetId) {
      await db.Tweets.destroy({
        where: { tweetId: retweetId, userId: userId },
      });
      return retweetFoundTweetId;
    }
  }

  async getCountRetweets(tweetId) {
    if (tweetId) {
      const count = await db.Tweets.count({
        where: { tweetId: tweetId, retweet: true },
      });

      await db.Tweets.update(
        {
          countRetweets: +count,
        },
        {
          where: { id: tweetId, retweet: false },
        }
      );

      await db.Tweets.update(
        {
          countRetweets: +count,
        },
        {
          where: { tweetId: tweetId, retweet: true },
        }
      );

      const tweet = await db.Tweets.findOne({
        where: { id: tweetId, retweet: false },
      });

      return tweet;
    }
  }

  async createCommentByUser(tweetId, userId, text) {
    if (text) {
      const comment = await db.Comments.create({
        userId: userId,
        tweetId: tweetId,
        text,
      });

      return comment;
    }
  }

  async getCountComments(tweetId) {
    if (tweetId) {
      const count = await db.Comments.count({
        where: { tweetId: tweetId },
      });

      const countComments = await db.Tweets.update(
        {
          countComments: +count,
        },
        {
          where: { id: tweetId },
        }
      );

      return { countComments: +count };
    }
  }
}

module.exports = new DbRequestActionsTweet();
