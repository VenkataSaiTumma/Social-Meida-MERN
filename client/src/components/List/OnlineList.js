import styled from "styled-components";

const OnlineList = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Wrapper>
      <li className="Friend">
        <div className="ProfileImgMain">
          <img className="profileImg" src={PF + "person/2p.jpg"} alt="" />
          <span className="onlineTick"></span>
        </div>
        <span className="UserName">{user.username}</span>
      </li>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .Friend {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .ProfileImgMain {
    margin-right: 10px;
    position: relative;
  }

  .profileImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .onlineTick {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: limegreen;
    position: absolute;
    top: -2;
    right: 0;
    border: 2px solid white;
  }

  .UserName {
    font-weight: 500;
  }
`;

export default OnlineList;
