import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import routes from "./routes";

const App = () => {
  return (
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
  );
};

export default App;
