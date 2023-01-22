import styled from "styled-components";
import { Navbar, Sidebar, Feed, Rightbar } from "../components/index";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Profile = () => {
  const [user, setUser] = useState({});
  // console.log(user);

  const username = useParams().username;
  // console.log(username);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      // comparing data with username in DB and displaying
      const res = await axios.get(`/user?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <Wrapper>
      <Navbar />
      <div className="Profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="CoverMain">
              <img
                className="CoverPhoto"
                src={PF + user.coverPicture || PF + "person/noCover.jpg"}
                alt=""
              />
              <img
                className="ProfilePhoto"
                src={PF + user.profilePicture || PF + "person/noProfile.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="ProfileInfoName">{user.username}</h4>
              <span className="ProfileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .Profile {
    display: flex;
  }

  .profileRight {
    flex: 9;
  }

  .CoverMain {
    height: 320px;
    position: relative;
  }

  .CoverPhoto {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  .ProfilePhoto {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 150px;
    border: 3px solid whitesmoke;
  }

  .profileInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .ProfileInfoName {
    font-size: 24px;
    margin-top: 1px;
  }

  .ProfileInfoDesc {
    font-weight: 300;
  }

  .profileRightBottom {
    display: flex;
  }
`;

export default Profile;
