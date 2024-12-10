import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/blog.css";
import { BASE_URL } from "../constant/constant";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
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

        // Adding the first image to each blog
        const blogsWithImages = data.map((blog) => ({
          ...blog,
          image: extractFirstImage(blog.description), // Extract the first image from the description
        }));

        setBlogs(blogsWithImages);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false); // Set loading to false after the request completes
      }
    };

    fetchBlogs();
  }, []);

  const handleCreateBlog = () => {
    navigate("/post/blog");
  };

  const extractFirstImage = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const firstImage = tempDiv.querySelector("img");
    return firstImage ? firstImage.src : null; // Return the src of the first image if it exists
  };

  const stripHTML = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <div className="blog-listing-container">
      <header className="blog-header">
        <h1>Blog Listing</h1>
        {localStorage.getItem('role') === 'admin' && (
          <button className="create-blog-button" onClick={handleCreateBlog}>
            Create New Blog
          </button>
        )}
      </header>
      <div className="blog-cards">
        {/* Show loading indicator while data is being fetched */}
        {isLoading ? (
          <div className="loading-indicator"></div>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              {/* Display the image if it exists */}
              {blog.image && <img src={blog.image} alt="Blog preview" className="blog-image" />}
              <h2>{blog.title}</h2>

              <p className="blog-meta">
                Created by <span>{blog.createdBy.name}</span> on{" "}
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </p>
              <div className="blog-description">
                {blog.description.length > 30 ? (
                  <>
                    {stripHTML(blog.description.substring(0, 30))}...
                    <span
                      className="read-more"
                      onClick={() => navigate(`/blog/${blog.id}`)}
                    >
                      Read More
                    </span>

                    <button className="edit__btn" onClick={() => navigate(`/blog/edit/${blog.id}`)}>Edit</button>
                  </>
                ) : (
                  stripHTML(blog.description)
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
