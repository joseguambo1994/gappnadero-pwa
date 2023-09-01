import { Avatar, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web'
import './styles.css';
import { format } from 'date-fns';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const tempPercentage = Number(percentage) > 99 ? 100 : percentage;
    console.log({ date }, { number }, { weight }, { lastHeatDate }, { openItem })
    const animationStyle = useSpring({
        width: started ? `${tempPercentage}%` : '0%',
        backgroundColor: color,

    })
    const detailsAnimationStyle = useSpring({
        backgroundColor: open ? '#dfbf9f' : 'transparent',
        opacity: open ? 1 : 0,
        transform: open ? 'translateX(60px)' : 'translateX(0px)',
        width: '100%',

    })


    const handleOpen = () => {
        setOpen(prev => !prev)
    }

    useEffect(() => {
        setStarted(true)
    }, [])

    return (
        <div className="wrapper">
            <div onClick={handleOpen} className="elementsContainer">
                <div className="containerSummary"
                    style={{ backgroundColor: open ? '#af5c04' : undefined }}
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
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flex: 1,

                    }}>

                        <animated.div style={detailsAnimationStyle}>
                            <IconButton

                                onClick={() => {
                                    navigate('/cowDetail', { state: { id: id } });
                                }}
                                sx={{
                                    position: 'absolute',
                                    left: -60,
                                }}
                                size='large'
                                color='secondary'
                            ><Edit fontSize="inherit" />
                            </IconButton>
                            <div className='detailsContainer'>
                                <div >{'Peso: ' + weight}</div>
                                <div >{'Fecha ultimo celo:' + format(lastHeatDate, 'yyyy-mm-dd')}</div>
                            </div>
                        </animated.div>
                    </div>
                }
            </div>
        </div>
    )
}

export default CowListItem;
