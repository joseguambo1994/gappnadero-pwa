import "./PositionsTable.css";
import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../App";
import TeamRow2 from "../../Components/TeamRow2/TeamRow2";
import Row from "../../Components/Row";
import CustomTable from "../../Components/CustomTable";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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
      <TableContainer>
        <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow  style={{backgroundColor:'#b3ffb3',
            }}>
              <TableCell>Posición</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Logo</TableCell>
              <TableCell align="right">PTS</TableCell>
              <TableCell align="right">PG</TableCell>
              <TableCell align="right">PE</TableCell>
              <TableCell align="right">PP</TableCell>
              <TableCell align="right">GD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams &&
              teams.map((item) => (
                <CustomTable
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
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PositionsTable;
