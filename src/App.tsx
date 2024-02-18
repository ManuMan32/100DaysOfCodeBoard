import './App.css'
import { useState, useEffect } from "react"
import AddPost from './components/addpost/AddPost'
import Nav from './components/nav/Nav'
import { Post } from './model'
import { ShowAddPostContext } from "./showAddPostContext"
import { PostListContext } from './postListContext'
import { DeletePostContext } from "./deletePostContext"
import PostList from './components/postlist/PostList'
import Footer from './components/footer/Footer'

function App() {
  const [showAddPost, setShowAddPost] = useState<boolean>(false);
  const [deletePost, setDeletePost] = useState<boolean>(false);
  const [postList, setPostList] = useState<Post[]>([]);
  useEffect(() => {
    (deletePost) ? document.documentElement.style.setProperty("--ui1", "#f00")
      : document.documentElement.style.setProperty("--ui1", "#ccc")
  }, [deletePost]);
  return (
    <ShowAddPostContext.Provider value={{ showAddPost, setShowAddPost }}>
      <DeletePostContext.Provider value={{ deletePost, setDeletePost }}>
        <Nav />
        <PostListContext.Provider value={{ postList, setPostList }}>
          {(showAddPost) ? <AddPost /> : void 0}
          <PostList />
        </PostListContext.Provider>
        <Footer />
      </DeletePostContext.Provider>
    </ShowAddPostContext.Provider>
  )
}

export default App
