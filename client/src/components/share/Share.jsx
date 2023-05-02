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
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgURL = "";
    if (file) imgURL = await upload();
    mutation.mutate({ details, image: imgURL });
    setDetails("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            {currentUser.profileImage ? (
              <img src={currentUser.profileImage} alt="person" />
            ) : (
              <AccountBoxOutlinedIcon className="pointer" />
            )}
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDetails(e.target.value)}
              value={details}
            />
          </div>
          <div className="right">
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="file"
              />
            )}
          </div>
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
              fde
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
            <button type="submit" onClick={handleClick}>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
