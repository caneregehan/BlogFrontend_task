import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
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
import Footer from "./components/Footer";
import Contact from "./pages/Contact ";

// eslint-disable-next-line no-unused-vars, react/prop-types
const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("authToken"); // JWT token kontrolü

  if (!token) {
    return <Navigate to="/login" replace />; // Token yoksa login sayfasına yönlendir
  }

  return element;
};

const getNavbarComponent = (location) => {
  const otherNavbarRoutes = ["/new", "/update"];
  const hiddenNavbarRoutes = ["/login", "/register"];

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
      : route === "/update"
      ? location.pathname.startsWith("/update")
      : route === location.pathname
  );

  if (!isValidRoute) {
    return null;
  }

  if (location.pathname.startsWith("/blogs")) {
    return <OtherNavbar />;
  }

  if (location.pathname.startsWith("/update")) {
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

const getFooterComponent = (location) => {
  const hiddenFooterRoutes = ["/login", "/register"];

  if (hiddenFooterRoutes.includes(location.pathname)) {
    return null;
  }

  return <Footer />;
};

// Uygulama İçeriği
const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {getNavbarComponent(location)}
      <Routes>
        <Route
          path="/admin"
          element={<PrivateRoute element={<AdminPage />} />}
        />
        <Route path="/new" element={<PrivateRoute element={<NewBlog />} />} />
        <Route
          path="/update/:id"
          element={<PrivateRoute element={<UpdateBlog />} />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ShowBlog />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {getFooterComponent(location)}
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
