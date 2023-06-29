import { ColorRing } from "react-loader-spinner";

export default function spinner() {
  return (
    <div className="load-spinner">
      <ColorRing
        visible={true}
        height="40"
        width="40"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#1d9bf0", "#1d9bf0", "#1d9bf0", "#1d9bf0", "#1d9bf0"]}
      />
    </div>
  );
}
