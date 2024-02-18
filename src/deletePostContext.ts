import { createContext, useContext } from "react"
export type GlobalContent = {
  deletePost: boolean
  setDeletePost: (val: boolean) => void
}
export const DeletePostContext = createContext<GlobalContent>({
  deletePost: false,
  setDeletePost: (_value: boolean) => { },
})
export const useDeletePostContext = () => useContext(DeletePostContext);