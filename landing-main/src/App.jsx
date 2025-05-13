import React from "react";

import RegistrationSection from "./components/RegistrationSection";
import CompetitionFormatSection from "./components/CompetitionFormatSection";
import VladivostokSection from "./components/VladivostokSection";
import FefuSection from "./components/FefuSection";
import InteractiveSection from "./components/InteractiveSection";
import Footer from "./components/Footer";
import Gall from "./components/gallery_web/Gall";

export default function App() {
  return (
    <>
      <RegistrationSection />
      <CompetitionFormatSection />
      <VladivostokSection />
      <FefuSection />
      <InteractiveSection />
      <Footer />
    </>
  );
}
