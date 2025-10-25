import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectSection from "@/components/ProjectSection";
export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      <HeroSection/>
      <ProjectSection/>
    </div>
  );
}
