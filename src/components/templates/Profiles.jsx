import SectionLayout from '../molecules/SectionLayout';
import SectionTop from '../molecules/SectionTop';
import Actor from '../molecules/Actor';
import HideScrollX from '../molecules/HideScrollX';
import { FirebaseRead } from '../molecules/FirebaseDbManager';
import { useState, useEffect } from 'react';

export default function Profiles() {
  const [actorData, setActorData] = useState([]);

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
        console.log('================');
        response.forEach(data => {
          // 불러온 데이터를 actor 배열에 추가
          actors.push({
            actor_name: data.data().actor_name,
            birth: data.data().birth,
            upload_time: data.data().upload_time,
            imgUrl: data.data().imgUrl,
            index: data.data().index,
          });
        });
        // actor 배열을 upload_time을 기준으로 내림차순 정렬
        actors.sort((a, b) => (a.upload_time < b.upload_time ? 1 : -1));
        setActorData(actors);
        console.log(actorData);
        return actors;
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
        {actorData.map(actor => (
          <Actor
            actor_name={actor.actor_name}
            birth={actor.birth}
            imgUrl={actor.imgUrl}
            key={actor.index}
          />
        ))}
      </HideScrollX>
    </SectionLayout>
  );
}
