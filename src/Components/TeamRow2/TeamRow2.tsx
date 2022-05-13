
import './TeamRow2.css';
//import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { ListItem, ListItemButton } from '@mui/material';

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
function TeamRow2({
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
    <>
    <ListItemButton>
          <ListItemText
                    primary={position}
                  />
                  <ListItemAvatar>
                    <Avatar alt="Travis Howard" src={logo} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={name}
                  />
                  <ListItemText
                    primary={points}
                  />
                  <ListItemText
                    primary={wonMatches}
                  />
                  <ListItemText
                    primary={tieMatches}
                  />
                  <ListItemText
                    primary={lostMaches}
                  />
                  <ListItemText
                    primary={differenceGoal}
                  />
                </ListItemButton>
    {/* <Divider variant="inset" component="li" /> */}


</> 
);
  
}

export default TeamRow2;
