/* Home Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

// Common imports
import PageHeader from "../pageheader/PageHeader";
import { Quicknote, Marknote, Group } from "../../common/types";
import Section from "../Section";
import QNList from "../quicknotes/QNList";
import MNList from "../marknotes/MNList";

// Image and icon imports
import GroupList from "../groups/GroupList";
import StarIcon from "../icons/StarIcon";
import HomeIcon from "../icons/HomeIcon";

/**
 * Home content props
 */
export interface HomePageProps {
  groups: Group[];
  updateGroupsList: Function;
  quicknotes: Quicknote[];
  updateQuicknotesList: Function;
  marknotes: Marknote[];
  updateMarknotesList: Function;
  handleUpdateGroup: (groupId: string, updatedGroup: Group) => void;
  handleDeleteGroup: (groupId: string) => void;
  handleUpdateQuicknote: (noteId: string, updatedQuicknote: Quicknote) => void;
  handleDeleteQuicknote: (noteId: string) => void;
  handleUpdateMarknote: (noteId: string, updatedMarknote: Marknote) => void;
  handleDeleteMarknote: (noteId: string) => void;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Home content renderer
 */
const HomePage: React.FC<HomePageProps> = ({
  groups,
  updateGroupsList,
  quicknotes,
  updateQuicknotesList,
  marknotes,
  updateMarknotesList,
  handleUpdateGroup,
  handleDeleteGroup,
  handleUpdateQuicknote,
  handleDeleteQuicknote,
  handleUpdateMarknote,
  handleDeleteMarknote,
  setSelectedTab,
}) => {
  // Data Saved State
  const [saved, setSaved] = useState(true);

  return (
    <React.Fragment>
      <PageHeader title="Dashboard" icon={<HomeIcon />} saved={saved} />
      <div className="main-content-wrapper">
        <Section name={`Favorited Groups`} icon={<StarIcon />}>
          <GroupList
            groups={groups}
            updateGroupsList={updateGroupsList}
            favorites={true}
            handleUpdateGroup={handleUpdateGroup}
            handleDeleteGroup={handleDeleteGroup}
          />
        </Section>
        <Section name={`Favorited Quicknotes`} icon={<StarIcon />}>
          <QNList
            quicknotes={quicknotes}
            updateQuicknotesList={updateQuicknotesList}
            groups={groups}
            updateGroupsList={updateGroupsList}
            handleUpdateGroup={handleUpdateGroup}
            favorites={true}
            handleUpdateQuicknote={handleUpdateQuicknote}
            handleDeleteQuicknote={handleDeleteQuicknote}
            setSaved={setSaved}
          />
        </Section>
        <Section name={`Favorited Marknotes`} icon={<StarIcon />}>
          <MNList
            marknotes={marknotes}
            updateMarknotesList={updateMarknotesList}
            groups={groups}
            updateGroupsList={updateGroupsList}
            handleUpdateGroup={handleUpdateGroup}
            favorites={true}
            handleUpdateMarknote={handleUpdateMarknote}
            handleDeleteMarknote={handleDeleteMarknote}
            setSelectedTab={setSelectedTab}
          />
        </Section>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
