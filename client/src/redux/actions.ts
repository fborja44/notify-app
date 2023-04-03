import { Quicknote, Marknote, Group } from "../common/types";

const updateSearch = (updatedSearch: string) => ({
  type: "UPDATE_SEARCH",
  payload: updatedSearch,
});

const setQuicknotes = (quicknotes: Quicknote[]) => ({
  type: "SET_QUICKNOTES",
  payload: quicknotes,
});

const createQuicknote = (newQuicknote: Quicknote) => ({
  type: "CREATE_QUICKNOTE",
  payload: newQuicknote,
});

const updateQuicknotes = (updatedQuicknotes: Quicknote[]) => ({
  type: "UPDATE_QUICKNOTES",
  payload: updatedQuicknotes,
});

const deleteQuicknote = (quicknoteId: string) => ({
  type: "DELETE_QUICKNOTE",
  payload: quicknoteId,
});

const setMarknotes = (marknotes: Marknote[]) => ({
  type: "SET_MARKNOTES",
  payload: marknotes,
});

const createMarknote = (newMarknote: Marknote) => ({
  type: "CREATE_MARKNOTE",
  payload: newMarknote,
});

const updateMarknote = (updatedMarknote: Marknote) => ({
  type: "UPDATE_MARKNOTE",
  payload: updatedMarknote,
});

const deleteMarknote = (marknoteId: string) => ({
  type: "DELETE_MARKNOTE",
  payload: marknoteId,
});

const updateGroup = (updatedGroups: Group[]) => ({
  type: "UPDATE_GROUPS",
  payload: updatedGroups,
});

const deleteGroup = (groupId: string) => ({
  type: "DELETE_GROUP",
  payload: groupId,
});

export {
  updateSearch,
  setQuicknotes,
  createQuicknote,
  deleteQuicknote,
  updateQuicknotes,
  setMarknotes,
  updateMarknote,
  createMarknote,
  deleteMarknote,
  updateGroup,
  deleteGroup,
};
