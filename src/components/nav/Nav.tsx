import { useShowAddPostContext } from "../../showAddPostContext";
import { useDeletePostContext } from "../../deletePostContext";
import "./Nav.css";
import { useState } from "react";
const Nav: React.FC = () => {
  const { showAddPost, setShowAddPost } = useShowAddPostContext();
  const { setDeletePost } = useDeletePostContext();
  const [opened, setOpened] = useState<string>("-100%");
  const [fixed, setFixed] = useState<boolean>(false);
  function handleMouseEnterEffect() {
    const newValue = (fixed) ? "0" : (opened == "0") ? "-100%" : "0";
    setOpened(newValue);
  }
  function handleToggleShowAddPost() {
    setFixed(!showAddPost);
    setShowAddPost(!showAddPost);
  }
  function handleDeletePost() {
    setDeletePost(true);
  }
  return (
    <div className="navContainer" onMouseEnter={handleMouseEnterEffect} onMouseLeave={handleMouseEnterEffect}>
      <div className="appTitle">
        <h1>100 Days Of Code Board</h1>
      </div>
      <nav className="nav" style={{
        top: opened
      }}>
        <ul className="navList">
          <li className="navListOption">
            <button
              className="navListOptionButton"
              type="button"
              onClick={handleToggleShowAddPost}>
              Add post
            </button>
          </li>
          <li className="navListOption">
            <button
              className="navListOptionButton"
              type="button"
              onClick={handleDeletePost}>
              Delete post
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
export default Nav;