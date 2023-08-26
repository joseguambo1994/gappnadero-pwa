import { Box, Button, TextField } from '@mui/material';
import './styles.css';
import { userStore } from '../../App';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from 'react-hook-form';


const Login = () => {
  const setUser = userStore((state) => state.setUser);
  const navigate = useNavigate();
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      user: "",
      password: ""
    }
  });

  const onSubmit = (data: any, e: any) => {
    console.log('onSubmit', data, e);
    onLogin(data.user, data.password);
  }
  const onError = (errors: any, e: any) => console.log('onErro', errors, e);

  const onLogin = (user: string, password: string) => {
    signInWithEmailAndPassword(auth, user, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user.uid)
        navigate("/cowList")
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });

  }



  return (
    <div>
      <Box height="100vh" display="flex">

        <Box sx={{
          display: 'flex',
          flex: 1, 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignContent: 'center',
          backgroundColor: 'white'
          , p: 1,
          
        }}>

          <TextField id="userInput" label="Usuario" variant="outlined" color='secondary'
            sx={{ width: 1, mb: 1 }}
            error={errors.user ? true : false}
            {...register("user", { required: true })}
          />
          {errors.user && <p>This field is required user</p>}

          <TextField id="passwordInput" label="Contraseña" variant="outlined" color='secondary'
                    type="password"

            sx={{ width: 1, mb: 1 }}
            error={errors.password ? true : false}
            {...register("password", { required: true })}
          />

          {errors.password && <p>This field is required password</p>}
          <Button variant="contained" onClick={handleSubmit(onSubmit, onError)} color='secondary'
            sx={{ width: 1, mb: 1 }}
          >
            Ingresar
          </Button>

        </Box>
      </Box>
    </div>
  )
}

export default Login;
