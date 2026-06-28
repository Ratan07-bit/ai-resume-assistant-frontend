import { BrowserRouter, Routes, Route } from "react-router-dom"
import History from "./pages/History"
import ProtectedRoute from "./components/ProtectedRoute"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Analyze from "./pages/Analyze"
import Report from "./pages/Report"



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
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>


       <Route
    path="/analyze"
    element={
        <ProtectedRoute>
            <Analyze />
        </ProtectedRoute>
    }
/>

      <Route
    path="/report/:id"
    element={
        <ProtectedRoute>
            <Report />
        </ProtectedRoute>
    }
/>

    <Route
    path="/history"
    element={
        <ProtectedRoute>
            <History />
        </ProtectedRoute>
    }
/>




      </Routes>


    </BrowserRouter>

  )
}


export default App