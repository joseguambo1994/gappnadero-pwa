import './styles.css';
import {
  useQuery
} from 'react-query'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Typography } from '@mui/material';
import { Person } from '@mui/icons-material';
import Lottie from "lottie-react";
import Loading from "./loadingCow.json";

// interface ICow {
//   arrivedAt: Timestamp,
//   image: string,
//   name: string,
//   number: string,
//   weight: number,
// }
const CowList = () => {
  const getCattle = async () => {
    const querySnapshot = await getDocs(collection(db, "cattle"));
    return querySnapshot.docs.map(doc => doc.data());
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
          <AccordionDetails>
            <Typography>
              {'Numero:' + item.number}
            </Typography>
            <Typography>
              {'Peso:' + item.weight}
            </Typography>
            <Typography>
              {'Fecha de arribo:' + item.arrivedAt.toDate()}
            </Typography>
          </AccordionDetails>
        </Accordion>)
      }
    </div>
  )
}

export default CowList;
