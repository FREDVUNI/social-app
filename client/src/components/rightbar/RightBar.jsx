import React from "react";
import "./rightbar.scss";
import Person from "../../images/person.png";

const RightBar = () => {
  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img src={Person} alt="person" />
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Person} alt="person" />
              <span>John Doe</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img src={Person} alt="person" />
              <p>
                <span>Jane Doe</span> Changed their profile picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Person} alt="person" />
              <p>
                <span>Jane Doe</span> Changed their profile picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img src={Person} alt="person" />
              <div className="online"/>
                <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Person} alt="person" />
              <div className="online"/>
                <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Person} alt="person" />
              <div className="online"/>
                <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Person} alt="person" />
              <div className="online"/>
                <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Person} alt="person" />
              <div className="online"/>
                <span>Jane Doe</span>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default RightBar;
