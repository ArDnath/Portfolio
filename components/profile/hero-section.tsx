import Image from "next/image"
export default function HeroSection() {
  return (
    <div className="flex pl-4 pt-4 justify-between border-b border-dashed">
        <div>
            <h1 className="text-4xl font-black leading-tight pb-8">Ariyaman Debnath</h1>
            <ul>
                <li>Future‑ready full‑stack engineer </li>
                <li>I <span className="font-bold text-green-300">learn fast</span>, <span className="font-bold underline decoration-green-200">ship fast</span>, and treat every codebase <span className="font-bold text-blue-300 underline decoration-yellow-200">like it’s production</span></li>
                <li> AI‑Native Builder obsessed with shipping reliable software</li>
            </ul>
        </div>
        <Image
            src="/Me.png"
            alt="Ariyaman Debnath"
            width={200}
            height={200}
            className=""
        />
    </div>
  )
}