const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  Twits,
  User,
  Likes,
  Retwit,
  Favorite_twits,
  Comments,
} = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const { model } = require("../dataBase");

const decodeUser = (request) => {
  const token = request.headers.authorization.split(" ")[1];
  const decodeUser = jwt.decode(token);

  return decodeUser;
};

class TwitsController {
  async createTwitByUser(request, response, next) {
    try {
      const { text, date } = request.body;

      const file = request.files;
      const user = decodeUser(request);
      const userId = user.id;

      if (file) {
        const { img } = request.files;
        let fileName = uuid.v4() + ".jpg";

        img.mv(path.resolve(__dirname, "..", "static", fileName));
        const twit = await Twits.create({ text, img: fileName, userId });
      } else {
        const twit = await Twits.create({ text, userId });

        return response.json(twit);
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async getTwitsByUser(request, response, next) {
    try {
      const { id } = request.params;

      if (id) {
        const twits = await Twits.findAll({
          order: [["id", "DESC"]],
          include: [
            { model: User, as: "User" },
            { model: Likes },
            { model: Retwit },
            { model: Favorite_twits },
            { model: Comments },
          ],
          where: { userId: id },
        });

        return response.json(twits);
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async gelAllTwits(request, response) {
    const twits = await Twits.findAll({
      order: [["id", "DESC"]],
      include: [
        { model: User, as: "User" },
        { model: Likes },
        { model: Retwit },
        { model: Favorite_twits },
        { model: Comments },
      ],
    });

    return response.json(twits);
  }

  async createLikeTwitByUser(request, response, next) {
    try {
      const { twitId } = request.body;

      const user = decodeUser(request);
      const userId = user.id;

      const checkLike = await Likes.findOne({
        where: { twitId: twitId, userId: userId },
      });

      if (checkLike) {
        const disLike = await Likes.destroy({
          where: { twitId: twitId, userId: userId },
        });

        response.json(checkLike);
      }
      if (!checkLike) {
        const like = await Likes.create({ userId, twitId, like: true });

        return response.json(like);
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id or twit.id"));
    }
  }

  async createFavoriteTwitByUser(request, response, next) {
    try {
      const { twitId } = request.body;

      const user = decodeUser(request);
      const userId = user.id;

      const checkFavoriteTwits = await Favorite_twits.findOne({
        where: { twitId: twitId, userId: userId },
      });

      if (checkFavoriteTwits) {
        const deleteFavoriteTwit = await Favorite_twits.destroy({
          where: { twitId: twitId, userId: userId },
        });

        response.json(checkFavoriteTwits);
      }
      if (!checkFavoriteTwits) {
        const favoriteTwit = await Favorite_twits.create({
          userId,
          twitId,
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
      const user = decodeUser(request);
      const userId = user.id;
      const favoriteTwits = await Favorite_twits.findAll({
        where: { userId },
        include: [
          {
            model: Twits,
            include: [
              { model: User, as: "User" },
              { model: Likes },
              { model: Retwit },
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
      const { twitId } = request.body;

      const user = decodeUser(request);
      const userId = user.id;

      const checkRetwit = await Retwit.findOne({
        where: { twitId: twitId, userId: userId },
      });

      if (checkRetwit) {
        const deleteRetwit = await Retwit.destroy({
          where: { twitId: twitId, userId: userId },
        });

        response.json(checkRetwit);
      }
      if (!checkRetwit) {
        const retwit = await Retwit.create({ userId, twitId, retwit: true });

        return response.json(retwit);
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id or twit.id"));
    }
  }

  async createCommentByUser(request, response, next) {
    try {
      const { twitId, text } = request.body;

      const user = decodeUser(request);
      const userId = user.id;

      if (text) {
        const comment = await Comments.create({ userId, twitId, text });

        return response.json(comment);
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id or twit.id"));
    }
  }

  async getCommentsByUser(request, response, next) {
    try {
      const { id } = request.params;
      const coments = await Comments.findAll({
        where: { userId: id },
        include: [
          {
            model: Twits,
            include: [
              { model: User, as: "User" },
              { model: Likes },
              { model: Retwit },
              { model: Favorite_twits },
              { model: Comments },
            ],
          },
        ],
      });

      return response.json(coments);
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async getRetwitsByUser(request, response, next) {
    try {
      const { id } = request.params;

      if (id) {
        const retwits = await Retwit.findAll({
          where: { userId: id },
          include: [
            {
              model: Twits,
              include: [
                { model: User, as: "User" },
                { model: Likes },
                { model: Retwit },
                { model: Favorite_twits },
                { model: Comments },
              ],
            },
          ],
        });

        return response.json(retwits);
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async deleteTwit(request, response, next) {
    try {
      const { id } = request.body;
      const twit = await Twits.findOne({ where: { id } });

      if (twit) {
        await Twits.destroy({ where: { id } });
        return response.json(twit);
      }
    } catch (error) {
      next(ApiError.badRequest("Check twit.id"));
    }
  }
}

module.exports = new TwitsController();
