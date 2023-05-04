import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import moment from "moment";
import NoImage from "../../images/Noimage.jpg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/Auth";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery(["likes", post.id], async () => {
    const response = await makeRequest.get("/likes?postId=" + post.id);
    return response.data;
  });
  // console.log(data);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        // invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const DeleteMutation = useMutation(
    (postId) => {
      if (postId) return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        // invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  const handleDelete = () => {
    DeleteMutation.mutate(post.id);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            {post.profileImage ? (
              <img src={"/uploads/profile/" + post.profileImage} alt="person" />
            ) : (
              <AccountBoxOutlinedIcon className="pointer" />
            )}
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon
            className="pointer"
            onClick={() => setOpenMenu(!openMenu)}
          />
          {openMenu && (
            <button
              className="pointer"
              onClick={handleDelete}
              style={{
                backgroundColor: "#f0544f",
                color:"#fff",
                border: "none",
                padding: "5px",
              }}
            >
              Delete
            </button>
          )}
        </div>
        <div className="content">
          <p>{post.details.split(" ").slice(0, 50).join(" ")}...</p>
          {post.image ? (
            <img src={"/uploads/posts/" + post.image} alt="" />
          ) : (
            <img src={NoImage} alt="noimage" />
          )}
        </div>
        <div className="info">
          <div className="item">
            {error ? (
              <span className="text-error">Error ...</span>
            ) : isLoading ? (
              <span className="text-loading">Loading ...</span>
            ) : data && data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data && data.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {post.length} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>

        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
