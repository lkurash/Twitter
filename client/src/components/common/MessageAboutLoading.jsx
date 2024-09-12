import { ColorRing } from "react-loader-spinner";

const MessageAboutLoading = () => {
  return (
    <div className="message-loading">
      <div>
        <h3>Please wait, the server is coming back to life...</h3>
        <p>
          This is a training project, and it takes time for the server on
          Render.com to wake up.
        </p>
        <div className="load-spinner" data-testid="spinner">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#1d9bf0", "#1d9bf0", "#1d9bf0", "#1d9bf0", "#1d9bf0"]}
          />
        </div>
      </div>
    </div>
  );
};
export default MessageAboutLoading;
