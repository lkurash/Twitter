import { makeAutoObservable } from "mobx";

class TwitsStore {
  constructor() {
    this._twits = [];
    this._twitsWhoReading = [];
    this._userTwits = [];
    this._likedTwit = {};
    this._hoverTwitLike = {};
    this._dislikeTwit = {};
    this._twitsIdWithUsersLike = [];
    this._twitsWithUsersLikes = [];
    this._userTwitsWithMedia = [];
    makeAutoObservable(this);
  }

  setTwits(twits) {
    if (twits.length !== 0) {
      this._twits = twits;
    } else {
      this._twits = false;
    }
  }

  setUserTwits(twits) {
    if (twits.length !== 0) {
      this._userTwits = twits;
    } else {
      this._userTwits = false;
    }
  }

  addLikeTwit(twitLike, like) {
    this._twits.map((twit) => {
      if (twit.id === twitLike.id) {
        twit.countLikes = twitLike.countLikes;
        if (like) {
          twit.likes = [like];
        } else {
          twit.likes = [];
        }
      }
    });

    this._twitsWhoReading.map((twit) => {
      if (twit.id === twitLike.id) {
        twit.countLikes = twitLike.countLikes;
        if (like) {
          twit.likes = [like];
        } else {
          twit.likes = [];
        }
      }
    });
    return [this._twits, this._twitsWhoReading];
  }

  addFavoriteTwit(bookmarkTwit, bookmark) {
    this._twits.map((twit) => {
      if (twit.id === bookmarkTwit.id) {
        if (bookmark) {
          twit.favorite_twits = [bookmark];
        } else {
          twit.favorite_twits = [];
        }
      }
    });

    this._twitsWhoReading.map((twit) => {
      if (twit.id === bookmarkTwit.id) {
        if (bookmark) {
          twit.favorite_twits = [bookmark];
        } else {
          twit.favorite_twits = [];
        }
      }
    });
    return [this._twits, this._twitsWhoReading];
  }

  addRetwitTwit(retwit) {
    this._twits.map((twit) => {
      if (twit.id === retwit.id) {
        twit.retwits = [retwit];
        twit.countRetwits = retwit.countRetwits;
      }
      if (twit.twitId === retwit.id) {
        twit.countRetwits = retwit.countRetwits;
      }
      return this._twits;
    });
  }

  deleteRetwit(originalTwit, retwit) {
    let originalTwitsIndex = this._twits.findIndex(
      (twit) => twit.id === originalTwit
    );

    let retwitsIndex = this._twits.findIndex((twit) => twit.id === retwit);

    this._twits[originalTwitsIndex].retwits = [];
    this._twits.splice(retwitsIndex, 1);
  }

  setLikedTwit(twit) {
    this._likedTwit = twit;
  }

  sethoverTwitLike(twit) {
    this._hoverTwitLike = twit;
  }

  setDislikeTwit(twit) {
    this._dislikeTwit = twit;
  }

  setTwitsWhoReading(twits) {
    this._twitsWhoReading = twits;
  }

  setTwitsIdWithUsersLikes(ids) {
    this._twitsIdWithUsersLikes = ids;
  }

  setTwitsWithUsersLikes(twits) {
    this._twitsWithUsersLikes = twits;
  }

  setUserTwitsWithMedia(twits) {
    this._userTwitsWithMedia = twits;
  }

  get twits() {
    return this._twits;
  }

  get userTwits() {
    return this._userTwits;
  }

  get likedTwit() {
    return this._likedTwit;
  }

  get hoverTwitLike() {
    return this._hoverTwitLike;
  }

  get dislikeTwit() {
    return this._dislikeTwit;
  }

  get twitsWhoReading() {
    return this._twitsWhoReading;
  }

  get twitsIdWithUsersLikes() {
    return this._twitsIdWithUsersLikes;
  }

  get twitsWithUsersLikes() {
    return this._twitsWithUsersLikes;
  }
  get userTwitsWithMedia() {
    return this._userTwitsWithMedia;
  }
}
export default TwitsStore;
