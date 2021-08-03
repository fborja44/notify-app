/* Quicknotes Main Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";
import { nanoid } from "nanoid";

// Common imports
import { Quicknote } from "../../common/types";
import { COLOR } from "../../common/color";

// Component imports
import QNHelp from "./QNHelp";
import PageHeaderButton from "../pageheader/PageHeaderButton";
import PageHeader from "../pageheader/PageHeader";
import Section from "../Section";
import QNList from "./QNList";

// Image and icon imports
import { RiAddLine } from "react-icons/ri";
import { MdHelpOutline } from "react-icons/md";

export interface QNPageProps {
  quicknotes: Quicknote[];
  setQuicknotes: React.Dispatch<React.SetStateAction<any[]>>;
  handleUpdateQuicknote: (
    currentQuicknote: Quicknote,
    updatedQuicknote: Quicknote
  ) => void;
  handleDeleteQuicknote: (noteId: string) => void;
}

/**
 * Content for the quicknotes route.
 */
const QNPage: React.FC<QNPageProps> = ({
  quicknotes,
  setQuicknotes,
  handleUpdateQuicknote,
  handleDeleteQuicknote,
}) => {
  // Quicknotes Help Menu state
  const [showQNHelp, setShowQNHelp] = useState(false);
  const openQNHelp = () => {
    setShowQNHelp((prev) => !prev);
  };

  /**
   * Function to add new empty quicknote after add quicknote button is pressed
   */
  const handleAddQuicknote = () => {
    const newQuicknote = {
      type: "quicknote",
      id: nanoid(),
      title: "",
      color: COLOR.GREY_DARK,
      body: "",
      lastModified: Date.now(),
      favorited: false,
    };

    setQuicknotes([...quicknotes, newQuicknote]);
  };

  /**
   * State for quicknotes search text
   */
  const [QNSearchText, setQNSearchText] = useState("");

  return (
    <React.Fragment>
      <PageHeader
        title="Quicknotes"
        useSearch={true}
        setSearchText={setQNSearchText}
      >
        <PageHeaderButton title={"New Note"} onClick={handleAddQuicknote}>
          <RiAddLine />
        </PageHeaderButton>
        <PageHeaderButton title={"Help"} onClick={openQNHelp}>
          <MdHelpOutline />
        </PageHeaderButton>
      </PageHeader>
      <div className="main-content-wrapper">
        <Section name="My Quicknotes">
          <QNList
            QNSearchText={QNSearchText}
            quicknotes={quicknotes}
            handleUpdateQuicknote={handleUpdateQuicknote}
            handleDeleteQuicknote={handleDeleteQuicknote}
          />
        </Section>
        <QNHelp showQNHelp={showQNHelp} setShowQNHelp={setShowQNHelp} />
      </div>
    </React.Fragment>
  );
};

export default QNPage;