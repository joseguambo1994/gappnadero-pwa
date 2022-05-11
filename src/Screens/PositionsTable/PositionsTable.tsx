
import './PositionsTable.css';
import { List } from '@mui/material';
import { useEffect, useState } from 'react';
import TeamRow from '../../Components/TeamRow/TeamRow';

import { collection, getDocs } from "firebase/firestore";
import { db } from '../../App';

type TeamProps = {
  position: number,
  name: string,
  logo: string,
  points: number,
  wonMatches: number,
  tieMatches: number,
  lostMaches: number,
  differenceGoal: number,
}

const PositionsTable = () => {

  const [teams, setTeams] = useState<TeamProps[]>();
  const getData = async (collectionName: string) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    let tempTeams: TeamProps[] = [];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      console.log("doc.data()", doc.data());
      const tempTeam: TeamProps = {
        position: doc.data().posicion,
        name: doc.data().nombre,
        logo: doc.data().logo,
        points: doc.data().puntos,
        wonMatches: doc.data().partidosGanados,
        tieMatches: doc.data().partidosEmpatados,
        lostMaches: doc.data().partidosPerdidos,
        differenceGoal: doc.data().golDiferencia,
      };
      tempTeams.push(tempTeam);
    });
    tempTeams.sort(
      (firstItem, secondItem) => firstItem.position - secondItem.position
    );
    setTeams(tempTeams);
  };

  useEffect(() => {
    getData("equipos");
  }, []);

  return (
   <>
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
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
   </>
     
);
  
}

export default PositionsTable;
