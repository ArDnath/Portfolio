import HeroSection from '@/components/profile/hero-section';
import { ProjectsSection } from '../projects/project-section';
import { projects as projectConfigs } from "@/lib/projects";
import { getProjectData } from "@/lib/getProjectData";

export default async function LeftGrid() {
    const projectDataPromises = projectConfigs.map(config => getProjectData(config));
    const projectsData = await Promise.all(projectDataPromises);

    return (
        <div className="flex flex-col">
            <HeroSection />
            <div className="text-3xl border-b border-dashed border-gray-500 py-1 px-4">
                Deployed Projects
            </div>
            <div className='mt-4 px-4'>
                <ProjectsSection projects={projectsData} />
            </div>
            
        </div>
    )
}
