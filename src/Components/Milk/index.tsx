import { useQuery } from 'react-query';
import { db } from '../../firebase';
import { Timestamp, collection, getDocs } from "firebase/firestore";
import Bottle from './Bottle';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Box, Typography } from '@mui/material';
import { KeyboardDoubleArrowDown } from '@mui/icons-material';
import { companyStore } from '../../App';
import _ from 'lodash';

interface Milk {
  id: string,
  collectionDate:Timestamp,
  liters: number,
}
interface Props {
  id: string,
  refetchMilk: boolean,
}
const MilkCollection = ({id, refetchMilk}: Props)=>{
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


  const { isLoading, error, data, refetch } = useQuery(['milk', id], getMilk)
  console.log({data})

  _.isBoolean(refetchMilk) && refetch();
  const maxLiters = data? Math.max(...data?.map(item => item.liters)) : 35;

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
      data && data?.length > 0 ? data?.sort((a,b)=>{
        if (a.collectionDate < b.collectionDate) return 1;
        if (a.collectionDate >= b.collectionDate) return -1;
        return 0
      }).map(item =>  
        <Bottle width={item.liters}
        maxLiters={maxLiters}
        collectionDate={format(item.collectionDate.toDate(), 'dd/MMM/yyyy', { locale: es })}
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
