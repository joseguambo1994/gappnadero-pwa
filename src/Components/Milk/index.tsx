import { useQuery } from 'react-query';
import { db } from '../../firebase';
import './styles.css';
import { Timestamp, collection, getDocs } from "firebase/firestore";
import { AccordionSummary, Box, Typography } from '@mui/material';
import { Flag } from '@mui/icons-material';
import { format } from 'date-fns'



interface Milk {
  id: string,
  collectionDate:Timestamp,
  liters: number,
}
interface Props {
  id: string,
}
const MilkCollection = ({id}: Props)=>{
  const getMilk = async () => {
    const querySnapshot = await getDocs(collection(db, "cattle",id, 'milk'));
    const milkCollection = querySnapshot.docs.map(doc => {
      const tempCow:Milk = {
        id: doc.id,
        collectionDate: doc.data().collectionDate,
        liters: doc.data().liters,
      }
      return tempCow
    });
    return milkCollection
  }

  const { isLoading, error, data } = useQuery(['milk', id], getMilk)


  if (isLoading) return <strong>{'Is Loadinggg ' + error}</strong>

  if (error) return <strong>{'An error has occurred: ' + error}</strong>

  return (<div>
  {
    data?.map(item => <AccordionSummary
      expandIcon={<Flag />}

    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
         <Typography>{item?.liters}</Typography>
        <Typography>{format(item?.collectionDate?.toDate(), 'MM/dd/yyyy')}</Typography>
      </Box>

    </AccordionSummary>)
  }
  </div>
  );
}

export default MilkCollection;
