
import './TeamRow.css';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

type TeamProps = {
  position: number,
  name: string,
  logo: string,
  points: number,
  wonMatches: number,
  tieMatches: number,
  lostMaches: number,
  differenceGoal: number,
}
function TeamRow({
  position,
  name,
  logo,
  points,
  wonMatches,
  tieMatches,
  lostMaches,
  differenceGoal,
}:TeamProps) {
  return (
    <div className='rowContainer'>
    <ListItem alignItems="flex-start" className='row'>
     <ListItemText className={'column'}
        primary={position}
      />
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={logo} />
      </ListItemAvatar>
       <ListItemText className={'columnName'}
        primary={name}
      />
       <ListItemText className={'column'}
        primary={points}
      />
       <ListItemText className={'column'}
        primary={wonMatches}
      />
       <ListItemText className={'column'}
        primary={tieMatches}
      />
       <ListItemText className={'column'}
        primary={lostMaches}
      />
       <ListItemText className={'column'}
        primary={differenceGoal}
      />
    </ListItem>
    <Divider variant="inset" component="li" />
    </div>
);
  
}

export default TeamRow;
