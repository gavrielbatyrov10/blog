import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../css/blog.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { BASE_URL } from "../constant/constant";

export default function Createblog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const [theme, setTheme] = useState("snow");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(BASE_URL + "/blog/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, description: content }),
      });

      if (response.ok) {
        alert("Blog created successfully!");
        navigate("/blog");
      } else {
        const error = await response.json();
        alert(error.message || "Failed to create the blog.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while creating the blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog-container">
      <h1 className="blog-heading">Create a New Blog</h1>
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
          placeholder="Enter your blog title"
        />
        <label htmlFor="content" className="blog-label">
          Content
        </label>
        <ReactQuill
          theme={theme}
          value={content}
          onChange={setContent}
          modules={Createblog.modules}
          formats={Createblog.formats}
          className="blog-editor"
          placeholder="Write your blog content here..."
        />
        <button type="submit" className="blog-submit" disabled={loading}>
          {loading ? "Posting..." : "Post Blog"}
        </button>
      </form>
    </div>
  );
}
Createblog.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: { matchVisual: false },
};
Createblog.formats = [
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
  "link",
  "image",
  "video",
];
Createblog.propTypes = { placeholder: PropTypes.string };
