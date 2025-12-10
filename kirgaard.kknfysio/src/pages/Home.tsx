import React from 'react';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import RiderFocus from '../sections/RiderFocus';
import Method from '../sections/Method';
import About from '../sections/About';
import Testimonials from '../sections/Testimonials';
import Contact from '../sections/Contact';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Services />
      <RiderFocus />
      <Method />
      <About />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default Home;
