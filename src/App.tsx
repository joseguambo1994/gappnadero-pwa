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
      },
      secondary: {
        main: '#9A5103',
      },
    },
});

export const userStore = create<UserState>((set) => ({
  user: '',
  setUser: (user) => set(() => ({ user: user })),
  logout: () => set(() => ({ user: '' })),
}));

function App() {
  const user = userStore((state) => state.user);
  
  return (
    <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="container">
       <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
    {
      user && user!== '' &&   <MenuAppBar />
    }
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cowList" element={<CowList />} />
        <Route path="/cowDetail" element={<CowDetail />} />
        <Route path="/cowCreate" element={<CowCreate />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {
        // user && <BottomNavigator />
        user && user!== '' && <BottomNavigator />
      }
      </QueryClientProvider>
    </div>
    </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
