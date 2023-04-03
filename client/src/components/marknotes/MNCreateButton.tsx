// React imports
import React from "react";

import styled from "@emotion/styled";

import { useHistory } from "react-router-dom";

// Redux imports
import { useDispatch } from "react-redux";
import { handleCreateMarknote } from "../../utils/marknotes";

// Common imports
import { COLOR } from "../../common/color";
import PlusIcon from "../icons/PlusIcon";

const CreateButtonContainer = styled.button`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.main.backgroundSecondary};
  color: ${(props) => props.theme.title.textSecondary};
  border: 1px solid ${(props) => props.theme.note.borderColor};
  border-radius: 5px;
  font-size: 15px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    border-color: ${COLOR.blue.primary};
    background-color: ${(props) => props.theme.main.borderColor};
  }
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 70px;

  svg {
    width: 35px;
    height: 35px;
  }
`;

const MNCreateButton = () => {
  // Dispatch hook
  const dispatch = useDispatch();

  // History hook
  const history = useHistory();

  return (
    <CreateButtonContainer
      onClick={() => handleCreateMarknote(dispatch, history)}
    >
      <ButtonContent>
        <PlusIcon />
        <span>Add New Note</span>
      </ButtonContent>
    </CreateButtonContainer>
  );
};

export default MNCreateButton;
