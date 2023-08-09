import './App.css';
import { Route, Routes } from 'react-router-dom';
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


const queryClient = new QueryClient()


function App() {
  return (
    <div className="container">
       <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <Routes>
        <Route path="/" element={<CowList />} />
        <Route path="/cowList" element={<CowList />} />
        <Route path="/cowDetail" element={<CowDetail />} />
      </Routes>
      <BottomNavigator />
      </QueryClientProvider>
    </div>
  );
}

export default App;
