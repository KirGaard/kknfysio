import React from 'react';
import TrainingPackages from '../sections/TrainingPackages';
import RiderAnalysis from '../sections/RiderAnalysis';
import RiderFocus from '../sections/RiderFocus';
import Method from '../sections/Method';
import Contact from '../sections/Contact';

const RytteranalysePage: React.FC = () => {
  return (
    <main>
      <TrainingPackages />
      <RiderAnalysis />
      <RiderFocus />
      <Method />
      <Contact />
    </main>
  );
};

export default RytteranalysePage;
