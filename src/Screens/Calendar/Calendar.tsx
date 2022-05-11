
import MatchCard, { MatchProps } from '../../Components/MatchCard/MatchCard';
import './Calendar.css';

const burnedData:MatchProps[] = [
  {
    localTeam: 'San Felipe',
  visitingTeam: 'Maldonado',
  date: '04 de mayo de 2022',
  image: 'https://static.timesofisrael.com/www/uploads/2020/03/000_1PI2DB-e1583957728742.jpg',
  },
  {
    localTeam: 'Cisneros',
  visitingTeam: 'Salesianos',
  date: '15 de julio de 2022',
  image: 'https://static.timesofisrael.com/www/uploads/2019/11/000_1MB1Q8-640x400.jpg',
  },
  {
    localTeam: 'Comil',
  visitingTeam: 'Isabel de Godín',
  date: '24 de diciembre de 2022',
  image: 'https://italicsmag.com/wp-content/uploads/2021/07/Soccer-EURO-2020-770x513.jpg',
  },
  {
    localTeam: 'San Felipe',
  visitingTeam: 'Salesianos',
  date: '01 de junio de 2022',
  image: 'https://static.dw.com/image/60376650_101.jpg',
  },
  {
    localTeam: 'Cisneros',
  visitingTeam: 'Maldonado',
  date: '04 de junio de 2022',
  image: 'https://gdb.voanews.com/52545589-2C6F-4E56-8744-267204E63741_w408_r1_s.jpg',
  },
] 

const Calendar = () => {

  return (
    <div>
      {burnedData.map(item=>
        <MatchCard 
        localTeam={item.localTeam}
        visitingTeam={item.visitingTeam}
        date={item.date}
        image={item.image}        
        />
        )}

    </div>
  );
}


export default Calendar;