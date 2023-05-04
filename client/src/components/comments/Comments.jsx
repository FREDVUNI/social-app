import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/Auth";
// import Person from "../../images/person.png";
import moment from "moment";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const [details, setDetails] = useState("");
  // const comments = [
  //   {
  //     id: 1,
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
  //     name: "John Doe",
  //     userId: 1,
  //     profilePicture: Person,
  //   },
  //   {
  //     id: 2,
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
  //     name: "Jane Doe",
  //     userId: 2,
  //     profilePicture: Person,
  //   },
  // ];
  const { isLoading, error, data } = useQuery(["comments"], async () => {
    const response = await makeRequest.get("/comments?postId=" + postId);
    return response.data;
  });

  // console.log(data);

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ details, postId });
    setDetails("");
  };

  return (
    <div className="comments">
      <div className="write">
        {currentUser.profileImage ? (
          <img src={currentUser.profileImage} alt="person" />
        ) : (
          <AccountBoxOutlinedIcon className="pointer" />
        )}
        <input
          type="text"
          placeholder="write a comment"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <button type="submit" onClick={handleClick}>
          Send
        </button>
      </div>
      {error ? (
        <span className="text-error">There was an error loading posts.</span>
      ) : isLoading ? (
        <span className="text-loading">Loading ...</span>
      ) : (
        data.map((comment) => (
          <div className="comment">
            {comment.profileImage ? (
              <img
                src={"/uploads/profile/" + comment.profileImage}
                alt="person"
              />
            ) : (
              <AccountBoxOutlinedIcon className="pointer" />
            )}
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.details}</p>
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;
