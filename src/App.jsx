import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import LoadingBar from "react-redux-loading-bar";
import NewQeustion from "./pages/NewQuestion";
import QuestionPage from "./pages/QuestionPage";
import LoginPage from "./pages/LoginPage";
import LeaderBoard from "./pages/LeaderBoard";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./components/layout/ProtectedRoutes";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  });

  return (
    <>
      <LoadingBar />
      {props.loading === true ? null : (
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/add" element={<NewQeustion />} />
            <Route path="/questions/:id" element={<QuestionPage />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}

const mapStateToProps = ({ users }) => ({
  loading: users === null,
});

export default connect(mapStateToProps)(App);
