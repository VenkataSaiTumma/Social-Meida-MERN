import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { Users } from "../Data";
import OnlineList from "./List/OnlineList";
import { Add, Remove } from "@material-ui/icons";

const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = React.useContext(AuthContext);

  // Follow or unFollow User
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/user/friends/" + user._id);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user]);

  // Follow or unFollow User
  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/user/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/user/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  };

  const HomeRightBar = () => {
    return (
      <Wrapper>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF + "gift.png"} alt="" />
          <span className="birthdayText">
            <b>User1</b> and <b>2 other friends</b> have birthday today
          </span>
        </div>
        <img className="rightbarADD" src={PF + "add.png"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="friendsList">
          {Users.map((u) => (
            <OnlineList key={u.id} user={u} />
          ))}
        </ul>
      </Wrapper>
    );
  };

  const ProfileRightBar = () => {
    return (
      <Wrapper>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "unFollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="ProfileTitle"> User Information</h4>
        <div className="Information">
          <div className="InfoItem">
            <span className="InfoKey">City:</span>
            <span className="InfoValue">{user.city}</span>
          </div>
          <div className="InfoItem">
            <span className="InfoKey">From:</span>
            <span className="InfoValue">{user.from}</span>
          </div>
          <div className="InfoItem">
            <span className="InfoKey">Reationship:</span>
            <span className="InfoValue">
              {user.relationship === 1
                ? "single"
                : user.relationship === 2
                ? "Married"
                : "NA"}
            </span>
          </div>
        </div>

        {/* Profile/username => User Friends */}
        <h4 className="ProfileTitle"> User Friends</h4>
        <div className="Followings">
          {friends.map((friend) => (
            <Link
              to={`/profile/` + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="Following">
                <img
                  className="FollowingImg"
                  src={PF + "person/2p.jpg" || PF + "person/noProfile.png"}
                  alt=""
                />
                <span className="FollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </Wrapper>
    );
  };

  return (
    <Wrapper>
      <div className="rightbar">
        <div className="rightbarWrapper">
          {user ? <ProfileRightBar /> : <HomeRightBar />}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 4;

  .rightbarWrapper {
    padding: 55px 10px;
  }

  .birthdayContainer {
    display: flex;
    align-items: center;
  }

  .birthdayImg {
    width: 40px;
    height: 40px;
    margin-top: 10px;
  }

  .birthdayText {
    font-weight: 300;
    font-size: 15px;
  }

  .rightbarADD {
    width: 90%;
    height: 200px;
    border-radius: 10px;
    margin: 30px 0;
  }

  .rightbarTitle {
    margin-bottom: 20px;
  }

  .friendsList {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .ProfileTitle {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .Information {
    margin-bottom: 30px;
  }

  .InfoItem {
    margin-bottom: 10px;
  }

  .InfoKey {
    font-weight: 500;
    margin-right: 15px;
    color: black;
  }

  .InfoValue {
    font-weight: 300;
  }

  .Followings {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .Following {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    cursor: pointer;
  }

  .FollowingImg {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
  }

  .rightbarFollowButton {
    margin-top: 30px;
    margin-bottom: 10px;
    border: none;
    background-color: blueviolet;
    color: white;
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    outline: none;
  }
`;

export default Rightbar;
