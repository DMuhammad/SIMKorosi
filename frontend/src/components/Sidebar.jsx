import { Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { NavigationContext } from "../context/NavigationContext";
import {
  DocumentDuplicateIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  {
    name: "Reports",
    href: "/reports",
    icon: DocumentDuplicateIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ sidebar, handleSidebar }) {
  const { currentIndex, setCurrentIndex } = useContext(NavigationContext);

  const handleNavigation = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Transition.Root show={sidebar} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => handleSidebar}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => handleSidebar()}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-2">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=white"
                    alt="Your Company"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item, index) => (
                          <li
                            key={item.name}
                            onClick={() => handleNavigation(index)}
                          >
                            <Link
                              to={item.href}
                              className={classNames(
                                index === currentIndex
                                  ? "bg-indigo-700 text-white"
                                  : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                                "group flex gap-x-3 rounded-md p-2 text-md leading-6 font-semibold"
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  index === currentIndex
                                    ? "text-white"
                                    : "text-indigo-200 group-hover:text-white",
                                  "h-6 w-6 shrink-0"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

Sidebar.propTypes = {
  sidebar: PropTypes.bool.isRequired,
  handleSidebar: PropTypes.func.isRequired,
};
