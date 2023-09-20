const TwitDesc = ({ twit, user }) => {
  const getClassName = (imgs) => {
    if (imgs.length === 1) {
      return "wrapper-twit-one-img";
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
    <div className="twit-desc">
      <p className="twit-text">{twit.text}</p>
      {twit.img && (
        <div className={getClassName(twit.img)}>
          {twit.img.map((img) => (
            <div className="wrapper-twit-img" key={img}>
              <img
                src={`http://localhost:5500/${img}`}
                alt="Imgs twit"
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
