import { useQuery } from 'react-query';
import { db } from '../../firebase';
import './styles.css';
import { doc, getDoc } from "firebase/firestore";
import { Box, Card, CardContent, CardHeader, CardMedia, IconButton, Modal, Typography } from '@mui/material';
import Lottie from "lottie-react";
import Loading from "./loadingCow.json";
import { useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import MilkCollection from '../../Components/Milk';
import { useState, useRef} from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {Camera} from "react-camera-pro";



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
  const id = state?.id || undefined;

  const camera = useRef<any>(null);
  const [image, setImage] = useState();


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getCow = async () => {
    if (!id || id === '') return null
    const docRef = doc(db, "cattle", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const tempCow:ICow = {
        id: docSnap.data().id,
        arrivedAt:  docSnap.data().arrivedAt.toDate(),
        image:  docSnap.data().image,
        name:  docSnap.data().name,
        number:  docSnap.data().number,
        weight:  docSnap.data().weight,
        lastHeat: docSnap.data().lastHeat.toDate(),
      }
      return tempCow;
    }
  }

  const { isLoading, error, data } = useQuery('cow', getCow)


  if (isLoading) return <Box sx={{
    width: 1,
    height: 1,
    backgroundColor: 'green'
  }}
  >
    <Lottie animationData={Loading} />
  </Box>

  if (error) return <strong>{'An error has occurred: ' + error}</strong>

  return (<>
    <Card sx={{ width: 1 }}>
      <CardHeader
        title={data?.name}
      />
      <CardMedia
        component="img"
        height="194"
        image={data?.image}
        alt={data?.name}
      />
      <CardContent>
        <Typography variant='h5'>
          Numero: <Typography variant='body1' color="secondary">
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
           { format(data.lastHeat, 'MMM/dd/yyyy', {locale: es})}
          </Typography>
        </Typography>
         }
      </CardContent>

    </Card>

    <Camera errorMessages={{}} ref={camera} />
      <img src={image} alt='Preview' />
      <button
        onClick={() => {
            const photo = camera.current.takePhoto();
            setImage(photo);
        }}
      />

    <IconButton onClick={handleOpen} color="secondary" aria-label="add an alarm">
      <AddIcon />
    </IconButton>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box component="span" display="flex" flexDirection="row" justifyContent="center" alignItems="center">
        <Box sx={{ width: 'auto', backgroundColor: 'white', p: 10, m: 4, }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Box>

    </Modal>
    <MilkCollection id={id} />
  </>
  );
}

export default CowDetail;
