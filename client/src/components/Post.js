import styled from "styled-components";
import { MoreVert } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  // console.log(post);

  // For Like and Heart symbol
  const [like, setLike] = useState(post.likes);

  const [isLiked, setIsLiked] = useState(false);

  const [user, setUser] = useState({});
  // console.log(user);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const likeHandle = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user?userId=${post[0].userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post[0].userId]);

  return (
    <Wrapper>
      <div className="main">
        <div className="postWrapper"></div>
        <div className="postTop">
          <div className="postTopLeft">
            {/* After Getting data from Feed component linking to Profile Component with username */}
            <Link to={`/profile/${user.username}`}>
              <img
                className="profileImg"
                src={PF + user.profilePicture || PF + "person/noProfile.png"}
                alt=""
              />
            </Link>

            <span className="userName">
              {user.username}
              {/* {Users.filter((u) => u.id === post?.userId)[0].username} */}
            </span>
            <span className="Date">{format(post[0].createdAt)}</span>
          </div>
          <div className="postToRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post[0].desc}</span>
          <img className="allPosts" src={PF + post[0].img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={PF + "like.png"}
              onClick={likeHandle}
              alt=""
            />
            <img
              className="likeIcon"
              src={PF + "heart.png"}
              onClick={likeHandle}
              alt=""
            />
            <span className="TotalLikes"> {like} people's Liked</span>
          </div>
          <div className="postBottomRight">
            <span className="comments"> {post[0].comment} comments</span>
          </div>
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
    margin: 30px 0;
  }

  .postWrapper {
    padding: 10px;
  }

  .postTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .postTopLeft {
    display: flex;
    align-items: center;
    padding-left: 10px;
  }

  .profileImg {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .userName {
    font-size: 15px;
    font-weight: 500;
    margin: 0 10px;
  }

  .Date {
    font-size: 12px;
  }

  .postCenter {
    margin: 15px 0;
    padding-left: 10px;
  }

  .allPosts {
    margin-top: 20px;
    width: 95%;
    max-height: 500px;
    object-fit: contain;
  }

  .postBottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
  }

  .postBottomLeft {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .likeIcon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    cursor: pointer;
  }

  .TotalLikes {
    font-size: 15px;
  }

  .comments {
    cursor: pointer;
    border-radius: 1px;
    font-size: 13px;
    padding-right: 25px;
  }
`;

export default Post;
