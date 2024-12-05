import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/blog.css";
import { BASE_URL } from "../constant/constant";
export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/blog/posts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blogs.");
        }

        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleCreateBlog = () => {
    navigate("/post/blog");
  };

  return (
    <div className="blog-listing-container">
      <header className="blog-header">
        <h1>Blog Listing</h1>
        <button className="create-blog-button" onClick={handleCreateBlog}>
          Create New Blog
        </button>
      </header>
      <div className="blog-cards">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <h2>{blog.title}</h2>

            <p className="blog-meta">
              Created by <span>{blog.createdBy.name}</span> on{" "}
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </p>
            <div
              className="blog-description"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
