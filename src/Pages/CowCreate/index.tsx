import { Box, Button, TextField } from '@mui/material';
import './styles.css';
import { Timestamp}  from "firebase/firestore";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DevTool } from "@hookform/devtools";



type Inputs = {
  arrivedAt: Timestamp,
  image: string,
  name: string,
  number: string,
  weight: number,
  lastHeat?: Timestamp,
}

const CowCreate =() => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log("data", data)

  console.log(watch("lastHeat")) // watch input value by passing the name of it

  return (
    <Box sx={{backgroundColor:'white', p:2}}>
      
      <TextField sx={{width: 1, mb:2}} label="Nombre" color="secondary"  
      error={errors.name ? true:false}
      {...register("name", { required: true })}/>
      
      <TextField sx={{width: 1, mb:2}} label="Numero" color="secondary"  
      error={errors.name ? true:false}
      {...register("number", { required: true })}/>

      <TextField sx={{width: 1, mb:2}} label="Peso" color="secondary"  
      error={errors.name ? true:false}
      {...register("weight", { required: true })}/>

      <TextField sx={{width: 1, mb:2}} label="Url de imagen" color="secondary"  
      error={errors.name ? true:false}
      {...register("image", { required: true })}/>

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
  )
}

export default CowCreate