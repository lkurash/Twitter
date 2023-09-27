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
  await Likes.destroy({ where: { twitId: twitId } });

  await Comments.destroy({ where: { twitId: twitId } });

  await Favorite_twits.destroy({ where: { twitId: twitId } });
};

class ActionsTwitsController {
  async createLikeTwitByUser(request, response, next) {
    try {
      const { twitId } = request.params;
      const { userId } = request.params;

      checkUsersAuth(request, userId, next);

      const checkLike = await Likes.findOne({
        where: { twitId: twitId, userId: userId },
      });

      if (checkLike) {
        const disLike = await Likes.destroy({
          where: { twitId: twitId, userId: userId },
        });

        response.json(null);
      }
      if (!checkLike) {
        const like = await Likes.create({
          userId: userId,
          twitId: twitId,
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
        where: { twitId: twitId, userId: userId },
      });

      if (checkFavoriteTwits) {
        const deleteFavoriteTwit = await Favorite_twits.destroy({
          where: { twitId: twitId, userId: userId },
        });

        response.json(null);
      }
      if (!checkFavoriteTwits) {
        const favoriteTwit = await Favorite_twits.create({
          userId: userId,
          twitId: twitId,
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
        where: { twitId: twitId, userId: userId, retwit: true },
      });

      const retwit = await Twits.findOne({
        where: { id: twitId, userId: userId, retwit: true },
      });

      if (!retweetedTwit) {
        const retwit = await Twits.create({
          userId: userId,
          twitId: twitId,
          text,
          img,
          retwit: true,
          twitUserId: twitUserId,
        });

        const twit = await Twits.findOne({
          include: [
            { model: User, as: "user" },
            { model: User, as: "twit_user" },
            { model: Likes, as: "likes" },
            { model: Twits, as: "retwits" },
            { model: Favorite_twits, as: "favorite_twits" },
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

  async deleteRetwitByUser(request, response, next) {
    try {
      const { retwitId } = request.params;
      const { userId } = request.params;

      checkUsersAuth(request, userId, next);

      const retwitWithRetwitId = await Twits.findOne({
        where: { id: +retwitId, userId: +userId, retwit: true },
      });
      const retwitWithOriginalTwitId = await Twits.findOne({
        where: { twitId: +retwitId, userId: +userId },
      });

      if (retwitWithRetwitId) {
        await Twits.destroy({
          where: { id: retwitId, userId: userId, retwit: true },
        });

        return response.json([
          {
            originalTwit: retwitWithRetwitId.twitId,

            retwit: retwitWithRetwitId.id,
          },
        ]);

      } else if (retwitWithOriginalTwitId) {
        await Twits.destroy({
          where: { twitId: retwitId, userId: userId },
        });
        return response.json([
          {
            originalTwit: retwitWithOriginalTwitId.twitId,

            retwit: retwitWithOriginalTwitId.id,
          },
        ]);
      }
    } catch (error) {
      next(ApiError.badRequest("Check userId or twit.id"));
    }
  }

  async getCountRetwits(request, response, next) {
    try {
      const Op = Sequelize.Op;

      const { twitId } = request.params;

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
          userId: userId,
          twitId: twitId,
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

        return response.json(countComments);
      }
    } catch (error) {
      next(ApiError.badRequest("Check twit.id"));
    }
  }
}

module.exports = new ActionsTwitsController();
