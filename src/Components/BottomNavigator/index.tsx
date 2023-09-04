
import BottomNavigation from '@mui/material/BottomNavigation';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Home } from '@mui/icons-material';


const   BottomNavigator = ()=>{
  
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0,
    }} elevation={3}>

    <BottomNavigation
        sx={{width: 1, backgroundColor:'secondary.light' }}
        showLabels
      >
     <BottomNavigationAction
     color='white'
        component={Link}
        to="/cowList"
        label="Inicio"
        value="Inicio"
        icon={<Home sx={{color: 'white'}} />}
    />
      </BottomNavigation>
      </Paper>
  );
}

export default BottomNavigator;
