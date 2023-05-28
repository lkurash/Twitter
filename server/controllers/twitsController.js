const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const path = require("path");
const models = require('../models/index');
const Twits = models.Twits;
const User = models.User;
const Likes = models.Likes;
const Comments = models.Comments;
const Retwit = models.Retwit;
const Favorite_twits = models.Favorite_twits;
const Following = models.Following;

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
      const UserId = user.id;

      if (file) {
        const { img } = request.files;
        let fileName = uuid.v4() + ".jpg";

        img.mv(path.resolve(__dirname, "..", "static", fileName));
        const twit = await Twits.create({ text, img: fileName, UserId });
      } else {
        const twit = await Twits.create({ text, UserId });

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
            { model: User },
            { model: Likes },
            { model: Retwit },
            { model: Favorite_twits },
            { model: Comments },
          ],
          where: { UserId: id },
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
        { model: User },
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
      const { TwitId } = request.body;

      const user = decodeUser(request);
      const UserId = user.id;

      const checkLike = await Likes.findOne({
        where: { TwitId: TwitId, UserId: UserId },
      });

      if (checkLike) {
        const disLike = await Likes.destroy({
          where: { TwitId: TwitId, UserId: UserId },
        });

        response.json(checkLike);
      }
      if (!checkLike) {
        const like = await Likes.create({ UserId, TwitId, like: true });

        return response.json(like);
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id or twit.id"));
    }
  }

  async createFavoriteTwitByUser(request, response, next) {
    try {
      const { TwitId } = request.body;

      const user = decodeUser(request);
      const UserId = user.id;

      const checkFavoriteTwits = await Favorite_twits.findOne({
        where: { TwitId: TwitId, UserId: UserId },
      });

      if (checkFavoriteTwits) {
        const deleteFavoriteTwit = await Favorite_twits.destroy({
          where: { TwitId: TwitId, UserId: UserId },
        });

        response.json(checkFavoriteTwits);
      }
      if (!checkFavoriteTwits) {
        const favoriteTwit = await Favorite_twits.create({
          UserId,
          TwitId,
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
      const UserId = user.id;
      const favoriteTwits = await Favorite_twits.findAll({
        where: { UserId },
        include: [
          {
            model: Twits,
            include: [
              { model: User},
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
      const { TwitId } = request.body;

      const user = decodeUser(request);
      const UserId = user.id;

      const checkRetwit = await Retwit.findOne({
        where: { TwitId: TwitId, UserId: UserId },
      });

      if (checkRetwit) {
        const deleteRetwit = await Retwit.destroy({
          where: { TwitId: TwitId, UserId: UserId },
        });

        response.json(checkRetwit);
      }
      if (!checkRetwit) {
        const retwit = await Retwit.create({ UserId, TwitId, retwit: true });

        return response.json(retwit);
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id or twit.id"));
    }
  }

  async createCommentByUser(request, response, next) {
    try {
      const { TwitId, text } = request.body;

      const user = decodeUser(request);
      const UserId = user.id;

      if (text) {
        const comment = await Comments.create({ UserId, TwitId, text });

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
        where: { UserId: id },
        include: [
          {
            model: Twits,
            include: [
              { model: User },
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
          where: { UserId: id },
          include: [
            {
              model: Twits,
              include: [
                { model: User},
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
