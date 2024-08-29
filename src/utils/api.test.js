import { saveQuestionAnswer } from "./api";

describe("saveQuestionAnswer", () => {
  it("Is expected to return true if correct parameters are passed.", async () => {
    // authedUser, qid, answer
    const info = {
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    };
    const response = await saveQuestionAnswer(info);
    expect(response).toBeTruthy();
  });

  it("Is expected to return false if incorrect parameters are passed.", async () => {
    const info = {
        authedUser: "sarahedo",
        qid: null,
      };
      const response = await saveQuestionAnswer(info).catch((e) => e);

    expect(response).toBe("Please provide authedUser, qid, and answer");
  });
});
