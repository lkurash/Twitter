import { observer } from "mobx-react-lite";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";

const App = observer(() => (
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
));

export default App;
