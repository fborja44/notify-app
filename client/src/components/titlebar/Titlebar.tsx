/* Header and Titlebar Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { COLOR } from "../../common/color";

// Image and icon imports
import { BiWindow, BiWindows } from "react-icons/bi";
import { FaRegWindowMinimize } from "react-icons/fa";
import XMarkIcon from "../icons/XMarkIcon";
import GlobeIcon from "../icons/GlobeIcon";
import ProfileButton from "./ProfileButton";
import SmileIcon from "../icons/SmileIcon";

// Import electron renderer
let ipc: any;
try {
  const { ipcRenderer } = window.require("electron");
  ipc = ipcRenderer;
} catch (e) {
  // Do nothing
}

// Icon Components for Maximize/Restore button
const Restore = () => {
  return <BiWindows className="window-icon" />;
};

const Maximize = () => {
  return <BiWindow className="window-icon" />;
};

const TitlebarContainer = styled.header`
  background-color: ${(props) => props.theme.title.background};
  color: ${(props) => props.theme.title.textPrimary};
  border-bottom: 1px solid ${(props) => props.theme.title.borderColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;

  position: relative;

  height: 50px;
  z-index: 1000;
`;

const ButtonsContainer = styled.ul`
  list-style: none;
  margin: 0;
  height: 100%;
  color: ${(props) => props.theme.title.textSecondary};
  padding: 0;

  li {
    float: left;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 50px;
    height: 100%;
  }

  li:hover {
    background-color: ${(props) => props.theme.title.backgroundSecondary};
    cursor: pointer;
    // transition: background-color 0.2s ease 0s;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  padding: 0 0.75rem;
`;

const Draggable = styled.div`
  flex: 1;
  height: 100%;
  display: absolute;
  top: 0;
  left: 0;
  -webkit-app-region: drag;
`;

const Title = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  font-weight: bold;
  margin-left: 0.6rem;
  align-items: center;
  font-size: 16px;
  -webkit-app-region: drag;
  -webkit-user-select: none;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  span {
    margin-right: 1em;
    font-size: 12px;
    font-weight: 700;
  }
`;

const ProfileIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 28px;
  width: 28px;
  background: ${COLOR.blue.primary};
  border-radius: 1000em;
  margin-right: 0.75em;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Titlebar = () => {
  // State to check if window is maximized
  const [windowMaximized, setWindowMaximized] = useState(false);
  const [windowIcon, setWindowIcon] = useState(<Maximize />);
  const window_button = document.getElementById("window-button");

  // Button handlers
  const handleOnClickClose = () => {
    ipc.send("closeApp");
  };

  const handleOnClickMinimize = () => {
    ipc.send("minimizeApp");
  };

  const handleOnClickMaximizeRestore = () => {
    ipc.send("maximizeRestoreApp");
    setWindowMaximized(windowMaximized ? false : true);
  };

  // Effect hook to switch between maximize icon and restore icon
  useEffect(() => {
    setWindowIcon(windowMaximized ? <Restore /> : <Maximize />);
    if (window_button !== null)
      window_button.title = windowMaximized ? "Restore Down" : "Maximize";
  }, [windowMaximized, window_button]);

  return (
    <TitlebarContainer>
      <TitleContainer>
        <GlobeIcon
          css={css`
            width: 26px;
            height: 26px;
            color: ${COLOR.blue.primary};
          `}
        />
        <Title>NotesNexus</Title>
      </TitleContainer>
      <Draggable />
      <ProfileInfoContainer>
        <span>Username</span>
        <ProfileIcon>
          <SmileIcon />
        </ProfileIcon>
        <ProfileButton />
      </ProfileInfoContainer>
      {ipc ? (
        <ButtonsContainer>
          <li onClick={handleOnClickMinimize} title="Minimize">
            <FaRegWindowMinimize
              css={css`
                position: relative;
                bottom: 4px;
                font-size: 12px;
              `}
              id="minimize-icon"
            />
          </li>
          <li
            id="window-button"
            css={css`
              font-size: 14px;
            `}
            onClick={handleOnClickMaximizeRestore}
          >
            {windowIcon}
          </li>
          <li
            css={css`
              &:hover {
                background-color: ${COLOR.red.secondary} !important;
              }
            `}
            onClick={handleOnClickClose}
            id="close-app-button"
            title="Close"
          >
            <XMarkIcon
              css={css`
                width: 18px;
                height: 18px;
              `}
              id="power-icon"
            />
          </li>
        </ButtonsContainer>
      ) : null}
    </TitlebarContainer>
  );
};

export default Titlebar;