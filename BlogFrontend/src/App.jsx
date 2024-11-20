/* eslint-disable react/prop-types */
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   useLocation,
// } from "react-router-dom";
// import AdminPage from "./pages/AdminPage";
// import BlogDetail from "./pages/BlogDetail";
// import NewBlog from "./pages/NewBlog";
// import UpdateBlog from "./pages/UpdateBlog";
// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import OtherNavbar from "./components/OtherNavbar";
// import Register from "./pages/Register"; // Assuming you have a Register page
// import ShowBlog from "./pages/ShowBlog";

// const AppContent = () => {
//   const location = useLocation();

//   // Check if current path is either /login or /register
//   const isAuthPage =
//     location.pathname === "/login" || location.pathname === "/register";

//   return (
//     <>
//       {!isAuthPage &&
//         (location.pathname === "/admin" ? <Navbar /> : <OtherNavbar />)}

//       <Routes>
//         <Route path="/admin" element={<AdminPage />} />
//         <Route path="/blogs/:id" element={<BlogDetail />} />
//         <Route path="/new" element={<NewBlog />} />
//         <Route path="/update/:id" element={<UpdateBlog />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/" element={<ShowBlog />} />
//       </Routes>
//     </>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// };

// export default App;
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import AdminPage from "./pages/AdminPage";
import BlogDetail from "./pages/BlogDetail";
import NewBlog from "./pages/NewBlog";
import UpdateBlog from "./pages/UpdateBlog";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import OtherNavbar from "./components/OtherNavbar";
import Register from "./pages/Register"; // Assuming you have a Register page
import ShowBlog from "./pages/ShowBlog";

// Function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return !!token; // Return true if token exists, otherwise false
};

const ProtectedRoute = ({ element, redirectTo }) => {
  return isAuthenticated() ? element : <Navigate to={redirectTo} />;
};

const AppContent = () => {
  const location = useLocation();

  // Check if current path is either /login or /register
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthPage &&
        (location.pathname === "/admin" ? <Navbar /> : <OtherNavbar />)}

      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute element={<AdminPage />} redirectTo="/login" />
          }
        />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route
          path="/new"
          element={<ProtectedRoute element={<NewBlog />} redirectTo="/login" />}
        />
        <Route
          path="/update/:id"
          element={
            <ProtectedRoute element={<UpdateBlog />} redirectTo="/login" />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ShowBlog />} />
      </Routes>
    </>
  );
};

const App = () => {
  const [authChecked, setAuthChecked] = useState(false);

  // Simulate a check to see if the app has been initialized properly
  useEffect(() => {
    // Normally, you would verify token validity here.
    setAuthChecked(true); // Once token is verified (or not), mark as checked
  }, []);

  // Ensure app is fully initialized before rendering
  if (!authChecked) {
    return <div>Loading...</div>; // Optionally, add a loading spinner or screen
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
