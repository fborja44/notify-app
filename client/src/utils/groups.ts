import axios from "axios";
import { Dispatch, AnyAction } from "redux";
import { COLOR } from "../common/color";
import { Group } from "../common/types";
import {
  createGroup,
  deleteGroup,
  setGroups,
  updateGroup,
} from "../redux/actions";

const BASE_ADDR = "http://localhost:3001";

/**
 * Fetches groups from the database.
 */
const fetchGroups = async (dispatch: Dispatch<AnyAction>) => {
  const { data: savedGroups } = await axios({
    baseURL: BASE_ADDR,
    url: "/groups",
    method: "GET",
  });
  // Check if notes were received
  if (savedGroups) {
    dispatch(setGroups(savedGroups));
  }
};

/**
 * Creates a new empty group.
 */
const handleCreateGroup = async (dispatch: Dispatch<AnyAction>) => {
  try {
    const { data: newGroup } = await axios({
      baseURL: BASE_ADDR,
      url: "/groups",
      method: "POST",
      data: {
        title: "",
        color: COLOR.dark_grey.id,
      },
    });
    dispatch(createGroup(newGroup));
  } catch (e) {
    console.log(e);
  }
};

/**
 * Updates a group.
 * @param updatedGroup The data to update the group with
 */
const handleUpdateGroup = async (
  dispatch: Dispatch<AnyAction>,
  updatedGroup: Group
) => {
  try {
    await axios({
      baseURL: BASE_ADDR,
      url: `/groups/${updatedGroup._id}`,
      method: "PATCH",
      data: updatedGroup,
    });
    dispatch(updateGroup(updatedGroup));
  } catch (e) {
    console.log(e);
  }
};

/**
 * Deletes a group.
 * @param groupId The id of the group to be deleted
 */
const handleDeleteGroup = async (
  dispatch: Dispatch<AnyAction>,
  groupId: string
) => {
  try {
    await axios({
      baseURL: BASE_ADDR,
      url: `/groups/${groupId}`,
      method: "DELETE",
    });
    dispatch(deleteGroup(groupId));
  } catch (e) {
    console.log(e);
  }
};

export { fetchGroups, handleCreateGroup, handleUpdateGroup, handleDeleteGroup };
