import { NavLink } from "react-router-dom";
import routes from "../../routes";
import { useColorPicker } from "@/hooks/useColorPicker";
export const Navbar = () => {
  const { setShowColorPicker, showColorPicker } = useColorPicker();

  const onClick = () => {
    setShowColorPicker(true);
  };

  return (
    <header className="header">
      <NavLink
        to="/"
        className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
      >
        <p className="blue-gradient_text">GF</p>
      </NavLink>
      <button
        type="button"
        className="absolute top-0 right-0 h-10 bg-red-400 z-[1000]"
        onClick={onClick}
      >
        show editor
      </button>

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
