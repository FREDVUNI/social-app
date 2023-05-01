import { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/Auth";
import Story from "../../images/login.jpg";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  //TEMPORARY
  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: Story,
    },
    {
      id: 2,
      name: "John Doe",
      img: Story,
    },
    {
      id: 3,
      name: "John Doe",
      img: Story,
    },
    {
      id: 4,
      name: "John Doe",
      img: Story,
    },
  ];

  return (
    <div className="stories">
      <div className="story">
        {currentUser.profileImage ? (
          <img src={currentUser.profileImage} alt="person" />
        ) : (
          <AccountBoxOutlinedIcon className="pointer"/>
        )}
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="story" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
