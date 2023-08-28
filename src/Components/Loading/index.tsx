import { Grid } from '@mui/material';
import Lottie from "lottie-react";
import loading from "./RotatingCow.json";

const Loading = () =>{
  
  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: '100vh', backgroundColor:'#C1C780'}}
  >
    <Grid item xs={3}>
    <Lottie animationData={loading} />
    </Grid>
  </Grid>
        
   
  );
}

export default Loading;
