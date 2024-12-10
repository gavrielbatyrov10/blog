import "./App.css";
import Navbar from "./components/Navbar";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import Createblog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/blog" element={<Createblog/>} />
        <Route path="/blog/:id" element={<BlogDetails/>} />
        <Route path="/blog/edit/:id" element={<EditBlog/>} />
        <Route path="/blog" element={<Blog/>} />

      </Routes>
    </Router>
  );
}

export default App;
