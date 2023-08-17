import './styles.css';
import {
  useQuery
} from 'react-query'
import { Timestamp, collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, IconButton, Typography } from '@mui/material';
import { Edit, Person } from '@mui/icons-material';
import Lottie from "lottie-react";
import Loading from "./loadingCow.json";
import { useNavigate } from 'react-router-dom';
import { getPercentageHeat } from '../../Helpers/heat';


interface ICow {
  id: string,
  arrivedAt: Timestamp,
  image: string,
  name: string,
  number: string,
  weight: number,
  lastHeat?: Timestamp,
}
const CowList = () => {

  const navigate = useNavigate();

  const getCattle = async () => {
    const querySnapshot = await getDocs(collection(db, "cattle"));
    const cows = querySnapshot.docs.map(doc => {
      const tempCow:ICow = {
        id: doc.id,
        arrivedAt: doc.data().arrivedAt,
        image: doc.data().image,
        name: doc.data().name,
        number: doc.data().number,
        weight: doc.data().weight,
        lastHeat: doc.data().lastHeat,
      }
      return tempCow
    });
    return cows
  }

  const getPercentageColor = (date?: Date) => {
    if (!date) return 0
    return getPercentageHeat(21, new Date(), date)
  }

  const getColor = (percentage: number): string => {
    if (percentage < 40) return '#D6FFC1';
    if (percentage < 60) return '#67FF5A';
    if (percentage < 80) return '#FDFF5A';
    return '#FF4545';
  }


  const { isLoading, error, data } = useQuery('cattle', getCattle)

  if (isLoading) return <Box sx={{
    width: 1,
    height: 1,
    backgroundColor: 'green'
  }}
  >
    <Lottie animationData={Loading} />
  </Box>

  if (error) return <strong>{'An error has occurred: ' + error}</strong>

  console.log(data, error, isLoading)
  return (
    <div>
      {
        data?.map(item => <Accordion>
          <AccordionSummary
            expandIcon={<Person />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ background: `linear-gradient(to right, ${getColor(getPercentageColor(item.lastHeat?.toDate()))} ${getPercentageColor(item.lastHeat?.toDate())}%, #FFFFFF ${getPercentageColor(item.lastHeat?.toDate())}% 100%)`}}

          >
            <Box sx={{ mr: 2 }} >
              <Avatar alt="Remy Sharp" src={item.image} />
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography>{item.name}</Typography>
            </Box>

          </AccordionSummary>
          <AccordionDetails
      
          >
            
            <Typography>
              {'Numero:' + item.number}
            </Typography>
            <Typography>
              {'Peso:' + item.weight}
            </Typography>
            <Typography>
              {'Fecha de arribo:' + item.arrivedAt.toDate()}
            </Typography>
      
             <Box position={'absolute'} right={0
            } top={60}>
           <IconButton onClick={()=>{
              navigate('/cowDetail', { state: { id: item.id} });
            }}color="secondary" aria-label="add an alarm">
              <Edit />
            </IconButton>
           </Box>
           
          </AccordionDetails>
        </Accordion>)
      }
    </div>
  )
}

export default CowList;
