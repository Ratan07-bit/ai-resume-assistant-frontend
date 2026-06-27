import { BrowserRouter, Routes, Route } from "react-router-dom"
import History from "./pages/History"

import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Analyze from "./pages/Analyze"
import Report from "./pages/Report"
import Loading from "./pages/Loading"


function App() {


  return (

    <BrowserRouter>


      <Routes>


        <Route 
          path="/"
          element={<Landing />}
        />


        <Route 
          path="/login"
          element={<Login />}
        />


        <Route 
          path="/register"
          element={<Register />}
        />


        <Route 
          path="/dashboard"
          element={<Dashboard />}
        />


        <Route 
          path="/analyze"
          element={<Analyze />}
        />


        <Route 
          path="/report/:id"
          element={<Report />}
        />

        <Route
 path="/history"
 element={<History/>}
/>

<Route
    path="/loading"
    element={<Loading />}
/>


      </Routes>


    </BrowserRouter>

  )
}


export default App