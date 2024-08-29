import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import clsx from "clsx";

const NAVS = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/add",
    label: "Add Poll",
  },
  {
    path: "/leaderboard",
    label: "Leader Board",
  },
];

const Nav = (props) => (
  <nav className="flex justify-between items-center gap-3 h-12">
    <ul className="flex gap-4">
      {NAVS.map((nav) => (
        <li key={nav.label}>
          <NavLink
            to={nav.path}
            className={({ isActive }) =>
              clsx(
                "transition-all relative",
                "after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-0.5 after:transition-all",
                "hover:text-blue-500 hover:after:bg-blue-400",
                isActive
                  ? "text-blue-500 after:bg-blue-400"
                  : "after:bg-transparent"
              )
            }
          >
            {nav.label}
          </NavLink>
        </li>
      ))}
    </ul>
    <ul className="flex items-center gap-4">
      <li>
        <Link
          onClick={(e) => props.dispatch(setAuthedUser(null))}
          className="hover:text-blue-500 hover:after:bg-blue-400"
        >
          Logout
        </Link>
      </li>
      <li className="flex items-center gap-2">
        <img
          hidden={props.name === undefined}
          alt={`avatar of ${props.name}`}
          src={props.avatarURL}
          className="w-8 h-8 rounded-full"
        />
        <span>{props.name}</span>
      </li>
    </ul>
  </nav>
);

const mapStateToProps = ({ authedUser, users }) => {
  const avatarURL = users[authedUser]?.avatarURL;
  const name = users[authedUser]?.name;

  return {
    name,
    avatarURL,
  };
};

export default connect(mapStateToProps)(Nav);
