import { connect } from "react-redux";
import Question from "./Question";
import { Link } from "react-router-dom";

const NewQuestions = (props) => {
  return (
    <div>
      {props.questionIds.length === 0 && (
        <Link to={"/add"}>
          <span>
            All polls have been voted! Click here to ask a new question.
          </span>
        </Link>
      )}
      <ul className="flex flex-col gap-4">
        {props.questionIds.map((id) => (
          <li key={id}>
            <Question isAnswered={false} id={id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }) => ({
  questionIds: Object.keys(questions)
    .filter(
      (q) =>
        !questions[q].optionOne.votes.includes(authedUser) &&
        !questions[q].optionTwo.votes.includes(authedUser)
    )
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
});

export default connect(mapStateToProps)(NewQuestions);
