import { animated, useSpring } from '@react-spring/web'
import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import './styles.css';


interface Props {
  width: number,
  collectionDate: string,
}
const Bottle = ({ width, collectionDate }: Props) => {
  const [open, setOpen] = useState(false)
  const widthFactor = width * 100 / 35
  const animationStyle = useSpring({
    width: open ? `${widthFactor}%` : '0%',

  })

  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <Box sx={{
      display: 'flex',
      width: 1,
      flexDirection: 'row',
      pb: 0.5
    }}>
      <Box
      sx={{
      display: 'flex',
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      p:1,
    }}
      > 
        <Typography variant="body1" color={'white'}
        >
        {collectionDate}
      </Typography>
      </Box>
      <Box sx={{
        flex: 1, p: 0, backgroundColor: 'grey', borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
      }}>
        <animated.div className='fill' style={animationStyle}>
        <Typography variant="body1"
        >
        {width}
      </Typography>
        </animated.div>
      </Box>
    </Box>
  );
}

export default Bottle;
