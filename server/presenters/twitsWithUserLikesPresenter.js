class twitsWithUserLikesPresenter {
  constructor(twits) {
    this.likes = twits;
    this.twit = {};
    this.twitsWithUserLikesPresenter = [];
  }

  toJSON() {
    this.likes.forEach((like) => {
      this.twit = {
        id: like.twit.id,
        img: like.twit.img,
        countLikes: like.twit.countLikes,
        countRetwits: like.twit.countRetwits,
        countComments: like.twit.countComments,
        retwit: like.twit.retwit,
        text: like.twit.text,
        twitId: like.twit.twitId,
        twitUserId: like.twit.twitUserId,
        userId: like.twit.userId,
        user: {
          id: like.twit.user.id,
          user_name: like.twit.user.user_name,
          photo: like.twit.user.photo,
        },
        twit_user: {
          id: like.twit.twit_user.id,
          user_name: like.twit.twit_user.user_name,
          photo: like.twit.twit_user.photo,
        },
        authUserFavorite: like.twit.favorite_twits.id != null,
        authUserLike: like.twit.likes.id != null,
        authUserRetwits: like.twit.retwits.id != null,
      };
      this.twitsWithUserLikesPresenter.push(this.twit);

    });
    return this.twitsWithUserLikesPresenter;
  }
}

module.exports = twitsWithUserLikesPresenter;
