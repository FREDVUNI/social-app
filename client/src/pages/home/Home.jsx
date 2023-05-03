import React, { useContext } from "react";
import "./home.scss";
import Stories from "../../components/stories/Stories";
import Share from "../../components/share/Share";
import Posts from "../../components/posts/Posts";
import { AuthContext } from "../../context/Auth";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="home">
      <Stories />
      <Share />
      <Posts userId={currentUser.id} />
    </div>
  );
};

export default Home;
