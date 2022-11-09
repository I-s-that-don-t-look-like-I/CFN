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
import actorImageSeven from 'src/assets/actorsimg/한소희.jpg';
import actorImageEight from 'src/assets/actorsimg/송강.jpg';
import actorImageNine from 'src/assets/actorsimg/박민영.jpg';
import actorImageTen from 'src/assets/actorsimg/고경표.jpg';
import actorImageEleven from 'src/assets/actorsimg/키아누_리브스.jpg';
import actorImageTwelve from 'src/assets/actorsimg/스칼렛_요한슨.jpg';
import actorImageThirteen from 'src/assets/actorsimg/엠마_스톤.jpg';
import actorImageFourteen from 'src/assets/actorsimg/로버트_드_니로.jpg';
import actorImageFifteen from 'src/assets/actorsimg/앤_해서웨이.jpg';
import actorImageSixteen from 'src/assets/actorsimg/로버트_다우니_주니어.png';
import actorImageSeventeen from 'src/assets/actorsimg/김시아.jpg';
import actorImageEighteen from 'src/assets/actorsimg/이시하라_사토미.jpg';

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
  {
    id: 7,
    imgUrl: actorImageSeven,
    name: '한소희',
    birthYear: '1994년생',
  },
  {
    id: 8,
    imgUrl: actorImageEight,
    name: '송강',
    birthYear: '1994년생',
  },
  {
    id: 9,
    imgUrl: actorImageNine,
    name: '박민영',
    birthYear: '1986년생',
  },
  {
    id: 10,
    imgUrl: actorImageTen,
    name: '고경표',
    birthYear: '1990년생',
  },
  {
    id: 11,
    imgUrl: actorImageEleven,
    name: '키아누 리브스',
    birthYear: '1964년생',
  },
  {
    id: 12,
    imgUrl: actorImageTwelve,
    name: '스칼렛 요한슨',
    birthYear: '1984년생',
  },
  {
    id: 13,
    imgUrl: actorImageThirteen,
    name: '엠마 스톤',
    birthYear: '1988년생',
  },
  {
    id: 14,
    imgUrl: actorImageFourteen,
    name: '로버트 드 니로',
    birthYear: '1943년생',
  },
  {
    id: 15,
    imgUrl: actorImageFifteen,
    name: '앤 해서웨이',
    birthYear: '1982년생',
  },
  {
    id: 16,
    imgUrl: actorImageSixteen,
    name: '로버트 다우니 주니어',
    birthYear: '1965년생',
  },
  {
    id: 17,
    imgUrl: actorImageSeventeen,
    name: '김시아',
    birthYear: '2004년생',
  },
  {
    id: 18,
    imgUrl: actorImageEighteen,
    name: '이시하라 사토미',
    birthYear: '1986년생',
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
