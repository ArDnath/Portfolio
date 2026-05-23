import LeftGrid from "@/components/layout/left-grid";
import RightGrid from "@/components/layout/right-grid";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] min-h-screen lg:h-screen lg:overflow-hidden gap-4 bg-background text-foreground transition-colors duration-150">
      <div className="lg:border-r border-dashed border-gray-400 dark:border-gray-800 lg:h-full lg:overflow-y-auto no-scrollbar">
        <LeftGrid />
      </div>
      <div className="hidden lg:block lg:h-full lg:overflow-hidden no-scrollbar">
        <RightGrid />
      </div>
    </div>
  );
}
