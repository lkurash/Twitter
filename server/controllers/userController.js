const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const path = require("path");

const FollowersUserPresenter = require("../presenters/followersUserPresenter");
const FollowingsUserPresenter = require("../presenters/followingsUserPresenter");

const { QueryTypes } = require("sequelize");
const sequelize = new Sequelize(
  "twitter_development",
  "postgres",
  "qweqweqwe",
  {
    host: "127.0.0.1",
    dialect: "postgres",
  }
);

const SECRET_KEY = "super_secret_key22";
const SECRET_KEY_ACCESS_TOKEN = "super_secret_key22";
const SECRET_KEY_REFRESH_TOKEN = "super_secret_key";

const ApiError = require("../error/ApiError");
const models = require("../models/index");

const Twits = models.Twits;
const User = models.User;
const Likes = models.Likes;
const Comments = models.Comments;
const Favorite_twits = models.Favorite_twits;
const Following = models.Following;

const genereteAccessToken = (id, email) => {
  const accessToken = jwt.sign({ id, email }, SECRET_KEY, {
    expiresIn: "24h",
  });
  return accessToken;
};

const genereteRefreshToken = (email) => {
  const refreshToken = jwt.sign({ email }, SECRET_KEY, {
    expiresIn: "1h",
  });
  return refreshToken;
};

const decodeUser = (request) => {
  const token = request.headers.authorization.split(" ")[1];
  const decodeUser = jwt.decode(token);

  return decodeUser;
};

