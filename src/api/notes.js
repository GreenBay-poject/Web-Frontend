import { postRequest, getRequest } from "./utils";

const BASE_URL = "note";

export const addNote = (data) => postRequest(`${BASE_URL}/add_note`, data);

export const deleteNote = (data) => postRequest(`${BASE_URL}/delete_note`, data);

export const getPublicNotes = (data) => getRequest(`${BASE_URL}/get_public_note`,data);

export const getPrivateNotes = (data) =>  postRequest(`${BASE_URL}/view_my_notes`,data);