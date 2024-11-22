import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { MenuIcon, XIcon, HomeIcon, LoginIcon, ClockIcon, GlobeIcon, BriefcaseIcon, MailIcon, ChevronDownIcon, AcademicCapIcon } from "@heroicons/react/outline";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector("nav");
      if (window.scrollY > 50) {
        nav?.classList.add("bg-opacity-80", "shadow-lg");
      } else {
        nav?.classList.remove("bg-opacity-80", "shadow-lg");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="w-full h-20 sm:h-16 flex items-center">
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 transition-all duration-300 ease-in-out bg-opacity-100">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
              width={32}
              height={32}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-600 dark:text-white">
              Concursos Já
            </span>
          </Link>

          <div className="flex md:order-2">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">{menuOpen ? "Close" : "Open"} main menu</span>
              {menuOpen ? (
                <XIcon className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${menuOpen ? "block" : "hidden"}`}
          >
            <ul className="flex flex-col p-4 font-semibold md:p-0 mt-4 space-y-2 md:space-y-0 md:space-x-8 md:mt-0 md:flex-row md:items-center">
              <li>
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-500"
                >
                  <HomeIcon className="w-5 h-5" />
                  <span>Inicio</span>
                </Link>
              </li>
              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-500"
                >
                  <AcademicCapIcon className="w-5 h-5" />
                  <span>Concursos</span>
                  <ChevronDownIcon className="w-5 h-5" />
                </button>
                {dropdownOpen && (
                  <ul className="absolute mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 w-48 z-10">
                    <li>
                      <Link
                        href="/abertos"
                        className="block px-4 py-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-500"
                      >
                        Concursos Abertos
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/previstos"
                        className="block px-4 py-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-500"
                      >
                        Concursos Previstos
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/federais"
                        className="block px-4 py-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-500"
                      >
                        Federais
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link
                  href="/empregos"
                  className="flex items-center space-x-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-500"
                >
                  <BriefcaseIcon className="w-5 h-5" />
                  <span>Empregos</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-500"
                >
                  <HomeIcon className="w-5 h-5" />
                  <span>Notícias</span>
                </Link>
              </li>
              <li>
                <Link href="/contato">
                  <button
                    type="button"
                    className="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <MailIcon className="w-5 h-5" />
                    <span>Contato</span>
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
