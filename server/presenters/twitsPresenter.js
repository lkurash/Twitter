class TwitsPresenter {
  constructor(twits) {
    this.twits = twits;
    this.twit = {};
    this.twitsForAuthUser = [];
  }

  createTwitDate(date) {
    const twitDate = new Date(date).toString().split(" ");

    return `${twitDate[2]} ${twitDate[1]}. ${twitDate[3]}`;
  }

  toJSON() {
    this.twits.forEach((twit) => {
      this.twit = {
        id: twit.id,
        img: twit.img,
        countLikes: twit.countLikes,
        countRetwits: twit.countRetwits,
        countComments: twit.countComments,
        retwit: twit.retwit,
        text: twit.text,
        twitId: twit.twitId,
        twitUserId: twit.twitUserId,
        userId: twit.userId,
        user: {
          id: twit.user.id,
          user_name: twit.user.user_name,
          photo: twit.user.photo,
        },
        twit_user: {
          id: twit.twit_user.id,
          user_name: twit.twit_user.user_name,
          photo: twit.twit_user.photo,
        },
        twit_createDate: this.createTwitDate(twit.createdAt),
        authUserFavorite: twit.favorite_twits.id != null,
        authUserLike: twit.likes.id != null,
        authUserRetwits: twit.retwits.id != null,
      };

      this.twitsForAuthUser.push(this.twit);
    });
    return this.twitsForAuthUser;
  }
}

module.exports = TwitsPresenter;
