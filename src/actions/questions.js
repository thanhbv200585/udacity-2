import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import {
  addQuestionToAuthor,
  addAnsweredQuestionToUser,
} from "../actions/users";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function answerQuestion({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  };
}

export function handleAnswerQuestion(info) {
  return (dispatch) => {
    dispatch(showLoading());
    dispatch(answerQuestion(info));
    dispatch(addAnsweredQuestionToUser(info));
    dispatch(hideLoading());

    return saveQuestionAnswer(info).catch((e) => {
      console.warn("Error in saveQuestionAnswer: ", e);
      alert("There was an error. Try again");
    });
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(optionOne, optionTwo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    }).then((question) => {
      dispatch(showLoading());
      dispatch(addQuestion(question));
      dispatch(addQuestionToAuthor(question));
      dispatch(hideLoading());
    })
    .catch((e) => {
      console.warn("Error in saveQuestion: ", e);
      alert("There was an error. Try again");
    });
  };
}
