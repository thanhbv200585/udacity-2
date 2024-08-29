import { connect } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Nav from "../Nav";
import { useEffect } from "react";

const ProtectedRoutes = (props) => {
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if (!props.auth) {
      navigate("/login?callback=" + location.pathname);
    }
  }, [props.auth, navigate, location]);

  if (!props.auth) {
    return <></>;
  }

  return (
    <div className="container">
      <Nav />
      <Outlet />
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  const auth = authedUser !== null;

  return {
    auth,
  };
};

export default connect(mapStateToProps)(ProtectedRoutes);
