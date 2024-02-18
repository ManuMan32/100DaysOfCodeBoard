export interface Post {
  date: number
  day: number
  tweet: string
  attachment: null | {
    type: "image" | "video"
    root: string
  }
}