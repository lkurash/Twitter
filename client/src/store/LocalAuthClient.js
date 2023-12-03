const Cookies = require("js-cookie");

class LocalAuthClient {
  constructor() {
    this.accessToken = "";
    this.refreshToken = "";
  }

  setCookiesTweets(visibile) {
    return Cookies.set("tweetsWhoReading", visibile, { expires: 1 / 24 });
  }

  setAccessToken(accessToken) {
    return Cookies.set("token", accessToken, { expires: 1 });
  }

  setRefreshToken(refreshToken) {
    return Cookies.set("refreshToken", refreshToken, { expires: 1 / 24 });
  }
}

module.exports = new LocalAuthClient();
