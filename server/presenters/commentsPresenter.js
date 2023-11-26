class CommentsPresenter {
  constructor(twits) {
    this.comments = twits;
    this.comment = {};
    this.userComments = [];
  }

  toJSON() {
    this.comments.forEach((comment) => {
      this.comment = {
        Twit: comment.Twit && {
          id: comment.twitId,
          img: comment.Twit.img
            ? comment.Twit.img.split(",")
            : comment.Twit.img,
          countLikes: comment.Twit.countLikes,
          countRetwits: comment.Twit.countRetwits,
          countComments: comment.Twit.countComments,
          retwit: comment.Twit.retwit,
          text: comment.Twit.text,
          twitId: comment.Twit.twitId,
          twitUserId: comment.Twit.twitUserId,
          userId: comment.Twit.userId,
          userOriginalTwits: {
            id: comment.Twit.user.id,
            user_name: comment.Twit.user.user_name,
            photo: comment.Twit.user.photo,
            about: comment.Twit.user.about,
          },
          userRetwits: comment.Twit.twit_user && {
            id: comment.Twit.twit_user.id,
            user_name: comment.Twit.twit_user.user_name,
            photo: comment.Twit.twit_user.photo,
            about: comment.Twit.twit_user.about,
          },
        },
        Comment: {
          id: comment.id,
          text: comment.text,
          user: {
            id: comment.user.id,
            user_name: comment.user.user_name,
            photo: comment.user.photo,
            about: comment.user.about,
          },
        },
        comment_createDate: comment.createdAt,
        authUserFavorite:
          comment.favorite_twits && comment.favorite_twits.id != null,
        authUserLike: comment.likes && comment.likes.id != null,
        authUserRetwits: comment.retwits && comment.retwits.id != null,
      };

      this.userComments.push(this.comment);
    });
    return this.userComments;
  }
}

module.exports = CommentsPresenter;
