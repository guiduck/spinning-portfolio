import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import routes from "./routes";
import Provider from "./context";

const App = () => {
  return (
    <Provider>
      <main className="bg-slate-300/20">
        <Router>
          <Navbar />

          <Routes>
            {routes.map(({ path, page }) => (
              <Route key={path} path={path} element={page} />
            ))}
          </Routes>
        </Router>
      </main>
    </Provider>
  );
};

export default App;
