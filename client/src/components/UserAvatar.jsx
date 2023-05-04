import React from "react";
import { useLoggedInUser } from "../context/Auth";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";

const UserAvatar = ({ userId }) => {
  const { data: user, isLoading, error } = useLoggedInUser(userId);

  if (isLoading) {
    return <span className="text-loading">Loading ...</span>;
  }

  if (error) {
    return (
      <span className="text-error">There was an error loading posts.</span>
    );
  }

  return (
    <div className="user">
      {user?.profileImage ? (
        <img src={"/uploads/profile/" + user.profileImage} alt="person" />
      ) : (
        <AccountBoxOutlinedIcon className="pointer" />
      )}
      <span>{user?.username}</span>
    </div>
  );
};

export default UserAvatar;
