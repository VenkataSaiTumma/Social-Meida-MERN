import styled from "styled-components";
import { Navbar, Sidebar, Feed, Rightbar } from "../components/index";

const Home = () => {
  return (
    <Wrapper>
      <Navbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .homeContainer {
    display: flex;
    width: 100%;
  }
`;

export default Home;
