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

interface CompanyState {
  company: string,
  setCompany: (company: string) => void,
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

export const companyStore = create<CompanyState>((set) => ({
  company: '',
  setCompany: (company) => set(() => ({ company: company })),
  logout: () => set(() => ({ company: '' })),
}));

const App = () => {
  const setCompany = companyStore((state) => state.setCompany);
  const company = companyStore((state) => state.company);

  useEffect(()=>{
    const getUser = ()=> {
      const storedUser = localStorage.getItem("@accessToken");
      storedUser &&  setCompany(storedUser)
    }
    getUser();
  }, [company, setCompany])


  console.log('company App.tsx', company)
  
  return (
    <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="container">
       <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
    
     { company &&  <MenuAppBar />}

      <Routes>
        <Route index element={company ? <ProtectedRoute company={company}>
              <CowList />
            </ProtectedRoute>: <Login />} />
        <Route path="/cowList" element={<ProtectedRoute company={company}>
              <CowList />
            </ProtectedRoute>} />
        <Route path="/cowDetail" element={<ProtectedRoute company={company}>
              <CowDetail />
            </ProtectedRoute>} />
        <Route path="/cowCreate" element={<ProtectedRoute company={company}>
              <CowCreate />
            </ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
         {company && <BottomNavigator />}
      </QueryClientProvider>
    </div>
    </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
