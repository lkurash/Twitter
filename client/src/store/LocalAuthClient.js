const Cookies = require("js-cookie");

class LocalAuthClient {
  constructor() {
    this.accessToken = "";
    this.refreshToken = "";
  }

  setAccessToken(accessToken) {
    return Cookies.set("token", accessToken, { expires: 1 });
  }

  setRefreshToken(refreshToken) {
    return Cookies.set("refreshToken", refreshToken, { expires: 1 / 24 });
  }
}

const localAuthClient = new LocalAuthClient()

export default localAuthClient
