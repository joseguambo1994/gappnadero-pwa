
import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import CustomImage from './Components/CustomImage';
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

type ImageProps = {
  id:number,
  image:string,
}
const imageList:ImageProps[] = [
  {
    id:1,
    image: 'https://www.raisingsheep.net/wp-content/uploads/2020/08/katahdin-sheep.jpg'
  },
  {
    id:2,
    image: 'https://cdn.iamcountryside.com/wp-content/uploads/2019/03/Katahdin-sheep.jpg'
  },
  {
    id:3,
    image: 'https://rafterwranch.net/wp-content/uploads/2017/11/1511147225_5a1246d94da37.jpg'
  },
  {
    id:4,
    image: 'https://images.squarespace-cdn.com/content/v1/59034a8ce3df2866485be264/1587151320855-LX89Z9MT62I2F0HWTMON/rams.jpg'
  }
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Gappnadero PWA
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {
          imageList.map(item=>
            <CustomImage key={item.id} image={item.image} />
            )
        }
      </header>
    </div>
  );
}

export default App;
