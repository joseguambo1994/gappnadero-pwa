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
import { create } from 'zustand'



const queryClient = new QueryClient()

interface UserState {
  user: string | undefined,
  setUser: (user: string) => void,
  logout:  () => void,
}
export const userStore = create<UserState>((set) => ({
  user: undefined,
  setUser: (user) => set(() => ({ user: user })),
  logout: () => set(() => ({ user: undefined })),
}));

function App() {
  const user = userStore((state) => state.user)

  console.log('App user', user)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="container">
       <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cowList" element={<CowList />} />
        <Route path="/cowDetail" element={<CowDetail />} />
        <Route path="/cowCreate" element={<CowCreate />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {
        user && <BottomNavigator />
      }
      </QueryClientProvider>
    </div>
    </LocalizationProvider>
    
  );
}

export default App;
