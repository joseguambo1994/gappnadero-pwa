import { useQuery } from 'react-query';
import { db, storage } from '../../firebase';
import './styles.css';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Box, Card, CardContent, CardHeader, CardMedia, Fab, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import MilkCollection from '../../Components/Milk';
import { useState, useRef } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ref, uploadBytes, getDownloadURL, } from "firebase/storage";
import Loading from '../../Components/Loading';
import { Edit } from '@mui/icons-material';
import MilkForm from '../../Components/MilkForm';
import { companyStore, milkStore } from '../../App';

interface ICow {
  id: string,
  arrivedAt: Date,
  image: string,
  name: string,
  number: string,
  weight: number,
  lastHeat?: Date
}


const CowDetail = () => {
  const { state } = useLocation();
  const company = companyStore((state) => state.company);
  const refetch = milkStore((state) => state.refetch);

  const id = state?.id || undefined;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };


  const [imageObject, setImageObject] = useState<any>(null);
  const handleFileInput = useRef<any>(null);
  const storageRef = ref(storage, `/companies/${company}/cattle/${id}/cow`);

  const handleClick = () => {
    handleFileInput?.current?.click();
  };

  const handleImageChange = async (event: any) => {
    setImageObject({
      imagePreview: URL.createObjectURL(event.target.files[0]),
      imageFile: event.target.files[0],
    });
    try {
      const snapshot = await uploadBytes(storageRef, event.target.files[0]);
      const tempUrl = await getDownloadURL(snapshot.ref);
      const cowRef = doc(db, 'companies', company, "cattle", id);
      await updateDoc(cowRef, {
        image: tempUrl
      });
    } catch (e) {
      console.error("The Promise is rejected!", e);
    }
  };

  const getCow = async () => {
    if (!id || id === '') return null
    const docRef = doc(db, 'companies', company, "cattle", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const tempCow: ICow = {
        id: docSnap.data().id,
        arrivedAt: docSnap.data().arrivedAt.toDate(),
        image: docSnap.data().image,
        name: docSnap.data().name,
        number: docSnap.data().number,
        weight: docSnap.data().weight,
        lastHeat: docSnap.data().lastHeat.toDate(),
      }
      return tempCow;
    }
  }

  const { isLoading, error, data } = useQuery('cow', getCow)


  if (isLoading) return <Loading />

  if (error) return <strong>{'An error has occurred: ' + error}</strong>

  return (
    <Box sx={{ mt: 8, mb: 8, backgroundColor: 'secondary.light' }}>
      <>

        <Card sx={{ width: 1, backgroundColor: 'primary.light' }}>
          <CardHeader
            title={data?.name}
          />
          <Fab
            style={{
              position: 'absolute',
              right: 4,
            }} color="secondary" aria-label="add"
            size='small'
            onClick={handleClick}
          >
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/png"
              capture="environment"
              ref={handleFileInput}
              onChange={handleImageChange}
            />
            <Edit />
          </Fab>
          <CardMedia
            component="img"
            height="194"
            image={imageObject?.imagePreview || data?.image}
            alt={data?.name}
          />
          <CardContent>
            <Typography variant='h5'>
              Identificador: <Typography variant='body1' color="secondary">
                {data?.number}
              </Typography>
            </Typography>
            <Typography variant='h5'>
              Peso <Typography variant='body1' color="secondary">
                {data?.weight}
              </Typography>
            </Typography>
            {
              data?.lastHeat && <Typography variant='h5'>
                Fecha de ultimo celo <Typography variant='body1' color="secondary">
                  {format(data.lastHeat, 'MMM/dd/yyyy', { locale: es })}
                </Typography>
              </Typography>
            }
          </CardContent>
        </Card>
        <Box sx={{
          position: 'absolute', right: 0, paddingRight: 1,
          paddingTop: 4
        }}>
          <Fab
            variant="extended" color="secondary" onClick={handleOpen}>
            Crear
          </Fab>
        </Box>
        <MilkForm cowId={id} open={open} handleClose={handleClose} />
        <MilkCollection id={id} refetchMilk={refetch} />
      </></Box>
  );
}

export default CowDetail;
