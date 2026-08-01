import { Outlet } from "react-router"
import Footer from "./views/layout/Footer"
import Navbar from "./views/layout/Navbar"
import Sidebar from "./views/layout/Sidebar"

function App() {

  return (
    <>
      <div className="admin-shell">
        <Sidebar />

        <div className="admin-main">
          <Navbar />

          {/* <input type="checkbox" id="css" />
          <label htmlFor="css">input level</label> */}
          {/* <Dashboard /> */}
          <Outlet/>


          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
