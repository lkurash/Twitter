import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import MenuComponent from "../pages/MenuComponent";
import Sidebar from "../pages/Sidebar";

export default function RootBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div>
          <div className="page">
            <MenuComponent />
            <main className="main-wrapper error-page">
              <div className="main">
                <div className="main-content">
                  <div className="main-content-block">
                    <div className="error-message">
                      Hmm... No such page exists. Try looking for something
                      else.
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <Sidebar />
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="page">
        <MenuComponent />
        <main className="main-wrapper error-page">
          <div className="main">
            <div className="main-content">
              <div className="main-content-block">
                <div className="error-message">Something went wrong.</div>
              </div>
            </div>
          </div>
        </main>
        <Sidebar />
      </div>
    </div>
  );
}
