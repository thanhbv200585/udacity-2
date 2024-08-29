import { connect } from "react-redux";
import { handleAnswerQuestion } from "../actions/questions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { buttonClass } from "../utils/tailwind";
import clsx from "clsx";
import { Rate } from "../components/rate";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionDetails = (props) => {
  const {
    dispatch,
    optionOnePercentage,
    optionTwoPercentage,
    isTwoVoted,
    isOneVoted,
  } = props;
  const navigate = useNavigate();
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (props.question === undefined) {
      navigate("/404");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      handleAnswerQuestion({
        authedUser: props.authedUser,
        qid: props.id,
        answer: selected,
      })
    );
  };

  const { progressColorOne, progressColorTwo, borderColorOne, borderColorTwo } = useMemo(() => {
    if (optionOnePercentage > optionTwoPercentage) {
      return {
        progressColorOne: "bg-[#22c55e]",
        progressColorTwo: "bg-[#767676]",
        borderColorOne: "border-t-[#22c55e]",
        borderColorTwo: "border-t-[#767676]",
      };
    }

    if (optionOnePercentage < optionTwoPercentage) {
      return {
        progressColorOne: "bg-[#767676]",
        progressColorTwo: "bg-[#22c55e]",
        borderColorOne: "border-t-[#767676]",
        borderColorTwo: "border-t-[#22c55e]",
      };
    }

    return {
      progressColorOne: "bg-[#a16207]",
      progressColorTwo: "bg-[#a16207]",
      borderColorOne: "border-t-[#a16207]",
      borderColorTwo: "border-t-[#a16207]",
    };
  }, [optionTwoPercentage, optionOnePercentage]);

  if (props.loading === true) {
    return <></>;
  }

  return (
    <div className="max-w-3xl w-full mx-auto mt-6 border border-solid border-[--divider] rounded-md">
      <h1 className="p-4 bg-[--gray-40] border-b border-solid border-[--divider] rounded-tl-md rounded-tr-md font-semibold">
        Poll by {props.author}
      </h1>
      <div className="flex items-stretch gap-4 p-4">
        <img
          src={props.authorAvatarUrl}
          alt={`Avatar of ${props.author}`}
          className="w-32 h-32"
        />

        <span className="w-px bg-[--divider]"></span>

        <div className="flex-1 flex flex-col gap-4">
          <h2 className="font-semibold">Would you rather</h2>

          {!props.isAnswered ? (
            <form onSubmit={handleSubmit}>
              <div className="flex items-center mb-2">
                <input
                  id="option-one"
                  type="radio"
                  value="optionOne"
                  name="vote"
                  selected={selected === "optionOne"}
                  onChange={(e) => setSelected(e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="option-one"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {props?.question?.optionOne.text}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="option-two"
                  type="radio"
                  value="optionTwo"
                  name="vote"
                  selected={selected === "optionTwo"}
                  onChange={(e) => setSelected(e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="option-two"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {props?.question?.optionTwo.text}
                </label>
              </div>

              <button
                type="submit"
                className={clsx(buttonClass("primary"), "mt-4")}
                disabled={!selected}
              >
                Submit
              </button>
            </form>
          ) : (
            <>
              <div
                className={clsx(
                  "border border-solid border-[--divider] shadow-md rounded-md",
                  `border-t-2 ${borderColorOne}`
                )}
              >
                <div className="rounded-md overflow-hidden relative p-4">
                  {isOneVoted && (
                    <div className="absolute right-0 top-0 p-1 bg-blue-500 text-xs text-white">
                      Your Vote
                    </div>
                  )}
                  <p className="font-semibold mb-4">
                    {props?.question?.optionOne.text}
                  </p>
                  <Rate
                    percentage={optionOnePercentage}
                    className={`${progressColorOne}`}
                  />
                  <span className="block text-center">
                    {props?.question?.optionOne.votes.length} out of{" "}
                    {props.totalVotes} votes
                  </span>
                </div>
              </div>
              <div
                className={clsx(
                  "border border-solid border-[--divider] shadow-md rounded-md relative",
                  `border-t-2 ${borderColorTwo}`
                )}
              >
                <div className="rounded-md overflow-hidden relative p-4">
                  {isTwoVoted && (
                    <div className="absolute right-0 top-0 p-1 bg-blue-500 text-xs text-white">
                      Your Vote
                    </div>
                  )}
                  <p className="font-semibold mb-4">
                    {props?.question?.optionTwo.text}
                  </p>
                  <Rate
                    percentage={optionTwoPercentage}
                    className={`${progressColorTwo}`}
                  />

                  <span className="block text-center">
                    {props?.question?.optionTwo.votes.length} out of{" "}
                    {props.totalVotes} votes
                  </span>
                </div>
              </div>
            </>
          )}
          <div className="flex justify-end">
            <Link to="/">
              <button type="button" className={buttonClass("outline")}>
                Back
              </button>
            </Link>
          </div>
        </div>\
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, props) => {
  const { id } = props.router.params;
  const question = questions[id];
  const authorAvatarUrl = users[question?.author]?.avatarURL;
  const author = users[question?.author]?.name;
  const totalVotes = question
    ? question.optionOne.votes.length + question.optionTwo.votes.length
    : 0;
  const optionOnePercentage = (
    (question?.optionOne.votes.length * 100) /
    totalVotes
  ).toFixed(0);
  const optionTwoPercentage = (
    (question?.optionTwo.votes.length * 100) /
    totalVotes
  ).toFixed(0);

  const isOneVoted = question?.optionOne.votes.includes(authedUser);
  const isTwoVoted = question?.optionTwo.votes.includes(authedUser);
  const isAnswered =
    question?.optionOne.votes.includes(authedUser) ||
    question?.optionTwo.votes.includes(authedUser);

  const chosenOption = !isAnswered
    ? null
    : question?.optionOne.votes.includes(authedUser)
    ? "optionOne"
    : "optionTwo";

  return {
    id,
    users,
    authorAvatarUrl,
    author,
    authedUser,
    question,
    isAnswered: isOneVoted || isTwoVoted,
    chosenOption,
    isOneVoted,
    isTwoVoted,
    totalVotes,
    optionOnePercentage,
    optionTwoPercentage,
    loading: authedUser === null,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionDetails));
