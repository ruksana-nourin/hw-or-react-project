import { Link } from "react-router";

interface SidebarProps {
  isPagesMenuOpen: boolean;
  togglePagesMenu: () => void;
  isSideMenuOpen: boolean;
  closeSideMenu: () => void;
}

export default function Sidebar({
  isPagesMenuOpen,
  togglePagesMenu,
  isSideMenuOpen,
  closeSideMenu,
}: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0 shadow-md">
        <SidebarContent
          isPagesMenuOpen={isPagesMenuOpen}
          togglePagesMenu={togglePagesMenu}
        />
      </aside>

      {/* Mobile sidebar & Backdrop */}
      {isSideMenuOpen && (
        <div
          className="fixed inset-0 z-20 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center md:hidden"
          onClick={closeSideMenu}
        >
          <aside
            className="fixed inset-y-0 left-0 z-30 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent
              isPagesMenuOpen={isPagesMenuOpen}
              togglePagesMenu={togglePagesMenu}
            />
          </aside>
        </div>
      )}
    </>
  );
}

function SidebarContent({ isPagesMenuOpen, togglePagesMenu }: { isPagesMenuOpen: boolean; togglePagesMenu: () => void }) {
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <Link className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" to="#">
        Windmill
      </Link>
      <ul className="mt-6">
        {/* Dashboard */}
        <li className="relative px-6 py-3">
          <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
          <Link className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100" to="/">
            <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span className="ml-4">Dashboard</span>
          </Link>
        </li>

        {/* Student */}
        <li className="relative px-6 py-3">
          <Link className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200" to="/students">
            <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span className="ml-4">Student</span>
          </Link>
        </li>

        {/* Teacher */}
        <li className="relative px-6 py-3">
          <Link className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200" to="#">
            <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span className="ml-4">Teacher</span>
          </Link>
        </li>

        {/* Academic */}
        <li className="relative px-6 py-3">
          <Link className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200" to="#">
            <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
              <path d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"></path>
            </svg>
            <span className="ml-4">Academic</span>
          </Link>
        </li>

        {/* Fee Category */}
        <li className="relative px-6 py-3">
          <Link className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200" to="/fee-categories">
            <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
            </svg>
            <span className="ml-4">Fee Category</span>
          </Link>
        </li>

        {/* Fee Structure */}
        <li className="relative px-6 py-3">
          <Link className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200" to="/fee-structures">
            <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            <span className="ml-4">Fee Structure</span>
          </Link>
        </li>

        

        {/* Fee Payment */}
        <li className="relative px-6 py-3">
          <Link className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200" to="/fee-payments">
            <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
            <span className="ml-4">Fee Payment</span>
          </Link>
        </li>

        {/* User */}
        <li className="relative px-6 py-3">
          <Link className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200" to="#">
            <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.654 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="ml-4">User</span>
          </Link>
        </li>
      </ul>

      {/* page Dropdown */}
      <ul>
        <li className="relative px-6 py-3">
          <button
            className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            onClick={togglePagesMenu}
            aria-haspopup="true"
          >
            <span className="inline-flex items-center">
              <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
              </svg>
              <span className="ml-4">Pages</span>
            </span>
            <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>

          {isPagesMenuOpen && (
            <ul className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900" aria-label="submenu">
              <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                <Link className="w-full" to="#">Login</Link>
              </li>
              <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                <Link className="w-full" to="#">Create account</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}