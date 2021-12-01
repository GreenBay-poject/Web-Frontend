import { postRequest } from "./utils";

const BASE_URL = "questions";

export const viewQuestions = (data) => postRequest(`${BASE_URL}/view_questions`,data);

export const addQuestion = (data) => postRequest(`${BASE_URL}/add_question`, data);

export const answerQuestion = (data) => postRequest(`${BASE_URL}/answer_questions`, data);

export const deleteQuestion = (data) => postRequest(`${BASE_URL}/delete_questions`, data);
// export const resetPassword = (data) =>
// 	postRequest(`${BASE_URL}/reset-password`, data);