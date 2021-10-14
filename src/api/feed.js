import { postRequest, getRequest } from "./utils";

const BASE_URL = "feed";

export const addPost = (data) => postRequest(`${BASE_URL}/add_post`, data);

export const deletePost = (data) => postRequest(`${BASE_URL}/delete_post`, data);

export const getPosts = () => getRequest(`${BASE_URL}/view_posts`);