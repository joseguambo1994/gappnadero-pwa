import { Box, Button, CircularProgress, Modal, TextField } from '@mui/material';
import { Timestamp, collection, addDoc}  from "firebase/firestore";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { DevTool } from "@hookform/devtools";
import { db } from '../../firebase';
import { useMutation } from 'react-query';
import { companyStore, milkStore } from '../../App';
import { DatePicker } from '@mui/x-date-pickers';

type Inputs = {
  liters: number,
  collectionDate: Timestamp,
}

const defaultValues = {
    collectionDate: new Date()
}

interface Props {
    cowId: string,
    open: boolean;
    handleClose: ()=>void;   
   }
const MilkForm = ({cowId, open, handleClose}:Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<Inputs>({defaultValues})
  const company = companyStore((state) => state.company);
  const setRefetch = milkStore((state) => state.setRefetch);


  const createMilk = async (formData: Inputs) => {
    const milkCollentionRef = collection(db,'companies', company, 'cattle', cowId, 'milk');
    await addDoc(milkCollentionRef, formData);
  }
  const { isSuccess , isLoading, isError, error, mutate } = useMutation(createMilk);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate({...data, collectionDate: data.collectionDate })
    handleClose();
    reset();
    setRefetch();
  }


  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box component="span" display="flex" flexDirection="row" justifyContent="center" alignItems="center">
      <Box sx={{ width: 'auto', backgroundColor: 'white', p: 2, m: 2, }}>
      {isLoading ? (<CircularProgress color="secondary" />
      ) : (
        <>
          {isError ? (
            <div>Ocurrio un error: {error?.toString()}</div>
          ) : null}

          {isSuccess ? <div>Registro de leche creado
          </div> : null}

          <Box sx={{ p:2,
          flex:1,
          
          }}>

      <TextField sx={{width: 1, mb:2}} label="Litros" color="secondary" 
        type="liters" 
      error={errors.liters ? true:false}
      {...register("liters", { required: true })}/>

<Controller 
          name="collectionDate"
          control={control}
          rules={{ required: true }}  
          render={({ field: { onChange, value } }) =>
              <DatePicker
              label="Fecha de recoleccion"
              sx={{width: 1, mb:2, backgroundColor:'white'}}
              onChange={(e) => onChange(e)}
              value={value}
              />
          }
      />


      <Button sx={{width: 1, mb:2}} color='secondary'
       onClick={handleSubmit(onSubmit)} variant="contained" >Crear</Button>
      <DevTool control={control} /> 
    </Box>
        </>
      )}

      </Box>
    </Box>

  </Modal>
    
  )
}

export default MilkForm