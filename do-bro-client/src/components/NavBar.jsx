import { useContext } from "react";
import logo from "../assets/images/logo (1).png";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="navbar font-lato bg-gradient-to-r from-green-400 to-blue-400 text-gray-900 container shadow-xl px-4 mx-auto">
      <div className="flex-1">
        <Link className="flex gap-2 items-center">
          <img className="w-auto h-7" src={logo} alt="" />
          <span className="font-bold text-lg text-black">JobXplore</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to='/' className="font-semibold text-gray-200 hover:text-gray-400">Home</Link>
          </li>
          <li>
            <Link to='/jobs' className="font-semibold text-gray-200 hover:text-gray-400">All jobs</Link>
          </li>
          {!user && (
            <li>
              <Link className="font-semibold text-gray-200 hover:text-gray-400" to='/login'>Login</Link>
            </li>
          )}
        </ul>
        {user && (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:bg-gray-500"
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gradient-to-r from-gray-500 to-gray-700 rounded-box w-52"
            >
              <li>
                <Link to='/add-job' className="justify-between text-gray-100 hover:text-gray-300">Add Job</Link>
              </li>
              <li>
                <Link to='/my-posted-jobs' className="text-gray-100 hover:text-gray-300">My Posted Jobs</Link>
              </li>
              <li>
                <Link to='/my-bids' className="text-gray-100 hover:text-gray-300">My Bids</Link>
              </li>
              <li> 
                <Link to='/bid-requests' className="text-gray-100 hover:text-gray-300">Bid Requests</Link>
              </li>
              <li className="mt-2">
                <button onClick={logOut} className="bg-gray-300 text-gray-900 hover:bg-gray-400 block text-center rounded-md w-full">
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
