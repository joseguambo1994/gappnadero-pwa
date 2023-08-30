import './styles.css';
import {
  useQuery
} from 'react-query'
import { Timestamp, collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import {  Box, Fab,  } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getPercentageHeat } from '../../Helpers/heat';
import Loading from '../../Components/Loading';
import CowListItem from '../../Components/CowListItem';

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


   if (isLoading) return <Loading />

   if (error) return <strong>{'An error has occurred: ' + error}</strong>

  console.log(data, error, isLoading)
  return (
    <Box sx={{mt:8, mb:8, p:1,
    backgroundColor:'primary.light'
    }}>
      <Fab style={ {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 80,
    left: 'auto',
    position: 'fixed',
}} color="secondary" aria-label="add"
onClick={()=>{
  navigate('/cowCreate');
}}
>
  <Add />
</Fab>
      {
        data?.map(item => 
          <CowListItem 
          id={item.id}
          image ={item.image}
          name ={item.name}
          date={(getPercentageHeat(21, new Date(), item.lastHeat?.toDate())*21/100).toFixed(0)}
          color={getColor(getPercentageColor(item.lastHeat?.toDate()))}
          percentage={getPercentageColor(item.lastHeat?.toDate()).toString()}
          number={item.number}
          weight={item.weight}
          lastHeatDate={item?.lastHeat?.toDate()}
          />
         )
      }
      
    </Box>
  )
}

export default CowList;
