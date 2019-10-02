import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "./axiosWithAuth";
import './App.css'
const Posts = () => {
const initialPost = {
    
    title: '',
    content:'',
  };
  const initialComment = {
    id:'',
    text: '',
    content:'',
  };
  
  const [posts, updatePosts ] = useState([]);
      useEffect(() => {
        getData();
      }, []);
      const getData = () => {
      axiosWithAuth()
          .get('/')
          .then(res => updatePosts(res.data))
          .catch(error => console.log(error));
      }
      const [comments, updateComments] = useState([]);
     
      useEffect(() => {
        getComments();
      }, []);
      const getComments = () => {
      axiosWithAuth()
          .get(`/${CommentToEdit.id}/comments`, CommentToEdit.id)
          .then(res => updateComments(res.data))
          .catch(error => console.log(error));
      }
  
    console.log(posts);
    const [editing, setEditing] = useState(false);
    const [showing, setShowing] = useState(true);
    const [PostToEdit, setPostToEdit] = useState(initialPost);
    const [CommentToEdit, setCommentToEdit] = useState(initialComment); console.log(CommentToEdit)
  console.log("Post to edit", PostToEdit)
  console.log("initial Post", initialPost)
    const editPost = post=> {
      setEditing(true);
      setPostToEdit(post);
    }
    
    const saveEdit = e => {
        e.preventDefault();
         axiosWithAuth()
          .put(`/${PostToEdit.id}`, PostToEdit)
          .then(res => {
            console.log(res.data)
              getData();
          })
          .catch(err => console.log(err.response));
            
      };
      
      const createPost = e => {
        e.preventDefault();
     console.log(PostToEdit);
      axiosWithAuth()
       .post(`/`, PostToEdit )
       .then(res => {
         console.log(res);
         getData();
       })
       .catch(err => console.log(err.response));
   }
   const createComment = e => {
    e.preventDefault();
 console.log(PostToEdit);
  axiosWithAuth()
   .post(`/${CommentToEdit.id}/comments`, CommentToEdit )
   .then(res => {
     console.log(res);
     getData();
   })
   .catch(err => console.log(err.response));
}

   const deletePost = post => {
    console.log(post);
     axiosWithAuth()
      .delete(`/${post.id}`, post.id)
      .then(res => {
        console.log(res);
        getData();
      })
      .catch(err => console.log(err.response));
  };
      return (
         <div>
             <div className="Post-container">
 {!editing && (
    <form onSubmit={createPost}>
     
          <legend>New Post</legend>
         
          <label>
            Title:
            <input type="text"
              onChange={e =>
                setPostToEdit({
                  ...PostToEdit,
                title: e.target.value})
              }
              value={PostToEdit.title}
            />
          </label>
          <label>
            Content:
            <input type="text"
              onChange={e =>
                setPostToEdit({
                  ...PostToEdit,
                  content: e.target.value})
              }
              value={PostToEdit.content}
            />
          </label>
         
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
        )}
        {editing && (
    <form onSubmit={saveEdit}>
     
          <legend> Edit The Post </legend>
          <label>
            Title:
            <input type="text"
              onChange={e =>
                setPostToEdit({
                  ...PostToEdit,
                title: e.target.value})
              }
              value={PostToEdit.title}
            />
          </label>
          <label>
            Content:
            <input type="text"
              onChange={e =>
                setPostToEdit({
                  ...PostToEdit,
                  content: e.target.value})
              }
              value={PostToEdit.content}
            />
          </label>
         
        
         
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
        )}

       </div> 
          <div className="list">
      <ul> 
       <button onClick={() => setShowing(false)}> hide </button>
       <button onClick={() => setShowing(true)}> show </button>
         {showing && (
          
         <form>  
       {posts.map(post => (
         
         <li id="sessionDate" key={post.id} onClick={() => editPost(post)}>
         <span>
           <span className="delete" onClick={() => deletePost(post)}>
             
           🔸
           </span>{" "} 
           <div>
            <button className="Comments-show" onClick={() => setCommentToEdit(post.id)}> Comments</button>
            {comments.map(comment=> (
              <div>
                <p>{comment.text}</p>
              </div>
            ))}
            </div>
          {post.title}
           {post.contents}
         </span>
           
         
       </li>
       
        ))}
        
        </form>
         )}
 </ul> 
 </div>
 </div>
      )
    
    
    }
    export default Posts;