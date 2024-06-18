import { ReactNode } from "react";
import { About, Contact, Home, Projects } from "@/pages";

interface Route {
  path: string;
  name: string;
  page: ReactNode;
}

export const routes: Route[] = [
  {
    path: "/",
    name: "Home",
    page: <Home />,
  },
  {
    path: "/about",
    name: "About",
    page: <About />,
  },
  {
    path: "/projects",
    name: "Projects",
    page: <Projects />,
  },
  {
    path: "/contact",
    name: "Contact",
    page: <Contact />,
  },
];

export default routes;
