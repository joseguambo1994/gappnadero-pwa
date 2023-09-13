import { useQuery } from 'react-query';
import { db } from '../../firebase';
import { Timestamp, collection, getDocs } from "firebase/firestore";
import Bottle from './Bottle';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Box, Typography } from '@mui/material';
import { KeyboardDoubleArrowDown } from '@mui/icons-material';
import { companyStore } from '../../App';
import { sortMilkCollectionByDate } from '../../Helpers/milk/milk';

interface Milk {
  id: string,
  collectionDate:Timestamp,
  liters: number,
}
interface Props {
  id: string,
}
const MilkCollection = ({id,
}: Props)=>{
  const company = companyStore((state) => state.company);
  const getMilk = async () => {
    const querySnapshot = await getDocs(collection(db,'companies',company, "cattle",id, 'milk'));
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
  console.log("Milk data", data)

  if (isLoading) return <strong>{'Is Loadinggg ' + error}</strong>

  if (error) return <strong>{'An error has occurred: ' + error}</strong>

  return (<div >
  
    <>
    <Box sx={{
      display:'flex',
      flexDirection:'row',
      pb:1,
    }}>
      <Typography
      sx={{
        flex:1,
        textAlign:'center',
      }}
      variant='h5'
      color={'white'}
      >{'Fecha'}<KeyboardDoubleArrowDown /></Typography>
      <Typography
       sx={{
        flex:2,
        textAlign:'center'
      }}
      variant='h5'
      color={'white'}
      >{'Litros'}<KeyboardDoubleArrowDown  /></Typography>
    </Box>
    {
      data && data.length > 0 ? sortMilkCollectionByDate(data).map(item =>  
        <Bottle width={item.liters} collectionDate={format(new Date(item.collectionDate.seconds 
          * 1000 + item.collectionDate.nanoseconds/1000000), 'dd/MMM/yyyy', { locale: es })}
         />
     
       ) : <Typography
       sx={{
        backgroundColor:'white'
      }}
      variant='body1'
      >{'No se encontraron registros de leche'}</Typography>
    }
    </>
  
  </div>
  );
}

export default MilkCollection;
