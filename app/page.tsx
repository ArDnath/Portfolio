import LeftGrid from "@/components/layout/left-grid";
import RightGridLazy from "@/components/layout/right-grid-lazy";

export default function Home() {
  return (
    <div id="main" className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] min-h-[calc(100vh-2rem)] lg:h-[calc(100vh-2rem)] lg:overflow-hidden gap-4 bg-background text-foreground transition-colors duration-150 pb-8 lg:pb-0">
      <div className="lg:border-r border-dashed border-gray-400 dark:border-gray-800 lg:h-full lg:overflow-y-auto no-scrollbar">
        <LeftGrid />
      </div>
      <div className="hidden lg:block lg:h-full lg:overflow-hidden no-scrollbar">
        <RightGridLazy />
      </div>
    </div>
  );
}
