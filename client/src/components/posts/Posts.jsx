import Post from "../post/Post";
import "./posts.scss";
// import Person from "../../images/person.png";
// import PostImg from "../../images/login.jpg";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({userId}) => {
  // const posts = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     userId: 1,
  //     profilePic: Person,
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     img: PostImg,
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Doe",
  //     userId: 2,
  //     profilePic: Person,
  //     desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
  //     img: PostImg,
  //   },
  // ];
  const { isLoading, error, data } = useQuery(["posts"], async () => {
    const response = await makeRequest.get("/posts?userId=" + userId);
    return response.data;
  });

  // console.log(data);

  return (
    <div className="posts">
      {error ? (
        <span className="text-error">There was an error loading posts.</span>
      ) : isLoading ? (
        <span className="text-loading">Loading ...</span>
      ) : (
        data.map((post) => <Post post={post} key={post.id} />)
      )}
    </div>
  );
};

export default Posts;
