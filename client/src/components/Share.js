import styled from "styled-components";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import React, { useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Share = () => {
  const { user } = React.useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const desc = useRef();

  const [file, setFile] = useState(null);

  const handleClick = (e) => {
    setFile(e.target.files[0]);
  };

  // Uploading a File
  const submitHandle = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);

      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post("/post", newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <div className="main">
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              className="shareProfileImg"
              src={PF + user.profilePicture || PF + "person/noProfile.png"}
              alt=""
            />
            <input
              placeholder={"what's in your mind " + user.username + "?"}
              type="text"
              className="shareInput"
              ref={desc}
            />
          </div>
          <hr className="shareHr" />
          {file && (
            <div className="shareImgContainer">
              <img
                className="shareImg"
                src={URL.createObjectURL(file)}
                alt=""
              />
              <Cancel
                className="shareCancleImg"
                onClick={() => setFile(null)}
              />
            </div>
          )}
          <form className="shareBottom" onSubmit={submitHandle}>
            <div className="shareOptions">
              {/* Uplading a File */}
              <label htmlFor="file" className="shareOption">
                <PermMedia htmlColor="tomato" className="shareIcon" />
                <span className="shareOptionText">Album</span>
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="file"
                  accept=".png,.jpeg,.png,.jpg"
                  onChange={handleClick}
                />
              </label>

              <div className="shareOption">
                <Label htmlColor="blue" className="shareIcon" />
                <span className="shareOptionText">Tag</span>
              </div>
              <div className="shareOption">
                <Room htmlColor="green" className="shareIcon" />
                <span className="shareOptionText">Location</span>
              </div>
              <div className="shareOption">
                <EmojiEmotions htmlColor="gold" className="shareIcon" />
                <span className="shareOptionText">Emoji</span>
              </div>
            </div>
            <button className="shareButton" type="submit">
              Share
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .main {
    width: 100%;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
    box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  }

  .shareWrapper {
    padding: 9px;
  }

  .shareTop {
    display: flex;
    align-items: center;
  }

  .shareProfileImg {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    object-fit: cover;
    margin-right: 10px;
  }

  .shareInput {
    border: none;
    width: 80%;
  }

  .shareInput:focus {
    outline: none;
  }

  .shareHr {
    margin: 20px;
  }

  .shareBottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .shareOptions {
    display: flex;
    margin-left: 20px;
  }

  .shareOption {
    display: flex;
    align-items: center;
    margin-right: 15px;
    cursor: pointer;
  }

  .shareIcon {
    font-style: 18px;
    margin-right: 3px;
  }

  .shareOptionText {
    font-size: 14px;
    font-weight: 500;
  }

  .shareButton {
    border: none;
    padding: 7px;
    border-radius: 5px;
    background-color: skyblue;
    font-weight: 600;
    margin-right: 20px;
    cursor: pointer;
    color: black;
  }

  .shareImgContainer {
    padding: 0 20px 10px 20px;
    position: relative;
  }

  .shareImg {
    width: 100%;
    object-fit: cover;
  }

  .shareCancleImg {
    position: absolute;
    top: 0;
    right: 20px;
    cursor: pointer;
    opacity: 0.7;
  }
`;

export default Share;
