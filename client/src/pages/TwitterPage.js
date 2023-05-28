import "../App.css";
import "../components/common/common.css";
import MenuComponent from "../components/MenuComponent";
import MainComponentTwitterPage from "../components/MainComponentTwitterPage";
import SidebarComponent from "../components/SidebarComponent";
import FooterComponent from "../components/FooterComponent";

function TwitterPage() {
  return (
    <div>
      <div className="page">
        <MenuComponent />
        <MainComponentTwitterPage />
        <SidebarComponent />
      </div>
      <FooterComponent />
    </div>
  );
}

export default TwitterPage;
