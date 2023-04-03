/* Notes Explorer Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

import { useHistory } from "react-router-dom";

// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { handleCreateMarknote } from "../../utils/marknotes";
import { handleCreateGroup } from "../../utils/groups";

// Common imports
import { Group, Marknote } from "../../common/types";

// Component imports
import NotesExplorerFilter from "./NotesExplorerFilter";
import NotesExplorerButton from "./NotesExplorerButton";
import NotesExplorerGroup from "./NotesExplorerGroup";
import NotesExplorerMarknote from "./NotesExplorerMarknote";

// Image and icon imports
import FolderPlusIcon from "../icons/FolderPlusIcon";
import PlusIcon from "../icons/PlusIcon";
import EllipsisVerticalIcon from "../icons/EllipsisVerticalIcon";

const NotesExplorerContainer = styled.section`
  background: ${(props) => props.theme.sidebar.background};
  border-right: 1px solid ${(props) => props.theme.sidebar.borderColor};
  height: calc(100vh - 75px);
  width: 235px;
  min-width: 230px;
  color: ${(props) => props.theme.sidebar.textPrimary};
  font-size: 13px;
`;

const NotesExplorerHeader = styled.div`
  display: flex;
  flex-direction: row;
  height: 35px;
  border-bottom: 1px solid ${(props) => props.theme.sidebar.borderColor};
  width: 100%;
  padding: 0.75em 0.5em;
  justify-content: space-between;
`;

const NotesExplorerTitle = styled.span`
  text-transform: uppercase;
  font-size: 12px;
  justify-self: center;
  align-self: center;
  margin-left: 0.5em;
`;

const NotesExplorerButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;

const NotesExplorerContent = styled.div`
  height: calc(100vh - 145px);
  overflow-y: scroll;
`;

const NotesList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NotesExplorerContentText = styled.div`
  width: 60%;
  font-size: 12px;
  margin: 0 auto;
  text-align: center;
`;

interface NotesExplorerProps {
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const NotesExplorer = ({ setSelectedTab }: NotesExplorerProps) => {
  // Dispatch
  const dispatch = useDispatch();

  // History
  const history = useHistory();

  // Groups State
  const groupsState: Group[] = useSelector((state: any) => state.groupsState);

  // Marknotes State
  const marknotesState: Marknote[] = useSelector(
    (state: any) => state.marknotesState
  );

  // Explorer filter State
  const [explorerFilter, setExplorerFilter] = useState("");

  // Sort marknotes by last modified date
  let notes = marknotesState.sort(
    (a: Marknote, b: Marknote) => b.lastModified - a.lastModified
  );

  // Filter notes by filter text if given
  if (explorerFilter) {
    notes = notes.filter(
      (note: Marknote) =>
        note.title.toLowerCase().includes(explorerFilter.toLowerCase()) ||
        note.body.toLowerCase().includes(explorerFilter.toLowerCase())
    );
  }

  const notesList = (
    <NotesList>
      {notes.map(
        (marknote) =>
          (explorerFilter || marknote.groups.length === 0) && (
            <NotesExplorerMarknote
              marknote={marknote}
              setSelectedTab={setSelectedTab}
              level={1}
            />
          )
      )}
    </NotesList>
  );

  const groupsList = (
    <NotesList>
      {groupsState.map((group) => (
        <NotesExplorerGroup
          group={group}
          marknotes={marknotesState}
          setSelectedTab={setSelectedTab}
          explorerFilter={explorerFilter}
        />
      ))}
    </NotesList>
  );

  const searchEmpty = (
    <NotesExplorerContentText>
      <p>{`No marknotes found for the term "${explorerFilter}".`}</p>
    </NotesExplorerContentText>
  );

  const notesEmpty = (
    <NotesExplorerContentText>
      <p>No marknotes found.</p>
    </NotesExplorerContentText>
  );

  return (
    <NotesExplorerContainer>
      <NotesExplorerHeader>
        <NotesExplorerTitle>Marknotes Explorer</NotesExplorerTitle>
        <NotesExplorerButton title={"Explorer Options"} onClick={() => {}}>
          <EllipsisVerticalIcon />
        </NotesExplorerButton>
      </NotesExplorerHeader>
      <NotesExplorerHeader>
        <NotesExplorerFilter handleFilterNote={setExplorerFilter} />
        <NotesExplorerButtons>
          <NotesExplorerButton
            title={"New Group"}
            onClick={() => handleCreateGroup(dispatch)}
          >
            <FolderPlusIcon />
          </NotesExplorerButton>
          <NotesExplorerButton
            title={"New Marknote"}
            onClick={() => handleCreateMarknote(dispatch, history)}
          >
            <PlusIcon />
          </NotesExplorerButton>
        </NotesExplorerButtons>
      </NotesExplorerHeader>
      <NotesExplorerContent className="hide-scroll">
        {!explorerFilter && groupsList}
        {notes.length !== 0
          ? notesList
          : explorerFilter
          ? searchEmpty
          : notesEmpty}
      </NotesExplorerContent>
    </NotesExplorerContainer>
  );
};

export default NotesExplorer;
