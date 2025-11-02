import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectSection from "@/components/ProjectSection";


export default function Home() {
  

  return (
    <div className="flex flex-col mt-8 max-w-[512px] mx-auto p-5 lg:p-0">
      <HeroSection/>
      <ProjectSection/>
    </div>
  );
}