class UserController {
  async register(request, response, next) {
    try {
      const { name, email, password, role, birthdate } = request.body;

      if (!email || !password) {
        next(ApiError.badRequest("Email or Password error"));
      }
      const condidat = await User.findOne({ where: { email } });

      if (condidat) {
        next(ApiError.badRequest("User with email is registration"));
      }
      const hashpassword = await bcrypt.hash(password, 5);

      const user = await User.create({
        user_name: name,
        email,
        password: hashpassword,
        birthdate,
        role,
      });
      const token = genereteAccessToken(
        user.id,
        user.email,
        user.password,
        user.role
      );

      return response.json({ token, user });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async authentication(request, response, next) {
    try {
      const { email, password } = request.body;

      if (!email || !password) {
        next(ApiError.badRequest("Email or Password error"));
      }
      const user = await User.findOne({ where: { email } });

      if (!user) {
        next(ApiError.badRequest("User with email is not registration"));
      }
      const comparePassword = bcrypt.compareSync(password, user.password);

      if (!comparePassword) {
        next(ApiError.badRequest("Incorrect password"));
      }
      const token = genereteAccessToken(user.id, user.email);

      return response.json({ token, user });
    } catch (error) {
      next(ApiError.internal(error));
    }
  }

  async createRefreshToken(request, response, next) {
    try {
      const token = genereteRefreshToken(request.user.email);

      response.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return response.json({ token });
    } catch (error) {
      next(ApiError.badRequest("Check auth"));
    }
  }

  async updateUserProfile(request, response, next) {
    const { name, birthdate, web_site_url, about } = request.body;

    const { id } = request.params;

    const user = decodeUser(request);
    const userId = user.id;

    const file = request.files;

    if (userId !== parseInt(id)) {
      next(ApiError.badRequest("Check authentication"));
    }
    if (file) {
      if (file.photo) {
        let { photo } = request.files;
        let fileName = uuid.v4() + ".jpg";

        photo.mv(path.resolve(__dirname, "..", "static", fileName));

        const profileUpdate = await User.update(
          {
            photo: fileName,
          },
          {
            where: {
              id: userId,
            },
          }
        );
      }

      if (file.background) {
        let { background } = request.files;
        let fileName = uuid.v4() + ".jpg";

        background.mv(path.resolve(__dirname, "..", "static", fileName));

        const profileUpdate = await User.update(
          {
            background: fileName,
          },
          {
            where: {
              id: userId,
            },
          }
        );
      }
    }

    if (name) {
      const profileUpdate = await User.update(
        {
          user_name: name,
        },
        {
          where: {
            id: userId,
          },
        }
      );
    }
    if (birthdate) {
      const profileUpdate = await User.update(
        {
          birthdate: birthdate,
        },
        {
          where: {
            id: userId,
          },
        }
      );
    }
    if (web_site_url) {
      const profileUpdate = await User.update(
        {
          web_site_url: web_site_url,
        },
        {
          where: {
            id: userId,
          },
        }
      );
    }
    if (about) {
      const profileUpdate = await User.update(
        {
          about: about,
        },
        {
          where: {
            id: userId,
          },
        }
      );
    }
    const updateUserProfile = await User.findOne({ where: { id: userId } });

    return response.json(updateUserProfile);
  }

  async getAllUsers(request, response, next) {
    let { limit } = request.query;
    limit = limit || 5;
    const users = await User.findAll({
      limit: limit,
    });

    return response.json(users);
  }

  async getSearchUsers(request, response, next) {
    const Op = Sequelize.Op;
    const { name } = request.params;

    const users = await User.findAll({
      where: {
        user_name: { [Op.substring]: name },
      },
    });

    return response.json(users);
  }

  async getUserById(request, response, next) {
    try {
      const { id } = request.params;

      if (id) {
        const user = await User.findOne({
          where: { id },
        });

        return response.json(user);
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async createFollowing(request, response, next) {
    try {
      const { id } = request.params;
      const { followUserId } = request.body;

      const user = decodeUser(request);
      const userId = user.id;

      if (userId !== parseInt(id)) {
        next(ApiError.badRequest(`Check authentication ${id}`));
      }
      const followings = await Following.findOne({
        where: { userId: userId, followUserId: followUserId },
      });

      if (followings) {
        next(ApiError.badRequest("The following already exists."));
      }

      if (!followings) {
        const followings = await Following.create({
          userId: userId,
          followUserId: followUserId,
        });

        return response.json(followings.followUserId);
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async deleteFollowing(request, response, next) {
    try {
      const id = request.params.id;
      const followUserId = request.params.unfollowedId;

      const user = decodeUser(request);
      const userId = user.id;

      if (userId !== parseInt(id)) {
        next(ApiError.badRequest(`Check authentication ${id}`));
      }

      const following = await Following.findOne({
        where: { followUserId: +followUserId, userId: userId },
      });

      if (following) {
        const unFollow = await Following.destroy({
          where: { followUserId: +followUserId, userId: userId },
        });
      }

      return response.json(following.followUserId);
    } catch (error) {
      next(ApiError.badRequest("Check followUserId"));
    }
  }

  async getFollowingUsers(request, response, next) {
    try {
    const Op = Sequelize.Op;

    const user = decodeUser(request);
    const userIdToken = user.id;

    const { id } = request.params;

    const users = await Following.findAll({
      where: {
        userId: id,
      },
      include: {
        model: User,
        as: "user",
      },
    });

    let presenter = new FollowingsUserPresenter(users);

    return response.json(presenter.toJSON(users));

    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async getFollowerUsers(request, response, next) {
    try {
      const Op = Sequelize.Op;
      const user = decodeUser(request);
      const userIdToken = user.id;

      const { id } = request.params;

      const users = await sequelize.query(
        `SELECT "Following"."id", "Following"."followUserId", "Following"."userId", "followUser"."id" AS "followUser.id", "followUser"."user_name" AS "followUser.user_name", "followUser"."email" AS "followUser.email", "followUser"."password" AS "followUser.password", "followUser"."birthdate" AS "followUser.birthdate", "followUser"."web_site_url" AS "followUser.web_site_url", "followUser"."about" AS "followUser.about", "followUser"."photo" AS "followUser.photo", "followUser"."background" AS "followUser.background", "followUser->followers_user"."id" AS "followUser.followers_user.id", "followUser->followers_user"."followUserId" AS "followUser.followers_user.followUserId", "followUser->followers_user"."userId" AS "followUser.followers_user.userId"
        FROM "Followings"  AS "Following"
        LEFT OUTER JOIN  "Users" AS "followUser" ON "Following"."userId" = "followUser"."id"
        LEFT OUTER JOIN "Followings" AS "followUser->followers_user" ON ("followUser->followers_user"."userId" = ${userIdToken}  and "followUser"."id" = "followUser->followers_user"."followUserId") where "Following"."followUserId" = ${id}`,
        {
          type: QueryTypes.SELECT,
          nest: true,
        }
      );

      let presenter = new FollowersUserPresenter(users);

      return response.json(presenter.toJSON(users));
    } catch (error) {
      next(ApiError.badRequest("Check user.id"));
    }
  }

  async getWhoNotReadingUsers(request, response, next) {
    const Op = Sequelize.Op;
    const { id } = request.params;
    let { limit } = request.query;
    limit = limit || 5;

    const followingUserId = await Following.findAll({
      attributes: ["followUserId"],
      where: { userId: id },
      raw: true,
    });

    const ids = [id];

    if (followingUserId) {
      followingUserId.map((item) => {
        return ids.push(item.followUserId);
      });
    }

    const whoNotReadingList = await User.findAll({
      where: { id: { [Op.notIn]: ids } },
      include: [
        {
          model: Following,
          as: "followings_user",
        },
      ],
      limit: limit,
    });
    return response.json(whoNotReadingList);
  }
}

module.exports = new UserController();
