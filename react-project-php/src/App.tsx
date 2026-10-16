import { Outlet } from "react-router";
import Footer from "./views/layout/Footer";
import Navbar from "./views/layout/Navbar";
import Sidebar from "./views/layout/Sidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router";
// import { checkToken } from "./utils/Auth";

function App() {
  // checkToken();
  const navigate = useNavigate();

  const checkLogin = () => {
    if (!localStorage.getItem("bearer_token")) {
      navigate("/login", { replace: true });
    }
  };
  useEffect(() => {
    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, [navigate]);

  // useEffect(() => {
  //   const handleStorageChange = (event: StorageEvent) => {
  //     if (
  //       event.key === "bearer_token" &&
  //       event.newValue === null
  //     ) {
  //       navigate("/login", { replace: true });
  //     }
  //   };

  //   window.addEventListener("storage", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, [navigate]);

  return (
    <>
      <div className="admin-shell">
        <Sidebar />
        <div className="admin-main">
          <Navbar />
          {/* <input type="checkbox" id="myInput" />
            <label htmlFor="myInput">Input Label</label> */}
          <Outlet />

          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
