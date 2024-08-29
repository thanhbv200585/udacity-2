import Question from "./Question";
import { connect } from "react-redux";

const AnsweredQuestions = (props) => {
  return (
    <div>
      <ul className="flex flex-col gap-4">
        {props.questionIds.map((id) => (
          <li key={id}>
            <Question isAnswered={true} id={id} />
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
        questions[q].optionOne.votes.includes(authedUser) ||
        questions[q].optionTwo.votes.includes(authedUser)
    )
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
});
export default connect(mapStateToProps)(AnsweredQuestions);
