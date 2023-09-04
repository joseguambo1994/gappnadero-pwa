import { useQuery } from 'react-query';
import { db } from '../../firebase';
import { Timestamp, collection, getDocs } from "firebase/firestore";
import Bottle from './Bottle';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';





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

  console.log({data})

  if (isLoading) return <strong>{'Is Loadinggg ' + error}</strong>

  if (error) return <strong>{'An error has occurred: ' + error}</strong>

  return (<div >
  {
    data?.map(item =>  
     <Bottle width={item.liters} collectionDate={format(item.collectionDate.toDate(), 'MMM/dd/yyyy', { locale: es })}
      />
    
    )
  }
  </div>
  );
}

export default MilkCollection;
