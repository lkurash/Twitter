import { Outlet } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";

import MenuComponent from "../components/MenuComponent";


export default function WrapperTwitterPage() {
  return (
    <div>
      <div className="page">
        <MenuComponent />
        <Outlet />
      </div>
      <FooterComponent />
    </div>
  );
}
