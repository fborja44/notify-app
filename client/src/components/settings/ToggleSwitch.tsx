/* Toggle Switch Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Tutorial from: https://www.youtube.com/watch?v=bztDMD4HSL0
const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }

  input:checked + .slider {
    background-color: lightblue; /* Toggled on background color */
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: #ccc;
  transition: 0.4s;

  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export interface ToggleSwitchProps {
  isToggled: boolean;
  onToggle: () => any;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isToggled, onToggle }) => {
  return (
    <Switch>
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <Slider className="slider" />
    </Switch>
  );
};

export default ToggleSwitch;