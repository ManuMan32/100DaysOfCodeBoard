import { Post } from "../../model";
import { usePostListContext } from "../../postListContext";
import "./AddPost.css";
import { useState, useEffect, useRef } from "react";

const AddPost: React.FC = () => {
  const [appear, setAppear] = useState<boolean>(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const dayInputRef = useRef<HTMLInputElement>(null);
  const tweetInputRef = useRef<HTMLTextAreaElement>(null);
  const rootInputRef = useRef<HTMLInputElement>(null);

  const { postList, setPostList } = usePostListContext();
  function createPostObject(date: number, day: number, tweet: string, type: "image" | "video" | "null", root: string): void {
    const attachment = (type == "null") ? null
      : { type, root }
    const newPost: Post = {
      date, day, tweet, attachment
    }
    const newArr: Post[] = [...postList, newPost];
    setPostList(newArr);
  }
  function checkRadios(): "image" | "video" {
    let returnValue: string = "image";
    const radios = document.getElementsByName("optionsFormat");
    const radiosArray: HTMLInputElement[] = Array.from(radios) as HTMLInputElement[]
    for (let i = 0; i < radiosArray.length; i++) {
      if (radiosArray[i].checked) returnValue = radiosArray[i].value;
    }
    return returnValue as "image" | "video";
  }
  function parseDateToNumber(date: string): number {
    const dateArr = date.split("-");
    const years = parseInt(dateArr[0]);
    const months = parseInt(dateArr[1]) - 1;
    const days = parseInt(dateArr[2]);
    return (new Date(years, months, days)).getTime();
  }

  useEffect(() => {
    if (!appear) setAppear(true);
  }, []);
  return (
    <div className="addPost" style={{
      height: (appear) ? "60vh" : "0"
    }}>
      <div className="addPostGrid">

        {/* Day and date */}
        <div className="addPost_day addPost_cell">
          <label htmlFor="day">
            Day of #100DaysOfCode
            <input type="number" name="day" id="day" defaultValue="1" ref={dayInputRef} />
          </label>
          <label htmlFor="date">
            Date for the schedule
            <input
              type="date"
              name="date"
              id="date"
              defaultValue={new Date().toISOString().split('T')[0]}
              ref={dateInputRef} />
          </label>
        </div>

        {/* Tweet */}
        <div className="addPost_tweet addPost_cell">
          <label htmlFor="tweet">
            Write the tweet
            <textarea id="tweet" style={{ resize: "none" }} ref={tweetInputRef}></textarea>
          </label>
        </div>

        {/* File */}
        <div className="addPost_file addPost_cell">
          <label htmlFor="file">
            Write the file of the post
            <input type="text" name="file" id="file" ref={rootInputRef} />
          </label>
          <div className="addPost_fileRadios">
            <label htmlFor="optionNull">
              Null
              <input type="radio" id="optionNull" name="optionsFormat" value="null" defaultChecked />
            </label>
            <label htmlFor="optionImage">
              Image
              <input type="radio" id="optionImage" name="optionsFormat" value="image" />
            </label>
            <label htmlFor="optionVideo">
              Video
              <input type="radio" id="optionVideo" name="optionsFormat" value="video" />
            </label>
          </div>
        </div>

        {/* Create button */}
        <div className="addPost_create addPost_cell">
          <button
            className="addPost_createButton"
            type="button"
            onClick={() => createPostObject(
              parseDateToNumber(dateInputRef.current!.value),
              parseInt(dayInputRef.current!.value),
              tweetInputRef.current!.value,
              checkRadios(),
              rootInputRef.current!.value)}>
            Create Post
          </button>
        </div>
      </div>
    </div>
  )
}
export default AddPost;