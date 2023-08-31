import { Avatar} from '@mui/material';
import { useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web'
import './styles.css';
import { format } from 'date-fns';

const CowListItem = ({
    id = '',
    image = '',
    name = '',
    color = '',
    percentage = '',
    date = '',
    number = '',
    weight = 0,
    lastHeatDate = new Date(),
    openItem = false,
}) => {

    const [started, setStarted] = useState(false);
    const [open, setOpen] = useState(false);
    const tempPercentage = Number(percentage) > 99 ? 100 : percentage;
    console.log({date}, {number}, {weight}, {lastHeatDate}, {openItem})
    const animationStyle = useSpring({
        width: started ? `${tempPercentage}%` : '0%',
        backgroundColor: color,

    })

    const detailsAnimationStyle = useSpring({
        backgroundColor: open ? '#dfbf9f' : 'transparent',
        opacity: open ? 1: 0
    })
    

    const handleOpen = ()=> {
        setOpen(prev => !prev)
    }

    useEffect(() => {
        setStarted(true)
    }, [])

    return (
        <div className="wrapper">
      
        <div onClick={handleOpen} className="elementsContainer"
        style={{backgroundColor: open ? '#c68c53':undefined}}
        >
           
            <div className="image">
                <Avatar
                    sx={{ width: 52, height: 52 }} alt="Remy Sharp" src={image} />
            </div>
            <div className="nameTextContainer">
                 <div className="nameText">{name}</div>
            </div>
            <div className="statusBar">
                <animated.div className='statusBar' style={animationStyle}>
                    <div className="child">{''}</div>
                </animated.div>
            </div>    
        </div>  
        {
            open && 
            <animated.div style={detailsAnimationStyle}>
                <div>
                     <div >{'Peso: ' + weight}</div>
                     <div >{'Fecha ultimo celo:' + format(lastHeatDate, 'yyyy-mm-dd')}</div>
                </div>  
            </animated.div>
        }
      
        </div>
    )
}

export default CowListItem;
