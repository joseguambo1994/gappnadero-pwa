
import BottomNavigation from '@mui/material/BottomNavigation';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { List } from '@mui/icons-material';


const   BottomNavigator = ()=>{
  
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>

    <BottomNavigation
        sx={{width: 1}}
        showLabels
      >
     <BottomNavigationAction
        component={Link}
        to="/cowList"
        label="List"
        value="List"
        icon={<List />}
    />
      </BottomNavigation>
      </Paper>
  );
}

export default BottomNavigator;
