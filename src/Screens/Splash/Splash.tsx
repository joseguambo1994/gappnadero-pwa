import { Box, Modal, Typography } from "@mui/material";
import { fontSize } from "@mui/system";
import * as React from "react";
import Lottie from "react-lottie";
import LottieAnimation from "../../Components/Lottie";

import animationData from '../../lotties/ball.json';

import "./Splash.css";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default function Splash() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      style={{ backgroundColor: "#e6ccff",
      padding:40,
    
    
    }}
    >
      
      <div
      style={{
        backgroundColor:'white',
        borderRadius:40,
        border:0,
        borderColor:'white',
        alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
      }}
      >
      <div>
        <Typography style={
          {
            fontSize:40,
            textAlign:'center'
          }
        
        }>{'Campeonato de Ex-Alumnos'}</Typography>
      <Lottie
	    options={defaultOptions}
        height={'40%'}
        width={'40%'}
      />
      <Typography style={
          {
            fontSize:40,
            textAlign:'center'
          }
        
        }>{'Copa Dr. Andrés González'}</Typography>
      </div>
      </div>
    </Modal>
  );
}
