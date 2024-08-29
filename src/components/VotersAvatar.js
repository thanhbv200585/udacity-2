import { connect } from "react-redux";

const VotersAvatar = (props) => {
  return (
    <div>
      {props.voters?.map((v) => (
        <img
          key={v}
          alt={`avatar of ${props.users[v].name}`}
          src={props.users[v].avatarURL}
          className="small-avatar"
        />
      ))}
    </div>
  );
};

const mapStateToProps = ({ users }, { voters}) => {
  return {
    users,
    voters,
  };
};

export default connect(mapStateToProps)(VotersAvatar);
