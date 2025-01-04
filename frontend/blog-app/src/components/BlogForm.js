import React, { useState } from "react";
import { usePost } from "../context/PostsContext";

import {
  ValidateBlogPost,
  VALIDATION_RULES,
} from "../Validations/BlogFormValidation";

const API_URL = "";

const BlogForm = () => {
  const { addPost } = usePost();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors({});
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    const validationResult = ValidateBlogPost(formData);

    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return;
    }

    setLoading(true);
    setProgress(0);

    const postInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(postInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(formData),
        });
        const newPost = await response.json();

        if (!response.ok) {
          throw new Error(newPost.message || "Failed to add Post");
        }

        addPost(newPost);
        setSuccess(true);
        setFormData({ title: "", content: "", author: "" });
      } catch (err) {
        setErrors({
          submit: err.message || "An error occurred while adding the post",
        });
      } finally {
        setLoading(false);
        setProgress(0);
      }
    }, 2000);
  };
  return (
    <div className="container mt-4">
      {errors.submit && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {errors.submit}
          <button
            type="button"
            className="btn-close"
            onClick={() => setErrors({})}
            aria-label="Close"
          ></button>
        </div>
      )}

      {success && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          Post added successfully!
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccess(false)}
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Enter Post Title"
                value={formData.title}
                onChange={handleChange}
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                placeholder="Enter the Post content"
                value={formData.content}
                onChange={handleChange}
                className={`form-control ${errors.content ? "is-invalid" : ""}`}
                style={{ height: "150px" }}
                required
                minLength={VALIDATION_RULES.content.minLength}
                maxLength={VALIDATION_RULES.content.maxLength}
              />
              {errors.content && (
                <div className="invalid-feedback">{errors.content}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                Author
              </label>
              <input
                id="author"
                type="text"
                name="author"
                placeholder="Enter Author name"
                value={formData.author}
                onChange={handleChange}
                className={`form-control ${errors.author ? "is-invalid" : ""}`}
                required
                minLength={VALIDATION_RULES.author.minLength}
                maxLength={VALIDATION_RULES.author.maxLength}
              />
              {errors.author && (
                <div className="invalid-feedback">{errors.author}</div>
              )}
            </div>


            {loading && (
              <div className="mb-3">
                <label>Submitting Post...</label>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100"
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Adding Post...
                </>
              ) : (
                "Add Post"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
