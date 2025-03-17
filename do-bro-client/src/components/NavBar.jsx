import { useContext } from "react";
import logo from "../assets/images/logo (1).png";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="navbar font-lato bg-gradient-to-r from-green-400 to-blue-400 text-gray-900  shadow-xl px-4 mx-auto">
      <div className="flex-1">
        <Link className="flex gap-2 items-center">
          <img className="w-auto h-7" src={logo} alt="" />
          <span className="font-bold text-lg text-black">JobXplore</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to="/"
              className="font-semibold text-white hover:text-yellow-300 transition-all duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/jobs"
              className="font-semibold text-white hover:text-yellow-300 transition-all duration-300"
            >
              All Jobs
            </Link>
          </li>
          {!user && (
            <li>
              <Link
                to="/login"
                className="font-semibold text-white hover:text-yellow-300 transition-all duration-300"
              >
                Login
              </Link>
            </li>
          )}
        </ul>

        {user && (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
            >
              <div title={user?.displayName} className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 backdrop-blur-md rounded-box w-52"
            >
              <li>
                <Link
                  to="/add-job"
                  className="justify-between text-white hover:text-yellow-300 transition-all duration-300"
                >
                  Add Job
                </Link>
              </li>
              <li>
                <Link
                  to="/my-posted-jobs"
                  className="text-white hover:text-yellow-300 transition-all duration-300"
                >
                  My Posted Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/my-bids"
                  className="text-white hover:text-yellow-300 transition-all duration-300"
                >
                  My Bids
                </Link>
              </li>
              <li>
                <Link
                  to="/bid-requests"
                  className="text-white hover:text-yellow-300 transition-all duration-300"
                >
                  Bid Requests
                </Link>
              </li>
              <li className="mt-2">
                <button
                  onClick={logOut}
                  className="bg-red-500 text-white hover:bg-red-600 block text-center rounded-md w-full py-2 transition-all duration-300"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
