import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Share, Post } from "./index";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
// import { Posts } from "../Data";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);

  const { user } = React.useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/post/profile/" + username)
        : await axios.get("/post/timeline/" + user._id);
      setPosts(res.data);
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <Wrapper>
      <div className="main">
        <div className="feedWrapper">
          <Share />

          {Object.values(posts).map((value, index) => {
            return (
              <div key={index}>
                <Post post={posts} />
              </div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 5;

  .feedWrapper {
    padding: 55px 10px;
  }
`;

export default Feed;
