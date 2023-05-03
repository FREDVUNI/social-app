import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import Person from "../../images/person.png";
import Cover from "../../images/login.jpg";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Update from "../../components/update/Update";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import NoImage from "../../images/Noimage.jpg";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const { isLoading, error, data } = useQuery(
    ["user", currentUser.id],
    async () => {
      const response = await makeRequest.get("/users/find/" + userId);
      return response.data;
    }
  );
  // console.log(data);

  const { isLoading: rshipLoading, data: relationshipData } = useQuery(
    ["relationship"],
    async () => {
      const response = await makeRequest.get(
        "/relationships?followed_userId=" + userId
      );
      return response.data;
    }
  );
  // console.log(relationshipData);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );
  const handleFollow = (e) => {
    e.preventDefault();
    mutation.mutate(relationshipData.includes(currentUser.id));
  };
  return (
    <div className="profile">
      {error ? (
        <span className="text-error">There was an error loading profile.</span>
      ) : isLoading ? (
        <span className="text-loading">Loading ...</span>
      ) : (
        <>
          <div className="images">
            {currentUser.coverImage ? (
              <img
                src={currentUser.coverImage}
                alt="person"
                className="cover"
              />
            ) : (
              <img src={NoImage} alt="person" className="cover" />
            )}
            {currentUser.profileImage ? (
              <img
                src={currentUser.profileImage}
                alt="person"
                className="profilePic"
              />
            ) : (
              <AccountBoxOutlinedIcon className="pointer profilePic" />
            )}
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="small" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="small" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="small" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="small" />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon fontSize="small" />
                </a>
              </div>
              <div className="center">
                <span>Jane Doe</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>USA</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>https://www.lama.dev</span>
                  </div>
                </div>
                {rshipLoading ? (
                  <span className="text-loading">Loading ...</span>
                ) : userId === currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)}>update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "UnFollow"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && (
        <Update setOpenUpdate={setOpenUpdate} user={currentUser} />
      )}
    </div>
  );
};

export default Profile;
