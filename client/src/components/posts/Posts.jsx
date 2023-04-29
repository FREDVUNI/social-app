import Post from "../post/Post";
import "./posts.scss";
import Person from "../../images/person.png";
import PostImg from "../../images/login.jpg";

const Posts = () => {
  const posts = [
    {
      id: 1,
      name: "John Doe",
      userId: 1,
      profilePic: Person,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: PostImg,
    },
    {
      id: 2,
      name: "Jane Doe",
      userId: 2,
      profilePic: Person,
      desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
      img: PostImg,
    },
  ];

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
