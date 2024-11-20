import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import BlogDetail from "./pages/BlogDetail";
import NewBlog from "./pages/NewBlog";
import UpdateBlog from "./pages/UpdateBlog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShowBlog from "./pages/ShowBlog";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import OtherNavbar from "./components/OtherNavbar";

const getNavbarComponent = (location) => {
  const otherNavbarRoutes = ["/register", "/new", "/update"];
  const hiddenNavbarRoutes = ["/login"];
  const definedRoutes = [
    "/",
    "/register",
    "/new",
    "/update",
    "/blogs",
    "/login",
    "/admin",
  ];

  const isValidRoute = definedRoutes.some((route) =>
    route === "/blogs"
      ? location.pathname.startsWith("/blogs")
      : route === location.pathname
  );

  if (!isValidRoute) {
    return null;
  }

  if (location.pathname.startsWith("/blogs")) {
    return <OtherNavbar />;
  }

  if (hiddenNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  if (otherNavbarRoutes.includes(location.pathname)) {
    return <OtherNavbar />;
  }

  return <Navbar />;
};

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {getNavbarComponent(location)}{" "}
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/new" element={<NewBlog />} />
        <Route path="/update/:id" element={<UpdateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ShowBlog />} />
        <Route path="*" element={<NotFound />} />
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
