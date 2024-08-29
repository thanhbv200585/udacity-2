import clsx from "clsx";
import { connect } from "react-redux";

const LeaderBoard = (props) => {
  return (
    <div className="flex flex-col gap-4 mt-6 max-w-3xl w-full mx-auto">
      {props?.users.map((user, index) => (
        <div
          className="flex items-stretch gap-4 p-4 border border-solid border-[--divider] rounded-md shadow-md relative"
          key={user.name}
        >
          <div
            className={clsx(
              "border-[#fbbd08] absolute top-0 left-0 w-12 h-12 z-10 bg-transparent",
              "after:border-solid after:border-transparent after:absolute after:top-0 after:left-0 after:w-0 after:h-0",
              "after:border-t-[3rem] after:border-r-[3rem] after:border-b-0 after:border-l-0 after:border-t-inherit"
            )}
          >
            <span className="w-1/2 h1/2 flex items-center justify-center text-white z-20 relative">{index + 1}</span>
          </div>
          <div className="min-w-24 flex items-center justify-center">
            <img
              src={user.avatarURL}
              alt={`Avatar of ${user.name}`}
              className="w-20 h-w-20"
            />
          </div>
          <span className="w-px bg-[--divider]"></span>
          <div className="flex-1 flex flex-col justify-between">
            <h2 className="font-semibold text-2xl">{user.name}</h2>
            <div className="flex items-stretch gap-4">
              <span>
                Answered questions: {Object.keys(user.answers).length}
              </span>
              <span className="w-px bg-[--divider]"></span>
              <span>Created questions: {user.questions.length}</span>
            </div>
          </div>
          <span className="w-px bg-[--divider]"></span>
          <div className="flex flex-col items-center">
            <span className="font-semibold">Score</span>
            <span className="text-4xl font-bold flex-1 flex items-center">
              {Object.keys(user.answers).length + user.questions.length}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users: Object.values(users)
    .sort(
      (a, b) =>
        Object.keys(b.answers).length +
        Object.keys(b.questions).length -
        (Object.keys(a.answers).length + Object.keys(a.questions).length)
    )
    .slice(0, 3),
});

export default connect(mapStateToProps)(LeaderBoard);
