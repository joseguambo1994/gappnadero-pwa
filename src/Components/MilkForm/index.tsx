import { Box, Button, Modal, TextField } from '@mui/material';
import { Timestamp, collection, addDoc}  from "firebase/firestore";
import { useForm, SubmitHandler } from "react-hook-form"
import { DevTool } from "@hookform/devtools";
import { db } from '../../firebase';
import { useMutation } from 'react-query';
import Loading from '../../Components/Loading';
import { companyStore } from '../../App';

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
    control
  } = useForm<Inputs>({defaultValues})
  const company = companyStore((state) => state.company);

  const createMilk = async (formData: Inputs) => {
    const milkCollentionRef = collection(db,'companies', company, 'cattle', cowId, 'milk');
    await addDoc(milkCollentionRef, formData);
  }
  const { isSuccess , isLoading, isError, error, mutate } = useMutation(createMilk);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate({...data, collectionDate: data.collectionDate });
  }


  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >

    <Box component="span" display="flex" flexDirection="row" justifyContent="center" alignItems="center">
      <Box sx={{ width: 'auto', backgroundColor: 'white', p: 10, m: 4, }}>
      {isLoading ? (<Loading />
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

      {/* <Controller 
          name="collectionDate"
          control={control}
          rules={{ required: false }}  
          render={({ field }) =>
              <DatePicker
              label="Fecha de arribo"
              sx={{width: 1, mb:2}}
              onChange={(e) => field.onChange(e)}
              disableFuture
              />
          }
      /> */}

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