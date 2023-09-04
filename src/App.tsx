import './App.css';
import { Route, Routes} from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CowList from './Pages/CowList';
import CowDetail from './Pages/CowDetail';
import BottomNavigator from './Components/BottomNavigator';
import { ReactQueryDevtools } from 'react-query/devtools'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import CowCreate from './Pages/CowCreate';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import Login from './Pages/Login';
import { create } from 'zustand';
import MenuAppBar from './Components/TopNavigator';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import ProtectedRoute from './Components/ProtectedRoute';

const queryClient = new QueryClient()

interface UserState {
  user: string | undefined,
  setUser: (user: string) => void,
  logout:  () => void,
}

const theme = createTheme({
    palette: {
      primary: {
        main: '#4B8033',
        light: '#e0e0d1'
      },
      secondary: {
        main: '#9A5103',
        light: '#cc9766'
      },
    },
});

export const userStore = create<UserState>((set) => ({
  user: '',
  setUser: (user) => set(() => ({ user: user })),
  logout: () => set(() => ({ user: '' })),
}));
export interface User {
  id: string,
  name: string,
}

const App = () => {
  const setUser = userStore((state) => state.setUser);
  const user = userStore((state) => state.user);

  useEffect(()=>{
    const getUser = ()=> {
      const storedUser = localStorage.getItem("@accessToken");
      storedUser &&  setUser(storedUser)
    }
    getUser();
  }, [user, setUser])


  console.log('user App.tsx', user)
  
  return (
    <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="container">
       <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
    
     { user &&  <MenuAppBar />}

      <Routes>
        <Route index element={user ? <ProtectedRoute user={user}>
              <CowList />
            </ProtectedRoute>: <Login />} />
        <Route path="/cowList" element={<ProtectedRoute user={user}>
              <CowList />
            </ProtectedRoute>} />
        <Route path="/cowDetail" element={<ProtectedRoute user={user}>
              <CowDetail />
            </ProtectedRoute>} />
        <Route path="/cowCreate" element={<ProtectedRoute user={user}>
              <CowCreate />
            </ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
         {user && <BottomNavigator />}
      </QueryClientProvider>
    </div>
    </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
