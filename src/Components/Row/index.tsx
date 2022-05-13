
import './styles.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Avatar } from '@mui/material';



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
function Row({
  position,
  name,
  logo,
  points,
  wonMatches,
  tieMatches,
  lostMaches,
  differenceGoal,
}:TeamProps) {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container 
     sx={{ bgcolor:'greenyellow' }}
    spacing={1}>
      <Grid item xs={1}>
        <Item>{position}</Item>
      </Grid>
      <Grid item xs={1}>
      
      <Item>
      <Avatar
  alt="Remy Sharp"
  src={logo}
  sx={{ height: '14px', width: '14px' }}
>
  B
</Avatar>
      </Item>
      
      </Grid>
      <Grid item xs={3}>
        <Item>{name}</Item>
      </Grid>
      <Grid item xs={1}>
        <Item>{points}</Item>
      </Grid>

      <Grid item xs={1}>
        <Item>{wonMatches}</Item>
      </Grid>
      <Grid item xs={1}>
        <Item>{tieMatches}</Item>
      </Grid>
      <Grid item xs={1}>
        <Item>{lostMaches}</Item>
      </Grid>
      <Grid item xs={1}>
        <Item>{differenceGoal}</Item>
      </Grid>
    </Grid>
  </Box>
);
  
}

export default Row;
