import NewQuestions from "../components/NewQuestions";
import AnsweredQuestions from "../components/AnsweredQuestions";
import { useState } from "react";
import clsx from "clsx";

const TABS = ["New Questions", "Answered Questions"];

const Dashboard = () => {
  const [showing, setShowing] = useState("New Questions");
  const setTab = (tab) => {
    setShowing(tab);
  };

  return (
    <div className="max-w-3xl w-full mx-auto mt-6">
      <div className="flex items-stretch overflow-hidden">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={clsx(
              "flex-1 p-4 transition-all border border-solid border-[--divider] rounded-tl-md rounded-tr-md ",
              tab === showing ? "border-b-0 bg-white" : 'bg-[--gray-40]'
            )}
            onClick={() => setTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4 border border-solid border-[--divider] border-t-0 rounded-bl-md rounded-br-md">
        {showing === "New Questions" && <NewQuestions />}
        {showing === "Answered Questions" && <AnsweredQuestions />}
      </div>
    </div>
  );
};

export default Dashboard;
