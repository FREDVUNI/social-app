import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import NoImage from "../../images/Noimage.jpg";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    website: user.website,
  });
  //   console.log(user);

  const upload = async (file) => {
    // console.log(file);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/profile/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverImage;
    profileUrl = profile ? await upload(profile) : user.profileImage;

    mutation.mutate({
      ...texts,
      coverImage: coverUrl,
      profileImage: profileUrl,
    });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile </h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                {user.coverImage ? (
                  <img
                    src={
                      cover
                        ? URL.createObjectURL(cover)
                        : "/uploads/profile/" + user.coverImage
                    }
                    alt="cover"
                  />
                ) : (
                  <img
                    src={cover ? URL.createObjectURL(cover) : NoImage}
                    alt="NoImage"
                  />
                )}
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                {user.profileImage ? (
                  <img
                    src={
                      profile
                        ? URL.createObjectURL(profile)
                        : "/uploads/profile/" + user.profileImage
                    }
                    alt=""
                  />
                ) : (
                  <img
                    src={profile ? URL.createObjectURL(profile) : NoImage}
                    alt="NoImage"
                  />
                )}
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Email</label>
          <input
            type="email"
            value={texts.email}
            name="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            value={texts.password}
            name="password"
            onChange={handleChange}
          />
          <label>Name</label>
          <input
            type="text"
            value={texts.name}
            name="name"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={texts.website}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default Update;
