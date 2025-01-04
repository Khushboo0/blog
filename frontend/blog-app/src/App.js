import React, { useEffect } from "react";
import { PostProvider, usePost } from "./context/PostsContext";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";

const AppContent = () => {
  const { post, setPost, loading } = usePost();
  const API_URL = "http://localhost:5000/api/posts";

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 className="display-5 text-center">
        Blog App 
      </h1>
      <BlogForm />
      <BlogList posts={post} loading={loading} />
    </div>
  );
};

const App = () => {
  return(
  <PostProvider>
    <AppContent />
  </PostProvider>);
};
export default App;
