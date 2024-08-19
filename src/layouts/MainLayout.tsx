import { Outlet } from "react-router-dom";
import BurgerMenu from "../components/BurgerMenu";
import { Link } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <div>
        <Link to="/">
          <h1 className="fixed top-0 left-0 text-2xl p-4">Search Stack Overflow</h1>
        </Link>
        <BurgerMenu />
      </div>

      <Outlet />
    </div>
  );
};

export default MainLayout;
