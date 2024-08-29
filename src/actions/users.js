export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_ANSWERED_QUESTION = "ADD_ANSWERED_QUESTION";
export const ADD_QUESTION_TO_AUTHOR = "ADD_QUESTION_TO_AUTHOR";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addAnsweredQuestionToUser({ qid, authedUser, answer }) {
  return {
    type: ADD_ANSWERED_QUESTION,
    qid,
    authedUser,
    answer,
  };
}

export function addQuestionToAuthor(question) {
  return {
    type: ADD_QUESTION_TO_AUTHOR,
    question,
  };
}
