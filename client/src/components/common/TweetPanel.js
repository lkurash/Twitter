import imgFile from "../Imgs/file.png";

function TweetPanel(props) {
  return (
    <div className={props.className}>
      <input type="file" multiple accept=".jpg, .jpeg, .png" id="input-file" />
      <label htmlFor="input-file" className="tweet-form-input-file">
        <img src={imgFile} alt="File" />
        {/* #008CFF */}
      </label>
      <button onClick={() => props.fun(props.tweetId, props.textComment)}>
        <span>{props.buttonName}</span>
      </button>
    </div>
  );
}
export default TweetPanel;
