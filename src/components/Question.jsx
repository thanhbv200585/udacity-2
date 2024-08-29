import { connect } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { buttonClass } from "../utils/tailwind";

const Question = (props) => {
  const { name, avatar, optionOne } = props.question;
  const { id } = props;

  return (
    <div className="shadow-md">
      <p
        className={clsx(
          "border border-solid border-[--divider] rounded-tl-md rounded-tr-md p-3 bg-[--gray-40] border-t-2",
          props.isAnswered ? "border-t-blue-700" : "border-t-yellow-700"
        )}
      >
        {name}
      </p>
      <div
        className={clsx(
          "border border-solid border-[--divider] border-t-0 p-3 rounded-bl-md rounded-br-md flex",
          "flex items-stretch gap-4"
        )}
      >
        <img src={avatar} alt={`Avatar of ${name}`} className="w-32 h-32" />
        <span className="w-px bg-[--divider]"></span>
        <div className="flex-1 flex flex-col">
          <h2 className="font-semibold">Would you rather</h2>
          <div className="flex-1 flex flex-col justify-center items-center">
            <p>{optionOne.text}</p>
            <span>or...</span>
          </div>
          <Link to={`/questions/${id}`}>
            <button
              type="button"
              className={
                props.isAnswered ? buttonClass("primary") : buttonClass("warn")
              }
            >
              {props.isAnswered ? "View Details" : "Answer Poll"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];
  const { optionOne, optionTwo, timestamp } = question;
  const { name, avatarURL } = users[question.author];

  return {
    authedUser,
    question: question
      ? {
          id,
          timestamp,
          name,
          avatar: avatarURL,
          optionOne: {
            votes: optionOne.votes,
            text: optionOne.text,
          },
          optionTwo: {
            votes: optionTwo.votes,
            text: optionTwo.text,
          },
        }
      : null,
  };
};

export default connect(mapStateToProps)(Question);
