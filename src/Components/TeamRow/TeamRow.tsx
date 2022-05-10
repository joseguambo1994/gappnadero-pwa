import './TeamRow.css';
type TeamProps = {
  position: number,
  name: string,
  logo: string,
  points: number,
  wonGames: number,
  tieGames: number,
  lostMaches: number,
  differenceGoal: number,
}
function TeamRow({
  position,
  name,
  logo,
  points,
  wonGames,
  tieGames,
  lostMaches,
  differenceGoal,
}:TeamProps) {
  return (
    <div className="container">
      <div className="column">
       <p>{position}</p>
      </div>
       <div className="columnName">
        <p className='name'>{name}</p>
      </div>
      <div className="column">
      <img src={logo} className="image" alt="logo" />
      </div>
      <div className="column">
       <p>{points}</p>
      </div>
      <div className="column">
       <p>{wonGames}</p>
      </div>
      <div className="column">
       <p>{tieGames}</p>
      </div>
      <div className="column">
       <p>{lostMaches}</p>
      </div>
      <div className="column">
       <p>{differenceGoal}</p>
      </div>
    </div>
  );
}

export default TeamRow;
