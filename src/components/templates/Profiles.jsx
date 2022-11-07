import SectionLayout from '../molecules/SectionLayout';
import SectionTop from '../molecules/SectionTop';
import Actor from '../molecules/Actor';
import HideScrollX from '../molecules/HideScrollX';
import actorImageOne from 'src/assets/actorsimg/남궁민.jpg';
import actorImageTwo from 'src/assets/actorsimg/이청아.jpg';
import actorImageThree from 'src/assets/actorsimg/김지은.jpg';
import actorImageFour from 'src/assets/actorsimg/사카이_마사토.jpg';
import actorImageFive from 'src/assets/actorsimg/하마베_미나미.jpg';
import actorImageSix from 'src/assets/actorsimg/헨리_카빌.jpg';

const actorData = [
  {
    id: 1,
    imgUrl: actorImageOne,
    name: '남궁민',
    birthYear: '1978년생',
  },
  {
    id: 2,
    imgUrl: actorImageTwo,
    name: '이청아',
    birthYear: '1984년생',
  },
  {
    id: 3,
    imgUrl: actorImageThree,
    name: '김지은',
    birthYear: '1993년생',
  },
  {
    id: 4,
    imgUrl: actorImageFour,
    name: '사카이 마사토',
    birthYear: '1973년생',
  },
  {
    id: 5,
    imgUrl: actorImageFive,
    name: '하마베 미나미',
    birthYear: '2000년생',
  },
  {
    id: 6,
    imgUrl: actorImageSix,
    name: '헨리 카벨',
    birthYear: '1983년생',
  },
];

function Profiles() {
  return (
    <SectionLayout>
      <SectionTop title="Actors / Models" showAll="All of Acotors & Models" />
      <HideScrollX>
        {actorData.map(actor => (
          <Actor {...actor} key={actor.id} />
        ))}
      </HideScrollX>
    </SectionLayout>
  );
}

export default Profiles;
