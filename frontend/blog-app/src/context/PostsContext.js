import React, { createContext, useReducer, useContext } from "react";

// Action types
const ADD_POST = "ADD_POST";
const SET_POST = "SET_POST";
const DEL_POST = "DEL_POST";
const EDIT_POST = "EDIT_POST";

// Initial state
const initialState = {
  posts: [],
  loading: false,
};

// Reducer function
const postReducer = (state, action) => {
  switch (action.type) {
    case ADD_POST:
      return { ...state, posts: [...state.posts, action.payload] };

    case SET_POST:
      return { ...state, posts: action.payload, loading: false };

    case DEL_POST:
      
      const results = state.posts.filter((i) => i._id !== action.payload);

      return {...state, posts:results};

    case EDIT_POST:

      return { ...state };
    default:
      return state;
  }
};

// Create context
const PostContext = createContext();

// Custom hook to use Post context
export const usePost = () => useContext(PostContext);

// Context provider component
export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  // Add a new post
  const addPost = (post) => {
    dispatch({ type: ADD_POST, payload: post });
  };

  // Set posts after fetching
  const setPost = (posts) => {
    dispatch({ type: SET_POST, payload: posts });
  };

  const editPost = (postId) => {
    dispatch({ type: EDIT_POST, payload: postId });
  };
  const deletePost = (postId) => {
    dispatch({ type: DEL_POST, payload: postId });
  };
  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        loading: state.loading,
        addPost,
        setPost,
        editPost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
