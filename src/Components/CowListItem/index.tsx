import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Grid, IconButton, Typography } from '@mui/material';
import { Edit, ExpandMore } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web'
import { format } from 'date-fns';
import { es } from 'date-fns/locale'
import { useNavigate } from 'react-router-dom';

const CowListItem = ({
    id = '',
    image = '',
    name = '',
    date = '',
    color = '',
    percentage = '',
    number = '',
    weight = 0,
    lastHeatDate = new Date(),
}) => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const tempPercentage = Number(percentage) > 99 ? 100 : percentage;
    const animationStyle = useSpring({
        width: open ? `${tempPercentage}%` : '0%',
        backgroundColor: color,
        height: '100%'
    })

    useEffect(() => {
        setOpen(true)
    }, [])

    return (

        <Accordion
            sx={
                {
                    borderRadius: 4,
                    mt: 1,
                    mb: 1,
                }
            }

        >
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                //  style={{ background: `linear-gradient(to right, ${color} ${percentage}%, #FFFFFF ${percentage}% 100%)`}}
                sx={
                    {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                    }
                }
            >
                <Grid container spacing={4} 
                sx={
                    {
                        flexDirection: 'row',
                        alignItems:'center',
                        alignContent:'center'
                    }
                }
                >

                <Grid item xs={2}>
                <Avatar alt="Remy Sharp" src={image} />
                </Grid>
                <Grid item xs={3}>
                <Typography>{name}</Typography>
                </Grid>
                <Grid item xs={7}>
                <animated.div style={animationStyle}>
                <Typography>{date}</Typography>
                </animated.div>
                </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails

            >

                <Typography>
                    {'Numero:' + number}
                </Typography>
                <Typography>
                    {'Peso:' + weight}
                </Typography>
                {
                    lastHeatDate && <Typography>
                        {'Fecha de ultimo celo:' + format(lastHeatDate, 'MMM/dd/yyyy', { locale: es })}
                    </Typography>
                }

                <Box position={'absolute'} right={0
                } top={60}>
                    <IconButton onClick={() => {
                        navigate('/cowDetail', { state: { id: id } });
                    }} color="secondary" aria-label="add an alarm">
                        <Edit />
                    </IconButton>
                </Box>

            </AccordionDetails>
        </Accordion>
    )
}

export default CowListItem;
