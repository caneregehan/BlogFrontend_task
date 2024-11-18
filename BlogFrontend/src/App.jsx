import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import NewBlog from "./pages/NewBlog";
import UpdateBlog from "./pages/UpdateBlog";
import Deneme from "./pages/Deneme";
import Navbar from "./pages/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/new" element={<NewBlog />} />
        <Route path="/update/:id" element={<UpdateBlog />} />
        <Route path="/deneme" element={<Deneme />} />
      </Routes>
    </Router>
  );
};

export default App;
