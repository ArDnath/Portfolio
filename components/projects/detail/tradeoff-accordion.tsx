"use client"

import type { ProjectDecision } from "@/data/projects"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface TradeoffAccordionProps {
  decisions: ProjectDecision[]
}

export function TradeoffAccordion({ decisions }: TradeoffAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <ul className="flex-1 min-h-0 overflow-y-auto no-scrollbar divide-y divide-dashed divide-gray-300 dark:divide-gray-700">
      {decisions.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="w-full flex items-start justify-between gap-2 px-3 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-[11px] font-bold text-black dark:text-white tracking-wide leading-snug">
                {item.title}
              </span>
              <ChevronDown
                size={14}
                strokeWidth={2}
                className={`flex-shrink-0 mt-0.5 text-gray-400 dark:text-gray-600 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <dl className="px-3 pb-2.5 pt-0 space-y-1.5 border-t border-dashed border-gray-300 dark:border-gray-700">
                  <div>
                    <dt className="text-[8px] tracking-[.14em] uppercase text-gray-400 dark:text-gray-600 mb-0.5">
                      Chose
                    </dt>
                    <dd className="text-[10px] text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.chose}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[8px] tracking-[.14em] uppercase text-gray-400 dark:text-gray-600 mb-0.5">
                      Gave up
                    </dt>
                    <dd className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">
                      {item.sacrificed}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[8px] tracking-[.14em] uppercase text-gray-400 dark:text-gray-600 mb-0.5">
                      Why
                    </dt>
                    <dd className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">
                      {item.rationale}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
