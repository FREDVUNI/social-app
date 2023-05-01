import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Share = () => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [file, setFile] = useState(null);
  const [details, setDetails] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const mutation = useMutation(
    (formData) => {
      return makeRequest.post("/posts", formData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  // const handleChange = (e) => {
  //   setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  const handleClick = async (e) => {
    e.preventDefault();
    let imgURL = "";
    if (file) imgURL = await upload();

    const formData = new FormData();
    formData.append("details", details);
    formData.append("image", imgURL);

    mutation.mutate(formData);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          {currentUser.profileImage ? (
            <img src={currentUser.profileImage} alt="person" />
          ) : (
            <AccountBoxOutlinedIcon className="pointer" />
          )}
          <input
            type="text"
            placeholder={`What's on your mind ${currentUser.name}?`}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              name="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
