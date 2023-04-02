/* Home Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

// Common imports
import PageHeader from "../pageheader/PageHeader";
import { Marknote, Group } from "../../common/types";
import Section from "../Section";
import QNList from "../quicknotes/QNList";
import MNList from "../marknotes/MNList";

// Image and icon imports
import GroupList from "../groups/GroupList";
import MagnifyingGlassIcon from "../icons/MagnifyingGlassIcon";

/**
 * Search content props
 */
export interface SearchPageProps {
  searchTerm: string;
  groups: Group[];
  updateGroupsList: Function;
  marknotes: Marknote[];
  updateMarknotesList: Function;
  handleUpdateGroup: (groupId: string, updatedGroup: Group) => void;
  handleDeleteGroup: (groupId: string) => void;
  handleUpdateMarknote: (noteId: string, updatedMarknote: Marknote) => void;
  handleDeleteMarknote: (noteId: string) => void;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Search content renderer
 */
const SearchPage: React.FC<SearchPageProps> = ({
  searchTerm,
  groups,
  updateGroupsList,
  marknotes,
  updateMarknotesList,
  handleUpdateGroup,
  handleDeleteGroup,
  handleUpdateMarknote,
  handleDeleteMarknote,
  setSelectedTab,
}) => {
  // Data Saved State
  const [saved, setSaved] = useState(true);

  return (
    <React.Fragment>
      <PageHeader
        title={`Search Results for "${searchTerm}"`}
        icon={<MagnifyingGlassIcon />}
        saved={saved}
      />
      <div className="main-content-wrapper">
        <Section name={`Groups`}>
          <GroupList
            GroupsFilterText={searchTerm}
            groups={groups}
            updateGroupsList={updateGroupsList}
            handleUpdateGroup={handleUpdateGroup}
            handleDeleteGroup={handleDeleteGroup}
          />
        </Section>
        <Section name={`Quicknotes`}>
          <QNList
            QNFilterText={searchTerm}
            groups={groups}
            updateGroupsList={updateGroupsList}
            handleUpdateGroup={handleUpdateGroup}
            setSaved={setSaved}
          />
        </Section>
        <Section name={`Marknotes`}>
          <MNList
            MNFilterText={searchTerm}
            marknotes={marknotes}
            updateMarknotesList={updateMarknotesList}
            groups={groups}
            updateGroupsList={updateGroupsList}
            handleUpdateGroup={handleUpdateGroup}
            handleUpdateMarknote={handleUpdateMarknote}
            handleDeleteMarknote={handleDeleteMarknote}
            setSelectedTab={setSelectedTab}
          />
        </Section>
      </div>
    </React.Fragment>
  );
};

export default SearchPage;
