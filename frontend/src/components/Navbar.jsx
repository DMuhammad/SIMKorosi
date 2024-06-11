import {
  Bars3Icon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { useState } from "react";
import { useAuth, useLogout } from "../hooks/useAuth";

export default function Navbar({ title, handleSidebar }) {
  const { user } = useAuth();
  const { logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-indigo-600 px-4 py-4 shadow-sm sm:px-6">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-indigo-200"
        onClick={() => handleSidebar()}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex items-center w-11/12">
        <div className="flex-1 text-md font-semibold leading-6 text-white">
          {title}
        </div>
        <div className="relative inline-block text-left">
          {/* <button className="mx-1">
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-7 w-7 text-white" />
          </button> */}
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <span className="sr-only">Your profile</span>
            <UserCircleIcon className="h-8 w-8 text-white" />
          </button>
          {isOpen && (
            <div className="absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <div>
                  <p className="px-4 py-2 text-sm text-gray-700">
                    Hello {user?.nama.split(" ")[0]}
                  </p>
                </div>
                <div className="relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300" />
                  </div>
                </div>
                <div className="block py-2 text-sm hover:bg-gray-100 hover:text-gray-900">
                  <button
                    type="button"
                    className="block w-full px-4 py-2 text-left text-sm"
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  handleSidebar: PropTypes.func.isRequired,
};
