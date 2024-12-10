import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../css/blog.css";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { BASE_URL } from "../constant/constant";

export default function EditBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get blog ID from route params
  const [theme, setTheme] = useState("snow");
  const quillRef = useRef(null);

  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/blog/posts/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setContent(data.description);
        } else {
          alert("Failed to fetch blog details.");
          navigate("/blog"); 
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred while fetching the blog details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/blog/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, description: content }),
      });

      if (response.ok) {
        alert("Blog updated successfully!");
        navigate("/blog");
      } else {
        const error = await response.json();
        alert(error.message || "Failed to update the blog.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating the blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog-container">
      <h1 className="blog-heading">Edit Blog</h1>
      <form className="blog-form" onSubmit={handleSubmit}>
        <label htmlFor="title" className="blog-label">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="blog-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Edit your blog title"
          disabled={loading}
        />
        <label htmlFor="content" className="blog-label">
          Content
        </label>
        <ReactQuill
          ref={quillRef}
          theme={theme}
          value={content}
          onChange={setContent}
          modules={EditBlog.modules}
          formats={EditBlog.formats}
          className="blog-editor"
          placeholder="Edit your blog content here..."
          readOnly={loading}
        />
        <button type="submit" className="blog-submit" disabled={loading}>
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}

EditBlog.modules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    ["link", "image", "video"],
    ["code-block"],
    ["clean"],
  ],
  clipboard: { matchVisual: false },
};

EditBlog.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "align",
  "color",
  "background",
  "link",
  "image",
  "video",
  "code-block",
];

EditBlog.propTypes = { placeholder: PropTypes.string };