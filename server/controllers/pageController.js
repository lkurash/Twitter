const db = require("../models");
const FollowingsUserPresenter = require("../presenters/followingsUserPresenter");
const jwt = require("jsonwebtoken");
const UserPresenter = require("../presenters/userPresenter");
const dbRequestFollowers = require("../sql/dbRequestFollowers");
const userController = require("./userController");
const FollowersUserPresenter = require("../presenters/followersUserPresenter");
const ApiError = require("../error/ApiError");

const decodeUser = (request) => {
  const token = request.headers.authorization.split(" ")[1];
  const decodeUser = jwt.decode(token);

  return decodeUser;
};

class PageController {
  async getUser(request, response, next) {
    try {
      const { userId } = request.params;

      const userProfile = await db.User.findOne({
        where: { id: userId },
        include: [
          {
            model: db.Following,
            as: "followings_user",
          },
          {
            model: db.Following,
            as: "followers_user",
          },
        ],
      });

      const followers = await db.Following.findAll({
        where: {
          userId: userId,
        },
        include: {
          model: db.User,
          as: "user",
        },
      });

      const followings = await dbRequestFollowers(decodeUser, request);

      const userPresenter = new UserPresenter(userProfile);
      const followersPresenter = new FollowingsUserPresenter(followers);
      const followingsPresenter = new FollowersUserPresenter(followings);

      return response.json({
        profile: userPresenter.toJSON(),
        followers: followersPresenter.toJSON(),
        followings: followingsPresenter.toJSON(),
      });
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }
}

const pageController = new PageController();

module.exports = new PageController();
