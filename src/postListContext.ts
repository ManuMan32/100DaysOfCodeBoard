import { createContext, useContext } from "react"
import { Post } from "./model"
export type GlobalContent = {
  postList: Post[]
  setPostList: (val: Post[]) => void
}
export const PostListContext = createContext<GlobalContent>({
  postList: [],
  setPostList: (_value: Post[]) => { },
})
export const usePostListContext = () => useContext(PostListContext)