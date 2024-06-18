import { NavLink } from "react-router-dom";
import routes from "../../routes";
export const Navbar = () => {
  return (
    <header className="header">
      <NavLink
        to="/"
        className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
      >
        <p className="blue-gradient_text">GH</p>
      </NavLink>

      <nav className="flex text-lg gap-7 font-medium">
        {routes.map(({ path, name }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-black"
            }
          >
            {name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
