const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const path = require("path");
const SECRET_KEY = "super_secret_key22";
const SECRET_KEY_ACCESS_TOKEN = "super_secret_key22";
const SECRET_KEY_REFRESH_TOKEN = "super_secret_key";

class Helpers {
  genereteAccessToken(id, email) {
    const accessToken = jwt.sign({ id, email }, SECRET_KEY, {
      expiresIn: "24h",
    });
    return accessToken;
  }

  genereteRefreshToken(email) {
    const refreshToken = jwt.sign({ email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return refreshToken;
  }

  decodeUser(request) {
    const token = request.headers.authorization.split(" ")[1];
    const decodeUser = jwt.decode(token);

    return decodeUser;
  }

  checkUsersAuth(request, userId, next) {
    const token = request.headers.authorization.split(" ")[1];
    const decodeUser = jwt.decode(token);

    const userIdToken = decodeUser.id;

    if (userIdToken !== parseInt(userId)) {
      next(ApiError.badRequest(`Check authentication ${userId}`));
    }
  }

  createFileName(img) {
    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));
    return fileName;
  }
}

module.exports = new Helpers();
