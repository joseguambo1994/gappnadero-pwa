import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import PositionsTable from "./Screens/PositionsTable/PositionsTable";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import Calendar from "./Screens/Calendar/Calendar";
import Splash from "./Screens/Splash/Splash";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5XCOuUbY0aPY3mKVBgy7CerCkLf9kQ_o",
  authDomain: "gappnadero-pwa.firebaseapp.com",
  projectId: "gappnadero-pwa",
  storageBucket: "gappnadero-pwa.appspot.com",
  messagingSenderId: "544904643491",
  appId: "1:544904643491:web:d60b31d8dc598824fa1016",
  measurementId: "G-04MWNQQY8P",
};

const defaultApp = initializeApp(firebaseConfig);

export const db = getFirestore(defaultApp);

export type ScreensProps = {
  name: string;
};

// const screensNames = [
//   'PositionsTable',
//   'Calendar',
//   'Sponsors'
// ]

function App() {
  const [navigationValue, setNavigationValue] = useState<number>(0);
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
  const [count, setCount] = useState(0);
  const [countInTimeout, setCountInTimeout] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('This will run after 5 second!')
      setShowSplashScreen(false)
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      {showSplashScreen ? (
        <>
          <Splash />
        </>
      ) : (
        <>
          {navigationValue === 0 && <PositionsTable />}
          {navigationValue === 1 && <Calendar />}
          <NavigationBar
            navigationValue={navigationValue}
            onChange={setNavigationValue}
          />
        </>
      )}
    </>
  );
}

export default App;
