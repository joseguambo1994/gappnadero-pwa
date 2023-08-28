import { Box, Button, TextField } from '@mui/material';
import './styles.css';
import { Timestamp, collection, addDoc}  from "firebase/firestore";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DevTool } from "@hookform/devtools";
import { db } from '../../firebase';
import { useMutation } from 'react-query';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading';



type Inputs = {
  arrivedAt: Timestamp,
  image: string,
  name: string,
  number: string,
  weight: number,
  lastHeat?: Timestamp,
}

const defaultValues = {
  image: 'https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg',
}

const CowCreate =() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<Inputs>({defaultValues})

  const createCow = async (formData: Inputs) => {
    const docRef = await addDoc(collection(db, "cattle"), formData);
    console.log("Document written with ID: ", docRef.id);
  }
  const { isSuccess , isLoading, isError, error, mutate } = useMutation(createCow);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate({...data, weight: Number(data.weight)});
  }

  const navigate = useNavigate();
  isSuccess && navigate("/cowList")

  return (
 
    <Box sx={{mt:8, mb:8, 
      backgroundColor:'primary.light',
      height: '100vh',
    }}
    >
      {isLoading ? (<Loading />
      ) : (
        <>
          {isError ? (
            <div>Ocurrio un error: {error?.toString()}</div>
          ) : null}

          {isSuccess ? <div>Registro de ganado creado
            <Link href="/cowList" color="inherit">
  {'color="inherit"'}
</Link>
          </div> : null}

          <Box sx={{ p:2,
          flex:1,
          
          }}>
      
      <TextField sx={{width: 1, mb:2}} label="Nombre" color="secondary"  
      error={errors.name ? true:false}
      {...register("name", { required: true })}/>
      
      <TextField sx={{width: 1, mb:2}} label="Numero" color="secondary"  
      error={errors.name ? true:false}
      {...register("number", { required: true })}/>

      <TextField sx={{width: 1, mb:2}} label="Peso" color="secondary" 
        type="number" 
      error={errors.name ? true:false}
      {...register("weight", { required: true })}/>

      <Controller 
          name="lastHeat"
          control={control}
          rules={{ required: true }}
          defaultValue={undefined}
          render={({ field }) =>
              <DatePicker
              label="Fecha de ultimo celo"
              sx={{width: 1, mb:2}}
              onChange={(e) => field.onChange(e)}
              disableFuture
              />
          }
      />

      <Controller 
          name="arrivedAt"
          control={control}
          rules={{ required: true }}  
          render={({ field }) =>
              <DatePicker
              label="Fecha de arribo"
              sx={{width: 1, mb:2}}
              onChange={(e) => field.onChange(e)}
              disableFuture
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
  )
}

export default CowCreate