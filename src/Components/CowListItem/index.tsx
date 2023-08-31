import { Avatar,Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web'
import './styles.css';

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

    const [open, setOpen] = useState(false);
    const tempPercentage = Number(percentage) > 99 ? 100 : percentage;
    console.log({date}, {number}, {weight}, {lastHeatDate}, {openItem})
    const animationStyle = useSpring({
        width: open ? `${tempPercentage}%` : '0%',
        backgroundColor: color,

    })

    useEffect(() => {
        setOpen(true)
    }, [])

    return (
        <div className="wrapper">
        <div className="elementsContainer">
            <div className="image">
                <Avatar
                    sx={{ width: 52, height: 52 }} alt="Remy Sharp" src={image} />
            </div>
            <div className="nameText">
                <Typography>{name}</Typography>
            </div>
            <div className="statusBar">
                <animated.div className='statusBar' style={animationStyle}>
                    <div className="child">{'->'}</div>
                </animated.div>
            </div>
        </div>
        </div>
    )
}

export default CowListItem;
