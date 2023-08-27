import { Box, Button, TextField } from '@mui/material';
import './styles.css';
import { userStore } from '../../App';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import Lottie from "lottie-react";
import Loading from "./RotatingCow.json";
import { auth } from '../../firebase';

const Login = () => {
  let inputRef = useRef(false);
  const setUser = userStore((state) => state.setUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

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

  const onLogin = async (user: string, password: string) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, user, password)
      .then((userCredential) => {
        const tempUser = userCredential.user;
        setUser(tempUser.uid)
        navigate("/cowList")
        console.log(user);
        localStorage.setItem('@user',user)
        localStorage.setItem('@password',password)

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      }).finally(()=>{
        setLoading(false)
      });
  }


  useEffect(()=>{ 
    const getUserCredentials = () => {
    const storedUser = localStorage.getItem("@user");
    const storedPassword = localStorage.getItem("@password");
    console.log('getUserCredentials', storedUser, storedPassword)
    if (storedUser && storedPassword){
      signInWithEmailAndPassword(auth, storedUser, storedPassword)
        .then((userCredential) => {
          const tempUser = userCredential.user;
          console.log('tempUser', tempUser)
          localStorage.setItem('@user',storedUser)
          localStorage.setItem('@password',storedPassword) 
          console.log('signInWithEmailAndPassword then', userCredential)
          setUser(tempUser.uid);
          navigate('/cowList')
        })
        .catch((error) => {
          console.log('error', error)

        })
        .finally(()=> setLoading(false))
    }
    setLoading(false)
  }
    inputRef.current = true;
    if (inputRef?.current) {
      getUserCredentials();
    }
  })

  if (loading) return  <Box height="100vh" display="flex">
    <Box sx={{
    display: 'flex',
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignContent: 'center',
    backgroundColor: 'white'

  }}
  >
    <Lottie animationData={Loading} />
  </Box>
  </Box>

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
