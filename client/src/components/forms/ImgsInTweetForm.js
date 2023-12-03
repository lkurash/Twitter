import { useEffect, useState } from "react";
import close from "../Imgs/x_icon.png";
import spinner from "../../utils/spinner";

const ImgsInTweetForm = ({
  imgs,
  setImgs,
  changesImgsList,
  setChangesImgsList,
}) => {
  const [url, setUrl] = useState(false);

  const createURL = (img) => {
    if (!url) {
      setTimeout(() => {
        setUrl(true);
      }, 200);
    }

    if (url) {
      return (
        <>
          <img
            src={URL.createObjectURL(img)}
            alt="SelectPhoto"
            className="tweet-img"
          />
        </>
      );
    } else {
      return spinner();
    }
  };

  const deleteSelectedImg = (img) => {
    setChangesImgsList(true);
    imgs.splice(img, 1);
    setImgs(imgs);
    document.getElementById("input-file").value = "";
  };

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

  useEffect(() => {
    setChangesImgsList(false);
    setTimeout(() => {
      setChangesImgsList(true);
    }, 500);
  }, [changesImgsList]);

  return (
    <>
      {imgs.length > 0 && (
        <div className={getClassName(imgs)}>
          {imgs.map((img) => (
            <div className="wrapper-tweet-img" key={imgs.indexOf(img)}>
              <div
                className="tweet-form-button-delete"
                onClick={() => deleteSelectedImg(imgs.indexOf(img))}
              >
                <img src={close} alt="close-icon" className="close-icon" />
              </div>
              {createURL(img)}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default ImgsInTweetForm;
