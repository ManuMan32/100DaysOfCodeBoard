import { Post } from "../../model";
import { usePostListContext } from "../../postListContext";
import { useDeletePostContext } from "../../deletePostContext";
import "./PostList.css";
import { useEffect } from "react";
function parseDateToString(dateNum: number): string {
  const date = new Date(dateNum);
  const days = date.getDate().toString().padStart(2, '0');
  const months = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${days}/${months}/${year}`;
}
const PostList: React.FC = () => {
  const { postList, setPostList } = usePostListContext();
  const { deletePost, setDeletePost } = useDeletePostContext();
  function readKeysPostLocalStorage(): string[] {
    const postKeys: string[] = [];
    for (let i = 0; true; i++) {
      const key = `post${i}`;
      if (localStorage.getItem(key) == null) break
      else postKeys.push(key)
    }
    return postKeys;
  }
  useEffect(() => {
    // Load function
    const postKeys = readKeysPostLocalStorage(); 
    const loadedPostList: Post[] = [];
    postKeys.forEach(key => {
      const postObj = JSON.parse(localStorage.getItem(key)!);
      loadedPostList.push(postObj);
    });
    setPostList(loadedPostList);
  }, []);
  window.addEventListener("beforeunload", () => {
    // Save function
    const postKeys = readKeysPostLocalStorage();
    const postJSON = postList.map(post => JSON.stringify(post));
    postJSON.forEach((postObj, i) => {
      localStorage.setItem(`post${i}`, postObj);
    });
    if (postKeys.length > postJSON.length) {
      for (let i = postJSON.length; i < postKeys.length; i++) {
        localStorage.removeItem(postKeys[i]);
      } 
    }
  });
  function handleErasePost(val: number) {
    const copyArrPostList: Post[] = [...postList];
    copyArrPostList.splice(val, 1);
    setPostList(copyArrPostList);
    setDeletePost(false);
  }
  return (
    <div className="postList">
      {postList.map((post, i) => {
        return <div
          className="post"
          key={`post${i}`}
          onClick={() => { if (deletePost) handleErasePost(i) }}>
          <div className="postDateContainer">
            <span className="postDate">{parseDateToString(post.date)}</span>
          </div>
          <div className="postContent">
            <div className="postTextBox">
              <span className="postHashtag">Day {post.day} of #100DaysOfCode</span>
              <p className="postTweet">{post.tweet}</p>
            </div>
            <div className="postAttachmentContainer">
              {(post.attachment == null) ? void 0
                : (post.attachment.type == "image") ? <img className="postImage" src={post.attachment.root} alt={post.attachment.root} />
                  : <video className="postVideo" src={post.attachment.root} controls></video>}
            </div>
          </div>
        </div>
      })}
    </div>
  )
}
export default PostList;