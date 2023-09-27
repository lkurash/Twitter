class TwitsPresenterForPublicPage {
  constructor(twits) {
    this.twits = twits;
    this.twit = {};
    this.twitsForPublicPage = [];
  }

  toJSON() {
    this.twits.forEach((twit) => {
      this.twit = {
        id: twit.id,
        img: twit.img ? twit.img.split(",") : twit.img,
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
          id: twit.twit_user ? twit.twit_user.id : null,
          user_name: twit.twit_user ? twit.twit_user.user_name : null,
          photo: twit.twit_user ? twit.twit_user.photo : null,
        },
      };

      this.twitsForPublicPage.push(this.twit);
    });
    return this.twitsForPublicPage;
  }
}

module.exports = TwitsPresenterForPublicPage;
