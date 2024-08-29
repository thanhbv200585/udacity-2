// _DATA.test.js

import { _saveQuestion } from "./_DATA";

describe("_saveQuestion", () => {
  it("should save the question correctly when all required fields are provided", async () => {
    const question = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "authorId",
    };

    const result = await _saveQuestion(question);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("timestamp");
    expect(result.optionOne.text).toBe(question.optionOneText);
    expect(result.optionTwo.text).toBe(question.optionTwoText);
    expect(result.author).toBe(question.author);
  });

  it("should throw an error if required fields are missing", async () => {
    const question = {
      optionOneText: "Option One",
      author: "authorId",
    };

    await expect(_saveQuestion(question)).rejects.toThrow(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});
