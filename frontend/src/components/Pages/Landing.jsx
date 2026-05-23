import React from 'react';
import Navbar from '../Layout/Navbar.jsx';
import Hero from '../Sections/Hero.jsx';
import Crisis from '../Sections/Crisis.jsx'; 
// import ProblemStatement from '../Sections/ProblemStatement.jsx';
import Features from '../Sections/Features.jsx';
import Benefits from '../Sections/Benefits.jsx';
import Comparison from '../Sections/Comparison.jsx';
import Techstack from '../Sections/Techstack.jsx';
import FAQ from '../Sections/FAQ.jsx';
import Footer from '../Layout/Footer.jsx';

const Landing = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <Crisis />
      <Features />
      <Benefits />
      <Comparison />
      <Techstack />
      <FAQ />
      <Footer />
      {/* <TrustIndicators />
      <ProblemStatement />
      
      
       */}
    </div>
  );
};

export default Landing;