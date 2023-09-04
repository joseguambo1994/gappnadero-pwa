import { useQuery } from 'react-query';
import { db, storage } from '../../firebase';
import './styles.css';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Box, Card, CardContent, CardHeader, CardMedia, IconButton, Modal, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import MilkCollection from '../../Components/Milk';
import { useState, useRef } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ref, uploadBytes, getDownloadURL, } from "firebase/storage";
import Loading from '../../Components/Loading';



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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [imageObject, setImageObject] = useState<any>(null);
  const handleFileInput = useRef<any>(null);
  const storageRef = ref(storage, `/cattle/${id}/cow`);

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
      const cowRef = doc(db, "cattle", id);
      await updateDoc(cowRef, {
        image: tempUrl
      });
    } catch (e) {
      console.error("The Promise is rejected!", e);
    }
  };

  const getCow = async () => {
    if (!id || id === '') return null
    const docRef = doc(db, "cattle", id);
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


  if (isLoading) return  <Loading />

  if (error) return <strong>{'An error has occurred: ' + error}</strong>

  return (
    <Box sx={{ mt: 8, mb: 8 }}>
      <>

        <Card sx={{ width: 1 }}>
          <CardHeader
            title={data?.name}
          />
          <CardMedia
            component="img"
            height="194"
            image={imageObject?.imagePreview || data?.image}
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
                  {format(data.lastHeat, 'MMM/dd/yyyy', { locale: es })}
                </Typography>
              </Typography>
            }
          </CardContent>

        </Card>

        <div>
          <button onClick={handleClick}>Upload Photo</button>
          <label>
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/png"
              capture="environment"
              ref={handleFileInput}
              onChange={handleImageChange}
            />
          </label>
          {/* {imageObject && <Box sx={{ width: 1 }}>
            <img width="100%" height="400" src={imageObject.imagePreview} alt="PreviewImaeg" />
          </Box>} */}
        </div>

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
      </></Box>
  );
}

export default CowDetail;
