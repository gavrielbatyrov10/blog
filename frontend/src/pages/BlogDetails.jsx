import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/blogDetails.css";
import { BASE_URL } from "../constant/constant";
const BlogDetails = () => {
  const { id } = useParams(); 
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${BASE_URL}/blog/posts/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blog details.");
        }

        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        setError("Unable to fetch the blog details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading blog details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="blog-detail-container">
      <h1 className="blog-title">{blog.title}</h1>
      <p className="blog-meta">
        <span>By {blog.createdBy?.name || "Unknown Author"}</span>
        <span> | {new Date(blog.createdAt).toLocaleDateString()}</span>
      </p>
      <div
        className="blog-description"
        dangerouslySetInnerHTML={{ __html: blog.description }}
      ></div>
    </div>
  );
};

export default BlogDetails;