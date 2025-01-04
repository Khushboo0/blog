import React from "react";
import { usePost } from "../context/PostsContext";

const BlogList = () => {
  const { posts, loading } = usePost();
  const {deletePost} = usePost();

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }
  if (!posts) {
    return <p style={{ textAlign: "center" }}>No posts available.</p>;
  }

  const handleDelete=(postId)=>{
    deletePost(postId)
  }


  return (
    <div className="container mt-5 ">
      <h1 className="display-6 mb-3 text-center">Posted Blogs</h1>
      {posts.map((post) => (
        <div key={post._id} className="card mb-4 border border-secondary shadow-lg">
          <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.content}</p>
          <small>By {post.author}</small>
          <button className="btn btn-primary mx-2" >Edit</button>
          <button className="btn btn-danger mx-2" onClick={()=>handleDelete(post._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};


  
  export default BlogList;