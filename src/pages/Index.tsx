import { Hero } from "@/components/portfolio/Hero.tsx";
import { ReelSequence } from "@/components/portfolio/ReelSequence.tsx";
import { Manifesto } from "@/components/portfolio/Manifesto.tsx";
import { Works } from "@/components/portfolio/Works.tsx";
import { About } from "@/components/portfolio/About.tsx";
import { Advantages } from "@/components/portfolio/Advantages.tsx";
import { Contact } from "@/components/portfolio/Contact.tsx";

const Index = () => {
  return (
    <main className="bg-[#06091d] text-white">
      <Hero />
      <ReelSequence />
      <Manifesto />
      <Works />
      <About />
      <Advantages />
      <Contact />
    </main>
  );
};

export default Index;
