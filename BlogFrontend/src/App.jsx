import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import NewBlog from "./pages/NewBlog";
import UpdateBlog from "./pages/UpdateBlog";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import OtherNavbar from "./components/OtherNavbar";
import Register from "./pages/Register"; // Assuming you have a Register page

const AppContent = () => {
  const location = useLocation();

  // Check if current path is either /login or /register
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {/* Conditionally render Navbar/OtherNavbar based on path */}
      {!isAuthPage &&
        (location.pathname === "/" ? <Navbar /> : <OtherNavbar />)}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/new" element={<NewBlog />} />
        <Route path="/update/:id" element={<UpdateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Register Route */}
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
