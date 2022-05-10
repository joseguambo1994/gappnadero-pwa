import './App.css';
import { initializeApp } from "firebase/app";
//import CustomImage from './Components/CustomImage';
import TeamRow from './Components/TeamRow/TeamRow';
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
  measurementId: "G-04MWNQQY8P"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// type ImageProps = {
//   id:number,
//   image:string,
// }

type TeamProps = {
  position: number,
  name: string,
  logo: string,
  points: number,
  wonGames: number,
  tieGames: number,
  lostMaches: number,
  differenceGoal: number,
}

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

const teams:TeamProps[] = [{
  position:1,
  name: 'San Fe',
  logo: 'https://seeklogo.com/images/L/liga-deportiva-universitaria-de-quito-logo-5AB6BC49D8-seeklogo.com.png',
  points: 12,
  wonGames: 4,
  tieGames: 0,
  lostMaches: 0,
  differenceGoal: 10,
},
{
  position:2,
  name: 'Maldonado 2',
  logo: 'http://assets.stickpng.com/images/584a9b3bb080d7616d298777.png',
  points: 12,
  wonGames: 4,
  tieGames: 0,
  lostMaches: 0,
  differenceGoal: 10,
},
{
  position:3,
  name: 'Cisneros',
  logo: 'https://logodownload.org/wp-content/uploads/2017/02/manchester-city-fc-logo-escudo-badge.png',
  points: 0,
  wonGames: 0,
  tieGames: 0,
  lostMaches: 4,
  differenceGoal: 10,
}]

function App() {
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
    //         wonGames={item.wonGames}
    //         tieGames={item.tieGames}
    //         lostMaches={item.lostMaches}
    //         differenceGoal={item.differenceGoal}
    //         />
    //         )
    //     }
    //   </header>
    // </div>
    <div>
      {
          teams.map(item =>
            <TeamRow
            position={item.position}
            name={item.name}
            logo={item.logo}
            points={item.points}
            wonGames={item.wonGames}
            tieGames={item.tieGames}
            lostMaches={item.lostMaches}
            differenceGoal={item.differenceGoal}
            />
            )
        }
    </div>
  );
}

export default App;
