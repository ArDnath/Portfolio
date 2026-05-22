import Image from "next/image"
import ThemeToggle from "@/components/theme-toggle"

export default function HeroSection() {
    return (
        <div className="flex flex-col-reverse sm:flex-row p-4 justify-between items-start gap-6 border-b border-dashed border-gray-400">
            <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-3">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-none tracking-tight">
                        Ariyaman Debnath
                    </h1>
                    <ThemeToggle/>
                </div>
                <ul className="mt-4 space-y-2 text-sm sm:text-base text-gray-400">
                    <li className="list-disc list-inside">Future‑ready full‑stack engineer </li>
                    <li className="list-disc list-inside">
                        I <span className="font-bold text-green-300">learn fast</span>, <span className="font-bold underline decoration-green-200">ship fast</span>, and treat every codebase <span className="font-bold text-blue-300 underline decoration-yellow-200">like it&apos;s production</span>
                    </li>
                    <li className="list-disc list-inside">AI‑Native Builder obsessed with shipping reliable software</li>
                </ul>
            </div>
            <div className="flex-shrink-0 self-center sm:self-start">
                <Image
                    src="/Me.png"
                    alt="Ariyaman Debnath"
                    width={200}
                    height={200}
                    priority
                    className="w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 object-cover rounded-lg border border-dashed border-gray-500 p-1"
                />
            </div>
        </div>
    )
}