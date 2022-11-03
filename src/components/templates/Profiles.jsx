import SectionLayout from '../molecules/SectionLayout';
import SectionTop from '../molecules/SectionTop';
import Actors from '../organisms/Acotors';

function Profiles() {
  return (
    <SectionLayout>
      <SectionTop title="Actors / Models" showAll="All of Acotors & Models" />
      <Actors />
    </SectionLayout>
  );
}

export default Profiles;
