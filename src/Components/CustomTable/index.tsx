
// import './styles.css';
// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import { Avatar } from '@mui/material';



import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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

export default function DenseTable(

  {
    position,
    name,
    logo,
    points,
    wonMatches,
    tieMatches,
    lostMaches,
    differenceGoal,
  }:TeamProps
) {
  return (
            <TableRow
              key={name}
              style={{backgroundColor:'#e6ffe6',
            }}
            >
              <TableCell>{position}</TableCell>
              <TableCell align="right">{name}</TableCell>
              <TableCell align="right" >
                <Avatar src={logo} />
              </TableCell>
              <TableCell align="right">{points}</TableCell>
              <TableCell align="right">{wonMatches}</TableCell>
              <TableCell align="right">{tieMatches}</TableCell>
              <TableCell align="right">{lostMaches}</TableCell>
              <TableCell align="right">{differenceGoal}</TableCell>
            </TableRow>
          
  );
}

