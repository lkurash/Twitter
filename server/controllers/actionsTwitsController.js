const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const uuid = require("uuid");
const path = require("path");

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
  await Likes.destroy({ where: { TwitId: twitId } });

  await Comments.destroy({ where: { TwitId: twitId } });

  await Favorite_twits.destroy({ where: { TwitId: twitId } });
};

class ActionsTwitsController {
  async createLikeTwitByUser(request, response, next) {
    try {
      const { twitId } = request.params;
      const { userId } = request.params;

      checkUsersAuth(request, userId, next);

      const checkLike = await Likes.findOne({
        where: { TwitId: twitId, UserId: userId },
      });

      if (checkLike) {
        const disLike = await Likes.destroy({
          where: { TwitId: twitId, UserId: userId },
        });

        response.json(disLike);
      }
      if (!checkLike) {
        const like = await Likes.create({
          UserId: userId,
          TwitId: twitId,
          like: true,
        });

        return response.json(like);
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id or twit.id"));
    }
  }

  async getCountLikes(request, response, next) {
    try {
      const { twitId } = request.params;

      if (twitId) {
        const count = await Likes.count({
          where: { TwitId: twitId },
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

        return response.json(twit);
      }
    } catch (error) {
      next(ApiError.badRequest("Check twit.id"));
    }
  }

  async createFavoriteTwitByUser(request, response, next) {
    try {
      const { twitId } = request.params;
      const { userId } = request.params;

      checkUsersAuth(request, userId, next);

      const checkFavoriteTwits = await Favorite_twits.findOne({
        where: { TwitId: twitId, UserId: userId },
      });

      if (checkFavoriteTwits) {
        const deleteFavoriteTwit = await Favorite_twits.destroy({
          where: { TwitId: twitId, UserId: userId },
        });

        response.json(checkFavoriteTwits);
      }
      if (!checkFavoriteTwits) {
        const favoriteTwit = await Favorite_twits.create({
          UserId: userId,
          TwitId: twitId,
          bookmark: true,
        });

        return response.json(favoriteTwit);
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id or twit.id"));
    }
  }

  async createRetwitByUser(request, response, next) {
    try {
      const { twitId } = request.params;
      const { userId } = request.params;
      const { twitUserId } = request.body;
      const { text } = request.body;
      const { img } = request.body;

      checkUsersAuth(request, userId, next);

      const retweetedTwit = await Twits.findOne({
        where: { twitId: twitId, UserId: userId, retwit: true },
      });

      const retwit = await Twits.findOne({
        where: { id: twitId, UserId: userId, retwit: true },
      });

      if (retweetedTwit) {
        await Twits.destroy({
          where: { twitId: twitId, UserId: userId, retwit: true },
        });

        deleteActions(twitId);

        return response.json(null);
      }

      if (retwit) {
        await Twits.destroy({
          where: { id: twitId, UserId: userId, retwit: true },
        });

        deleteActions(twitId);

        return response.json(null);
      }

      if (!retweetedTwit) {
        const retwit = await Twits.create({
          UserId: userId,
          twitId: twitId,
          text,
          img,
          retwit: true,
          twitUserId: twitUserId,
        });

        const twit = await Twits.findOne({
          include: [
            { model: User, as: "user" },
            { model: User, as: "twitUser" },
            { model: Likes },
            { model: Favorite_twits },
            { model: Comments },
          ],
          where: { id: retwit.id },
        });

        return response.json([twit]);
      }
    } catch (error) {
      next(ApiError.badRequest("Check userId or twit.id"));
    }
  }

  async getCountRetwits(request, response, next) {
    try {
      const { twitId } = request.params;

      if (twitId) {
        const count = await Twits.count({
          where: { twitId: twitId, retwit: true },
        });

        const countRetwits = await Twits.update(
          {
            countRetwits: +count,
          },
          {
            where: { id: twitId, retwit: false },
          }
        );

        const twit = await Twits.findOne({
          where: { id: twitId, retwit: false },
        });

        return response.json(twit);
      }
    } catch (error) {
      next(ApiError.badRequest("Check twit.id"));
    }
  }

  async createCommentByUser(request, response, next) {
    try {
      const { twitId } = request.params;
      const { userId } = request.params;

      checkUsersAuth(request, userId, next);

      const { text } = request.body;

      if (text) {
        const comment = await Comments.create({
          UserId: userId,
          TwitId: twitId,
          text,
        });

        return response.json(comment);
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id or twit.id"));
    }
  }

  async getCountComments(request, response, next) {
    try {
      const { twitId } = request.params;

      if (twitId) {
        const count = await Comments.count({
          where: { TwitId: twitId },
        });

        const countComments = await Twits.update(
          {
            countComments: +count,
          },
          {
            where: { id: twitId },
          }
        );

        return response.json(countComments);
      }
    } catch (error) {
      next(ApiError.badRequest("Check twit.id"));
    }
  }
}

module.exports = new ActionsTwitsController();
