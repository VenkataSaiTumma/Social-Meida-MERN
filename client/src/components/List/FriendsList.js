import styled from "styled-components";

const FriendsList = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Wrapper>
      <li className="sidebarFriend">
        <img className="sidebarFriendImg" src={PF + "person/2p.jpg"} alt="" />
        <span className="sidebarFriendName"> {user.username} </span>
      </li>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .sidebarFriend {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .sidebarFriendImg {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
`;

export default FriendsList;
