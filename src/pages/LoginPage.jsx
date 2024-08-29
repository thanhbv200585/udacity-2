import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate, useSearchParams } from "react-router-dom";
import { buttonClass } from "../utils/tailwind";

const LoginPage = (props) => {
  const [username, setUsername] = useState("sarahedo");
  const [password, setPassword] = useState("password123");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!props.users[username]) {
      setMessage("Username or Password incorrect!");
      return;
    }

    const match = props.users[username].password === password;

    if (match) {
      props.dispatch(setAuthedUser(username));
      if (searchParams.get("callback")) {
        navigate(searchParams.get("callback"));
      } else {
        navigate("/");
      }
    } else {
      setMessage("Username or Password incorrect!");
    }
  };

  useEffect(() => {
    if (!!props.authedUser) {
      navigate("/");
    }
  }, [props.authedUser, navigate]);

  return (
    <div className="flex items-center justify-center p-3 h-[100vh] bg-slate-600">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full p-4 bg-white rounded-lg flex flex-col gap-4"
      >
        <h1 className="text-center uppercase text-2xl font-bold">Login</h1>
        {message && (
          <p className="p-3 text-red-500 bg-red-300 rounded">{message}</p>
        )}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          id="username"
          placeholder="Enter username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-within:outline-none"
        />
        <input
          type="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          id="password"
          placeholder="Enter password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-within:outline-none"
        />

        <button
          type="submit"
          className={buttonClass("primary")}
          disabled={!username || !password}
        >
          Login
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  return {
    users,
    authedUser,
  };
};
export default connect(mapStateToProps)(LoginPage);
