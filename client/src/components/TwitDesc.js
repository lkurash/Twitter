const TwitDesc = ({ twit, user }) => {
  return (
    <div className="twit-desc">
      <p className="twit-text">{twit.text}</p>
      {twit.img && (
        <div className="wrapper-twit-imgs">
          {twit.img.map((img) => (
            <div
              className={
                twit.img.length > 1
                  ? "wrapper-twit-img max-size-img"
                  : "wrapper-twit-img"
              }
              key={img}
            >
              <img
                src={`http://localhost:5500/${img}`}
                alt="Img twit"
                className="twit-img"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default TwitDesc;
