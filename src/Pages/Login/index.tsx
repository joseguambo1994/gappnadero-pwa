import { Alert, Box, Button, Snackbar, TextField } from '@mui/material';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from 'react-hook-form';
import { auth, db } from '../../firebase';
import { STORAGE_KEY_ACCESS_TOKEN } from '../../constants';
import { useState } from 'react';

import { doc, getDoc } from "firebase/firestore";
import { companyStore } from '../../App';



const Login = () => {
  const setUser = companyStore((state) => state.setCompany);
  const navigate = useNavigate();
  const [showError, setShowError] = useState<boolean>(false);
  
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

  const login = async (user: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, user, password);
      if (userCredential?.user?.uid) {

        const docRef = doc(db, "users", userCredential?.user?.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const company = docSnap.data().company;
          if (company) {
            localStorage.setItem(STORAGE_KEY_ACCESS_TOKEN, company)
            setUser(company)
            navigate("/cowList")
          }
          
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }




       
      }
    } catch (e) {
      setShowError(true)
    }
  }

  const onSubmit = (data: any, e: any) => {
    if (data?.user && data?.password) {
      login(data.user, data.password)
    }
  }
  const onError = (_errors: any, _e: any) => {};

  const handleClose = () => {
    setShowError(false);
};

  return (
    <div>
      <Box height="100vh" display="flex"
      sx={{backgroundColor:'#e0e0d1'}}
      >

        <Box sx={{
          display: 'flex',
          flex: 1, 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignContent: 'center',
          p: 1,
          
        }}>
         {
           showError && <Snackbar open={showError} autoHideDuration={2000} onClose={handleClose} >
           <Alert severity="error" sx={{ width: '100%' }} onClose={handleClose}>
             Error de autenticacion o credenciales
           </Alert>
         </Snackbar>
         }
          <TextField id="userInput" label="Usuario" variant="outlined" color='secondary'

            sx={{ width: 1,mb: 1, bgcolor: 'white' }}
            error={errors.user ? true : false}
            {...register("user", { required: true })}
          />
          {errors.user && <p>This field is required user</p>}

          <TextField id="passwordInput" label="Contraseña" variant="outlined" color='secondary'
                    type="password"

            sx={{ width: 1, mb: 1,  bgcolor: 'white' }}
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
