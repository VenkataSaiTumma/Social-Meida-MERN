import styled from "styled-components";
import { Person, Search, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user } = React.useContext(AuthContext);
  // console.log(user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Wrapper>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Social Media</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchBar">
            <Search className="searchIcon" />
            <input placeholder="Search your thing" className="searchInput" />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={PF + user.profilePicture || PF + "person/noCover.jpg"}
              alt=""
              className="topbarImg"
            />
          </Link>
        </div>
        <div>
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .topbarContainer {
    height: 50px;
    width: 100%;
    background-color: #05386b;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 999;
  }

  .topbarLeft {
    flex: 3;
  }

  .logo {
    font-size: 18px;
    margin-left: 20px;
    font-weight: bold;
    color: white;
    cursor: pointer;
  }

  .topbarCenter {
    flex: 5;
  }

  .searchBar {
    width: 100%;
    height: 30px;
    background-color: white;
    border-radius: 30px;
    display: flex;
    align-items: center;
  }

  .searchIcon {
    font-size: 20px;
    margin-left: 8px;
  }

  .searchInput {
    border: none;
    width: 70%;
    outline: none;
  }

  .topbarRight {
    flex: 4;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: whitesmoke;
  }

  .topbarIcons {
    display: flex;
  }

  .topbarIconItem {
    margin-right: 15px;
    cursor: pointer;
    position: relative;
  }

  .topbarIconBadge {
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    color: whitesmoke;
    position: absolute;
    top: -5px;
    right: -5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }

  .topbarImg {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }

  .logout {
    color: black;
    background-color: lightsteelblue;
    border: none;
    padding: 7px;
    border-radius: 5px;
    margin-right: 10px;
    cursor: pointer;
  }
`;

export default Navbar;
