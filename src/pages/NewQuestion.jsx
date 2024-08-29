import { useState } from "react";
import { handleAddQuestion } from "../actions/questions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { buttonClass } from "../utils/tailwind";

const NewQeustion = ({ dispatch }) => {
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleAddQuestion(optionOne, optionTwo));

    setOptionOne("");
    setOptionTwo("");
    navigate("/");
  };

  return (
    <div className="border border-solid border-[--divider] max-w-3xl w-full mx-auto rounded-md shadow-md mt-6">
      <h1 className="p-4 border-b border-solid border-[--divider] bg-[--gray-40] rounded-tl-md rounded-tr-md font-semibold">
        Create a New Poll
      </h1>
      <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
        <h2 className="font-semibold">Would you rather</h2>
        <input
          type="text"
          value={optionOne}
          onChange={(e) => setOptionOne(e.target.value)}
          name="optionOne"
          placeholder="Enter option one ..."
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-within:outline-none"
        />
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-full my-1 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
            OR
          </span>
        </div>
        <input
          type="text"
          value={optionTwo}
          onChange={(e) => setOptionTwo(e.target.value)}
          name="optionTwo"
          placeholder="Enter option two ..."
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-within:outline-none"
        />

        <button
          type="submit"
          className={buttonClass("primary")}
          disabled={!optionOne || !optionTwo || optionOne === optionTwo}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect()(NewQeustion);
