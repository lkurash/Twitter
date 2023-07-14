const jwt = require("jsonwebtoken");
const SECRET_KEY = "super_secret_key22";

module.exports = function (request, response, next) {
  if (request.method === "OPTIONS") {
    next();
  }
  try {
    const token = request.headers.authorization.split(" ")[1];

    if (!token) {
      return response.status(401).json({ message: "Not authorization" });
    }
    const decoded = jwt.verify(token, SECRET_KEY);

    request.user = decoded;
    next();
  } catch (e) {
    response.status(401).json({ message: "Not authorization" });
  }
};
