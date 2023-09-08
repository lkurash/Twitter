class UserPresenter {
  constructor(user) {
    this.user = user;
    this.userInfo = {};
  }

  toJSON() {
    return (this.userInfo = {
      id: this.user.id,
      user_name: this.user.user_name,
      birthdate: this.user.birthdate,
      photo: this.user.photo,
      background: this.user.background,
      about: this.user.about,
      web_site_url: this.user.web_site_url,
      followers: this.user.followings_user.length,
      following: this.user.followers_user.length,
      createdAt: this.user.createdAt,
    });
  }
}

module.exports = UserPresenter;
