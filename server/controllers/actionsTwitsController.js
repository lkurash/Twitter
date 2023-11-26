const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const uuid = require("uuid");
const path = require("path");
const TwitsPresenter = require("../presenters/twitsPresenter");

const models = require("../models/index");
const ApiError = require("../error/ApiError");
const Twits = models.Twits;
const User = models.User;
const Likes = models.Likes;
const Comments = models.Comments;
const Favorite_twits = models.Favorite_twits;
const Following = models.Following;

const decodeUser = (request) => {
  const token = request.headers.authorization.split(" ")[1];
  const decodeUser = jwt.decode(token);

  return decodeUser;
};

const checkUsersAuth = (request, userId, next) => {
  const user = decodeUser(request);
  const userIdToken = user.id;

  if (userIdToken !== parseInt(userId)) {
    next(ApiError.badRequest(`Check authentication ${userId}`));
  }
};

const deleteActions = async (twitId) => {
  await Likes.destroy({ where: { twitId: twitId } });

  await Comments.destroy({ where: { twitId: twitId } });

  await Favorite_twits.destroy({ where: { twitId: twitId } });
};

class ActionsTwitsController {
  
  async getCountLikes(twitId) {
    const count = await Likes.count({
      where: { twitId: twitId },
    });

    const countLikes = await Twits.update(
      {
        countLikes: +count,
      },
      {
        where: { id: twitId },
      }
    );

    const twit = await Twits.findOne({
      where: { id: twitId },
    });

    return twit;
  }

  async likeTwitByUser(twitId, userId) {
    const likedTweet = await Likes.create({
      userId: userId,
      twitId: twitId,
      like: true,
    });

    return likedTweet;
  }

  async deleteLike(twitId, userId) {
    const dislikeTweet = await Likes.findOne({
      where: { twitId: twitId, userId: userId },
    });

    if (dislikeTweet) {
      const disLike = await Likes.destroy({
        where: { twitId: twitId, userId: userId },
      });

      return dislikeTweet;
    }
  }

  async createFavoriteTwitByUser(request, response, next) {
    try {
      const { twitId } = request.params;
      const { userId } = request.params;
      checkUsersAuth(request, userId, next);

      const favoriteTwit = await Favorite_twits.create({
        userId: userId,
        twitId: twitId,
        bookmark: true,
      });

      return response.json(favoriteTwit);
    } catch (error) {
      next(ApiError.badRequest("Check user.id or twit.id"));
    }
  }

  async deleteBookmark(request, response, next) {
    try {
      const { twitId } = request.params;
      const { userId } = request.params;

      checkUsersAuth(request, userId, next);

      const checkFavoriteTwits = await Favorite_twits.findOne({
        where: { twitId: twitId, userId: userId },
      });

      if (checkFavoriteTwits) {
        const deleteFavoriteTwit = await Favorite_twits.destroy({
          where: { twitId: twitId, userId: userId },
        });

        response.json(checkFavoriteTwits);
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id or twit.id"));
    }
  }

  async createRetwitByUser(twitId, userId, twitUserId, text, img) {
    const retweet = await Twits.create({
      userId: userId,
      twitId: twitId,
      text,
      img,
      retwit: true,
      twitUserId: twitUserId,
    });
    return retweet;
  }

  async deleteRetwitByUser(retwitId, userId) {
    const retwitFoundId = await Twits.findOne({
      where: { id: +retwitId, userId: +userId, retwit: true },
    });
    const retwitFoundTwitId = await Twits.findOne({
      where: { twitId: +retwitId, userId: +userId, retwit: true },
    });

    if (retwitFoundId) {
      await Twits.destroy({
        where: { id: retwitId, userId: userId, retwit: true },
      });

      return retwitFoundId;
    } else if (retwitFoundTwitId) {
      await Twits.destroy({
        where: { twitId: retwitId, userId: userId },
      });
      return retwitFoundTwitId;
    }
  }

  async getCountRetwits(twitId) {
    const Op = Sequelize.Op;

    if (twitId) {
      const count = await Twits.count({
        where: { twitId: twitId, retwit: true },
      });

      await Twits.update(
        {
          countRetwits: +count,
        },
        {
          where: { id: twitId, retwit: false },
        }
      );

      await Twits.update(
        {
          countRetwits: +count,
        },
        {
          where: { twitId: twitId, retwit: true },
        }
      );

      const twit = await Twits.findOne({
        where: { id: twitId, retwit: false },
      });

      return twit;
    }
  }

  async createCommentByUser(twitId, userId, text) {
    if (text) {
      const comment = await Comments.create({
        userId: userId,
        twitId: twitId,
        text,
      });

      return comment;
    }
  }

  async getCountComments(twitId) {
    if (twitId) {
      const count = await Comments.count({
        where: { twitId: twitId },
      });

      const countComments = await Twits.update(
        {
          countComments: +count,
        },
        {
          where: { id: twitId },
        }
      );

      return { countComments: +count };
    }
  }
}

module.exports = new ActionsTwitsController();
