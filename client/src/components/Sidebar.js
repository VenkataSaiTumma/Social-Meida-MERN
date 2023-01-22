import styled from "styled-components";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import FriendsList from "./List/FriendsList";
import { Users } from "../Data";

const sidebar = () => {
  return (
    <Wrapper>
      <div className="main">
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li>
            <li className="sidebarListItem">
              <Chat className="sidebarIcon" />
              <span className="sidebarListItemText">Chats</span>
            </li>
            <li className="sidebarListItem">
              <PlayCircleFilledOutlined className="sidebarIcon" />
              <span className="sidebarListItemText">Videos</span>
            </li>
            <li className="sidebarListItem">
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">Groups</span>
            </li>
            <li className="sidebarListItem">
              <Bookmark className="sidebarIcon" />
              <span className="sidebarListItemText">Bookmarks</span>
            </li>
            <li className="sidebarListItem">
              <HelpOutline className="sidebarIcon" />
              <span className="sidebarListItemText">Questions</span>
            </li>
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              <span className="sidebarListItemText">Jobs</span>
            </li>
            <li className="sidebarListItem">
              <Event className="sidebarIcon" />
              <span className="sidebarListItemText">Events</span>
            </li>
            <li className="sidebarListItem">
              <School className="sidebarIcon" />
              <span className="sidebarListItemText">Courses</span>
            </li>
          </ul>
          <button className="sidebarButton">Show More</button>
          <hr className="sidebarhr" />
          <ul className="sidebarFriendList">
            {Users.map((u) => (
              <FriendsList key={u.id} user={u} />
            ))}
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 3;
  .main {
    height: calc(100vh - 50px);
    overflow-y: scroll; //scroll bar only for sidebar component
    position: sticky;
    top: 50px;
  }

  .sidebarWrapper {
    padding: 20px;
  }

  .sidebarList {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .sidebarListItem {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .sidebarIcon {
    margin-right: 15px;
  }

  .sidebarButton {
    width: 150px;
    border: none;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
  }

  .sidebarhr {
    margin: 20px 0;
  }

  .sidebarFriendList {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;

export default sidebar;
