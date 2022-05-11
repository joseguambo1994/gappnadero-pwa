import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

//import CustomImage from './Components/CustomImage';
import TeamRow from "./Components/TeamRow/TeamRow";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import List from '@mui/material/List';

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

const db = getFirestore(defaultApp);

console.log("defaultApp.name", defaultApp.name); // '[DEFAULT]'

// type ImageProps = {
//   id:number,
//   image:string,
// }

type TeamProps = {
  position: number;
  name: string;
  logo: string;
  points: number;
  wonMatches: number;
  tieMatches: number;
  lostMaches: number;
  differenceGoal: number;
};

// const imageList:ImageProps[] = [
//   {
//     id:1,
//     image: 'https://www.raisingsheep.net/wp-content/uploads/2020/08/katahdin-sheep.jpg'
//   },
//   {
//     id:2,
//     image: 'https://cdn.iamcountryside.com/wp-content/uploads/2019/03/Katahdin-sheep.jpg'
//   },
//   {
//     id:3,
//     image: 'https://rafterwranch.net/wp-content/uploads/2017/11/1511147225_5a1246d94da37.jpg'
//   },
//   {
//     id:4,
//     image: 'https://images.squarespace-cdn.com/content/v1/59034a8ce3df2866485be264/1587151320855-LX89Z9MT62I2F0HWTMON/rams.jpg'
//   }
// ]

// const burnedTeams: TeamProps[] = [
//   {
//     position: 1,
//     name: "San Fe",
//     logo: "https://seeklogo.com/images/L/liga-deportiva-universitaria-de-quito-logo-5AB6BC49D8-seeklogo.com.png",
//     points: 12,
//     wonMatches: 4,
//     tieMatches: 0,
//     lostMaches: 0,
//     differenceGoal: 10,
//   },
//   {
//     position: 2,
//     name: "Maldonado 2",
//     logo: "http://assets.stickpng.com/images/584a9b3bb080d7616d298777.png",
//     points: 12,
//     wonMatches: 4,
//     tieMatches: 0,
//     lostMaches: 0,
//     differenceGoal: 10,
//   },
//   {
//     position: 3,
//     name: "Cisneros",
//     logo: "https://logodownload.org/wp-content/uploads/2017/02/manchester-city-fc-logo-escudo-badge.png",
//     points: 0,
//     wonMatches: 0,
//     tieMatches: 0,
//     lostMaches: 4,
//     differenceGoal: 10,
//   },
// ];

function App() {
  console.log("defaultApp.name", defaultApp.name); // '[DEFAULT]'

  const [teams, setTeams] = useState<TeamProps[]>();

  const getData = async (collectionName: string) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    let tempTeams:TeamProps[] = [];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      console.log("doc.data()", doc.data());
      const tempTeam:TeamProps = {
        position: doc.data().posicion,
    name: doc.data().nombre,
    logo: doc.data().logo,
    points: doc.data().puntos,
    wonMatches: doc.data().partidosGanados,
    tieMatches: doc.data().partidosEmpatados,
    lostMaches: doc.data().partidosPerdidos,
    differenceGoal: doc.data().golDiferencia,
      }
      tempTeams.push(tempTeam)
    });
    tempTeams.sort((firstItem, secondItem) => firstItem.position - secondItem.position);
    setTeams(tempTeams);
  };

  useEffect(()=>{
    getData('equipos')
  }, [])

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Gappnadero PWA
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //     {/* {
    //       imageList.map(item=>
    //         <CustomImage key={item.id} image={item.image} />
    //         )
    //     } */}
    //     {
    //       teams.map(item =>
    //         <TeamRow
    //         name={item.name}
    //         logo={item.name}
    //         points={item.points}
    //         wonMatches={item.wonMatches}
    //         tieMatches={item.tieMatches}
    //         lostMaches={item.lostMaches}
    //         differenceGoal={item.differenceGoal}
    //         />
    //         )
    //     }
    //   </header>
    // </div>
    
    <div>
      <Button variant="contained">Contained</Button>
      <div>{defaultApp.name}</div>
      <div>{db.type}</div>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {teams &&
        teams.map((item) => (
          <TeamRow
            position={item.position}
            name={item.name}
            logo={item.logo}
            points={item.points}
            wonMatches={item.wonMatches}
            tieMatches={item.tieMatches}
            lostMaches={item.lostMaches}
            differenceGoal={item.differenceGoal}
          />
        ))}
        </List>
    </div>
  );
}

export default App;
