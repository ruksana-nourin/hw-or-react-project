import { useState, useEffect } from 'react';
import Sidebar from './views/layouts/Sidebar';
import Header from './views/layouts/Header';
import { Outlet } from 'react-router';
import Footer from './views/layouts/Footer';

export default function App() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isPagesMenuOpen, setIsPagesMenuOpen] = useState(false);
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  // Dark mode
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [dark]);

  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);
  const closeSideMenu = () => setIsSideMenuOpen(false);
  const togglePagesMenu = () => setIsPagesMenuOpen(!isPagesMenuOpen);
  const toggleNotificationsMenu = () => setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleTheme = () => setDark(!dark);

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar
        isPagesMenuOpen={isPagesMenuOpen}
        togglePagesMenu={togglePagesMenu}
        isSideMenuOpen={isSideMenuOpen}
        closeSideMenu={closeSideMenu}
      />

      {/* Main Content Wrapper */}
      <div className="flex min-w-0 flex-col flex-1 h-full overflow-hidden">

        {/* Header */}
        <Header
          toggleSideMenu={toggleSideMenu}
          toggleTheme={toggleTheme}
          dark={dark}
          toggleNotificationsMenu={toggleNotificationsMenu}
          isNotificationsMenuOpen={isNotificationsMenuOpen}
          toggleProfileMenu={toggleProfileMenu}
          isProfileMenuOpen={isProfileMenuOpen}
        />

        {/* Scrollable Area for Outlet and Footer */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
      <div className="w-full min-w-0 flex-1">
          {/* Main Body / Pages Route */}
            <Outlet />
          </div>

          {/* Footer at the bottom of scrollable flow */}
          <Footer />
        </div>

      </div>
    </div>
  );
}