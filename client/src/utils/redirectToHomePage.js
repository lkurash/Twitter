import Cookies from "js-cookie";

const { redirect } = require("react-router-dom");

const redirectToHomePage = async () => {
  const token = Cookies.get("token");
  if (token) {
    return redirect("/home");
  } else {
    return null;
  }
};

export default redirectToHomePage;
