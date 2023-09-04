import { animated, useSpring } from '@react-spring/web'
import styles from './styles.module.css'
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';




interface Props {
  width: number,
  collectionDate: string,
}
const Bottle = ({width, collectionDate}: Props)=>{
  const [open, setOpen] = useState(false)
  const widthFactor = width*100/35
  const animationStyle = useSpring({ width: open ? `${widthFactor}%` : '0%' })

  useEffect(()=>{
    setOpen(true)
  }, [])

  return (

    <Box sx={{ width: 1, borderRadius:4, pb:2,  }}>
          <Typography variant="h6">
            {'Fecha: '+ collectionDate}
          </Typography>
       <div className={styles.bottle}>
        
          <animated.div className={styles.fill} style={animationStyle}>
          <Typography variant="h5">
            {'Litros: '+ width}
          </Typography>
          </animated.div>
          </div>
          </Box>
  
  );
}

export default Bottle;
