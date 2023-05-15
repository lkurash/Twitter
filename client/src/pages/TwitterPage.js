import "../App.css";
import "../components/common/common.css";
import MenuComponent from "../components/MenuComponent";
import MainComponent from "../components/MainComponent";
import SidebarComponent from "../components/SidebarComponent";
import FooterComponent from "../components/FooterComponent";

function TwitterPage() {
  return (
    <div>
      <div className="page">
        <MenuComponent />
        <MainComponent />
        <SidebarComponent />
      </div>
      <FooterComponent />
    </div>
  );
}

export default TwitterPage;
