
import { BottomNavigation, BottomNavigationAction, Button } from '@mui/material';
import './NavigationBar.css';
import RestoreIcon from "@mui/icons-material/Receipt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocalShippingTwoTone";

type TeamProps = {
  navigationValue:number,
  onChange: (name:number) => void;
}
const NavigationBar = ({
  navigationValue,
  onChange,
}:TeamProps) => {

  return (
    <div>
    <Button variant="contained">Contained</Button>

    <BottomNavigation
      showLabels
      value={navigationValue}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
    >
      <BottomNavigationAction label="PositionsTable" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Calendar" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Sponsors" icon={<LocationOnIcon />} />
    </BottomNavigation>
  </div>
);
  
}

export default NavigationBar;
