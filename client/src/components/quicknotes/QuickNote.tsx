// React imports
import React, { useState, useEffect } from "react";

// Component imports
import ColorMenu from "./ColorMenu";

// Image and icon imports
import { MdDeleteForever } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";

export interface QuicknoteProps {
  id: string;
  currentNote?: any;
  title: string;
  body: string;
  lastModified: number;
  color: string;
  notes?: QuicknoteProps[];
  handleDeleteNote?: (id: string) => void;
  setQuicknotes?: React.Dispatch<React.SetStateAction<QuicknoteProps[]>>;
  handleUpdateQuicknote?: any;
}

const Quicknote = ({
  id,
  currentNote,
  title,
  body,
  lastModified,
  color,
  notes,
  handleDeleteNote,
  setQuicknotes,
  handleUpdateQuicknote,
}: QuicknoteProps) => {
  // Character limits
  const titleCharLimit = 30;
  const bodyCharLimit = 200;
  let body_limit = bodyCharLimit;

  if (body) {
    body_limit -= body.length;
  }

  /**
   * Function to handle changes in a note's field.
   * @param key The field being changed
   * @param value The new value of the field
   */
  const handleEditField = (key: string, value: string) => {
    // Check character limit
    if (
      (key === "title" && titleCharLimit - value.length >= 0) ||
      (key === "body" && bodyCharLimit - value.length >= 0)
    ) {
      handleUpdateQuicknote(currentNote, {
        ...currentNote,
        [key]: value,
        lastModified: Date.now(),
      });
    }
  };

  /**
   * Function to handle a change in the note's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: any) => {
    handleUpdateQuicknote(currentNote, {
      ...currentNote,
      color: color,
    });
  };

  // Menu state
  const [showColorMenu, setShowColorMenu] = useState(false);

  /**
   * Function to open the color menu
   */
  const openColorMenu = () => {
    setShowColorMenu((prev) => !prev); // Toggle off and on
  };

  // Label color state
  const [labelColor, setLabelColor] = useState(currentNote.color);

  let label_color = {
    backgroundColor: labelColor,
  };

  return (
    <div className="quicknote">
      <div className="quicknote-header" style={label_color}>
        <input
          className="quicknote-title"
          value={title}
          placeholder="Enter a title..."
          onChange={(event) => handleEditField("title", event.target.value)}
        />
        <button onClick={openColorMenu} className="color-menu-button">
          <IoMdMenu />
        </button>
      </div>
      <div className="quicknote-content">
        <textarea
          className="quicknote-body"
          placeholder="Write your note here..."
          value={currentNote.body}
          onChange={(event) => handleEditField("body", event.target.value)}
        />
        <div className="quicknote-footer">
          <small>
            {new Date(lastModified).toLocaleDateString()} Limit: {body_limit}
          </small>
          <button
            title="Delete Note"
            className="delete-quicknote-button"
            onClick={handleDeleteNote ? () => handleDeleteNote(id) : undefined}
          >
            <MdDeleteForever className="delete-icon" size="1.2em" />
          </button>
        </div>
      </div>
      <ColorMenu
        showColorMenu={showColorMenu}
        setShowColorMenu={setShowColorMenu}
        setLabelColor={setLabelColor}
        handleEditColor={handleEditColor}
      />
    </div>
  );
};

export default Quicknote;
