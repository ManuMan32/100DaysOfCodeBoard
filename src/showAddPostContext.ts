import { createContext, useContext } from "react"
export type GlobalContent = {
  showAddPost: boolean
  setShowAddPost: (val: boolean) => void
}
export const ShowAddPostContext = createContext<GlobalContent>({
  showAddPost: false,
  setShowAddPost: (_value: boolean) => { },
})
export const useShowAddPostContext = () => useContext(ShowAddPostContext)