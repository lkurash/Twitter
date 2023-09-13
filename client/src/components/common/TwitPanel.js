import imgFile from "../Img/file.png";

function TwitPanel(props) {
  return (
    <div className={props.className}>
      <input type="file" multiple accept=".jpg, .jpeg, .png" id="input-file" />
      <label htmlFor="input-file" className="twit-form-input-file">
        <img src={imgFile} alt="File" />
        {/* #008CFF */}
      </label>
      <button onClick={() => props.fun(props.twitId, props.textComment)}>
        <span>{props.buttonName}</span>
      </button>
    </div>
  );
}
export default TwitPanel;
