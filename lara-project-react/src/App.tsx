import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Nav from './layouts/Nav'
import Footer from './layouts/Footer'
import { Outlet } from 'react-router'

function App() {


  return (
    <>
      <Nav />
      <hr />
      <div className="container  mx-auto ">

      <Outlet />
      </div>
      <hr />
      <Footer />

    </>
  )
}

export default App
