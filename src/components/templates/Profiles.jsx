import SectionLayout from '../molecules/SectionLayout';
import SectionTop from '../molecules/SectionTop';
import Actor from '../molecules/Actor';
import HideScrollX from '../molecules/HideScrollX';
import { FirebaseRead } from '../molecules/FirebaseDbManager';
import { useState, useEffect } from 'react';
import { GiConsoleController } from 'react-icons/gi';
import { Box } from '@chakra-ui/react';

export default function Profiles() {
  const [actorData, setActorData] = useState();

  useEffect(() => {
    async function getActorsSimpleData() {
      let today = new Date();
      let actors = []; // actor 배열 생성

      try {
        const response = await FirebaseRead({
          _collection: 'actors',
          _column: 'upload_time',
          _compOpt: '<=',
          _value: today,
        });
        response.docs.map(doc => {
          actors.push(doc.data());
        });
        actors.sort((a, b) => (a.upload_time < b.upload_time ? 1 : -1));
        // console.log(actors);
        setActorData(actors);
      } catch (error) {
        console.error(error);
      }
    }
    getActorsSimpleData();
  }, []);
  return (
    <SectionLayout>
      <SectionTop title="Actors / Models" showAll="All of Acotors & Models" />
      <HideScrollX>
        {actorData
          ? actorData.map(actor => (
              <Actor key={actor.upload_time} props={actor} />
            ))
          : ''}
      </HideScrollX>
    </SectionLayout>
  );
}
