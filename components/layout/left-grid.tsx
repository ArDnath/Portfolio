import HeroSection from '@/components/profile/hero-section';
import { ProjectsSection } from "@/components/projects"

export default function LeftGrid() {
    return (
        <div className="flex flex-col">
            <HeroSection />
            <div className="text-3xl border-b border-dashed border-gray-300 dark:border-gray-700 py-1 px-4">
                Deployed Projects
            </div>
            <div className='mt-4 px-4'>
                <ProjectsSection />
            </div>
        </div>
    )
}
