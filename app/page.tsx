import LeftGrid from "@/components/layout/left-grid";
import RightGrid from "@/components/layout/right-grid";


export default function Home() {
  return (
    <div className="grid grid-cols-[1fr_2fr] min-h-screen gap-4">
      <div className="border-r border-dashed border-gray-400">
        <LeftGrid />
      </div>
      <div>
        <RightGrid />
      </div>
    </div>
  );
}
