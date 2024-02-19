let BASE_URL = `${process.env.REACT_APP_API_SCHEMA}://${process.env.REACT_APP_API_HOST}`;
BASE_URL += process.env.REACT_APP_API_PORT
  ? `:${process.env.REACT_APP_API_PORT}`
  : "";

const TweetDesc = ({ tweet }) => {
  const getClassName = (imgs) => {
    if (imgs.length === 1) {
      return "wrapper-tweet-one-img";
    }

    if (imgs.length === 2) {
      return "wrapper-two-imgs";
    }

    if (imgs.length === 3) {
      return "wrapper-three-imgs";
    }

    if (imgs.length === 4) {
      return "wrapper-four-imgs";
    }
  };

  return (
    <div className="tweet-desc" data-testid="tweet-desc">
      {tweet.text && (
        <p className="tweet-text" data-testid="tweet-text">
          {tweet.text}
        </p>
      )}
      {tweet.img && (
        <div
          className={getClassName(tweet.img)}
          data-testid={getClassName(tweet.img)}
        >
          {tweet.img.map((img) => (
            <div className="wrapper-tweet-img" key={img}>
              <img
                data-testid="tweet-img"
                src={`${BASE_URL}/${img}`}
                alt="Imgs tweet"
                className="tweet-img"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default TweetDesc;
