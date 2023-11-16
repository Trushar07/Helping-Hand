import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

function NavBar(): JSX.Element {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="bg-indigo-600 dark:bg-gray-800 text-white top-0 z-10 sticky">
      <section className="max-w-4xl flex items-center p-4 mx-auto justify-between">
        <h1 className="text-3xl font-medium font-inter">
          <Link to="/">Helping Hand 🫱🏼‍🫲🏿</Link>
        </h1>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </section>
    </header>
  );
}

export default NavBar;
