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

class TwitsController {
  async createTwitByUser(request, response, next) {
    try {
      const { text } = request.body;

      const file = request.files;
      const user = decodeUser(request);
      const UserId = user.id;

      if (file) {
        const { img } = request.files;
        let fileName = uuid.v4() + ".jpg";

        img.mv(path.resolve(__dirname, "..", "static", fileName));
        const newTwit = await Twits.create({ text, img: fileName, UserId });

        const twit = await Twits.findOne({
          include: [
            { model: User, as: "user" },
            { model: User, as: "twitUser" },
            { model: Likes },
            { model: Favorite_twits },
            { model: Comments },
          ],
          where: { id: newTwit.id },
        });

        return response.json([twit]);
      } else {
        const newTwit = await Twits.create({ text, UserId });

        const twit = await Twits.findOne({
          include: [
            { model: User, as: "user" },
            { model: User, as: "twitUser" },
            { model: Likes },
            { model: Favorite_twits },
            { model: Comments },
          ],
          where: { id: newTwit.id },
        });

        return response.json([twit]);
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async getTwitsByUser(request, response, next) {
    try {
      const { userId } = request.params;
      let { limit, list } = request.query;
      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      const twits = await Twits.findAll({
        order: [["id", "DESC"]],
        include: [
          { model: User, as: "user" },
          { model: User, as: "twitUser" },
          { model: Likes },
          { model: Favorite_twits },
          { model: Comments },
        ],
        where: { UserId: userId },
        limit: limit,
        offset: offset,
      });

      return response.json(twits);
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async getTwitsByFollowingUsers(request, response, next) {
    try {
      const Op = Sequelize.Op;
      const { userId } = request.params;
      let { limit, list } = request.query;
      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      const followingUserId = await Following.findAll({
        attributes: ["followUserId"],
        where: { UserId: userId },
        raw: true,
      });

      const ids = [userId];

      if (followingUserId) {
        followingUserId.map((item) => {
          return ids.push(item.followUserId);
        });
      }

      const twits = await Twits.findAll({
        order: [["id", "DESC"]],
        where: { UserId: { [Op.in]: ids } },
        include: [
          { model: User, as: "user" },
          { model: User, as: "twitUser" },
          { model: Likes },
          { model: Favorite_twits },
          { model: Comments },
        ],
        limit: limit,
        offset: offset,
      });

      return response.json(twits);
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async gelAllTwits(request, response) {
    let { limit, list } = request.query;
    limit = limit || 7;
    list = list || 1;
    let offset = list * limit - limit;

    const twits = await Twits.findAll({
      order: [["id", "DESC"]],
      include: [
        { model: User, as: "user" },
        { model: User, as: "twitUser" },
        { model: Likes },
        { model: Favorite_twits },
        { model: Comments },
      ],
      limit: limit,
      offset: offset,
    });

    return response.json(twits);
  }

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

        response.json(checkLike);
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

        return response.json(countLikes);
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

  async getFavoriteTwitByUser(request, response, next) {
    try {
      const { userId } = request.params;

      checkUsersAuth(request, userId, next);

      const favoriteTwits = await Favorite_twits.findAll({
        where: { UserId: userId },
        include: [
          {
            model: Twits,
            include: [
              { model: User, as: "user" },
              { model: User, as: "twitUser" },
              { model: Likes },
              { model: Favorite_twits },
              { model: Comments },
            ],
          },
        ],
      });

      return response.json(favoriteTwits);
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
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

      const checkRetwit = await Twits.findOne({
        where: { twitId: twitId, UserId: userId, retwit: true },
      });

      if (checkRetwit) {
        await Twits.destroy({
          where: { twitId: twitId, UserId: userId, retwit: true },
        });

        response.json(checkRetwit);
      }
      if (!checkRetwit) {
        const retwit = await Twits.create({
          UserId: userId,
          twitId: twitId,
          text,
          img,
          retwit: true,
          twitUserId: twitUserId,
        });

        return response.json(retwit);
      }
    } catch (error) {
      next(ApiError.badRequest("Check userId or twit.id"));
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

  async getCommentsByUser(request, response, next) {
    try {
      const { userId } = request.params;
      const coments = await Comments.findAll({
        where: { UserId: userId },
        include: [
          {
            model: Twits,
            include: [
              { model: User, as: "user" },
              { model: User, as: "twitUser" },
              { model: Likes },
              { model: Favorite_twits },
              { model: Comments },
            ],
          },
          {
            model: User,
            as: "user",
          },
        ],
      });

      return response.json(coments);
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
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

        return response.json(countRetwits);
      }
    } catch (error) {
      next(ApiError.badRequest("Check twit.id"));
    }
  }

  async deleteTwit(request, response, next) {
    try {
      const twitId = request.params.twitId;
      const twit = await Twits.findOne({
        where: { id: twitId },
      });
      const like = await Likes.findAll({ where: { TwitId: twitId } });
      const bookmark = await Favorite_twits.findAll({
        where: { TwitId: twitId },
      });
      const comment = await Comments.findAll({ where: { TwitId: twitId } });

      if (twit) {
        await Twits.destroy({
          where: { id: twitId },
        });

        if (like) {
          await Likes.destroy({ where: { TwitId: twitId } });
        }
        if (comment) {
          await Comments.destroy({ where: { TwitId: twitId } });
        }
        if (bookmark) {
          await Favorite_twits.destroy({ where: { TwitId: twitId } });
        }

        return response.json(twit);
      }
    } catch (error) {
      next(ApiError.badRequest("Check twit.id"));
    }
  }
}

module.exports = new TwitsController();
