'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cleaningTasks, type CleaningArea } from '@/lib/constants/cleaning-tasks';
import { ADDONS } from '@/lib/constants/addons';
import { TYPOGRAPHY } from '@/styles/typography';
import { INLINE_STYLES } from '@/styles/colors';

const areas: CleaningArea[] = ['Bedrooms', 'Bathrooms', 'Common Areas', 'Kitchen'];

export default function WhatWeCleanSection() {
  const [activeTab, setActiveTab] = useState<CleaningArea>('Bedrooms');

  return (
    <section id="what-we-clean" className="py-20" style={INLINE_STYLES.primary}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={TYPOGRAPHY.sectionTitle}>
            Cleaning Checklist
          </h2>
          <p className={`${TYPOGRAPHY.description} max-w-3xl mx-auto`}>
            See what's included in every cleaning
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="inline-flex border-b border-primary-button-bg">
            {areas.map((area) => (
              <button
                key={area}
                className={`px-2 md:px-4 py-2 text-sm md:text-base font-semibold ${
                  activeTab === area
                    ? 'text-white border-b-2 border-primary-button-bg'
                    : 'text-white/60 hover:text-white/80'
                }`}
                onClick={() => setActiveTab(area)}
              >
                {area}  
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto overflow-x-auto bg-[rgba(22,48,75,0.95)] backdrop-blur-md rounded-lg shadow-xl mb-20">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 sm:p-3 bg-[rgba(22,48,75,0.98)] border border-white/10 text-white w-2/5 text-left text-[11px] sm:text-sm">Cleaning Tasks</th>
                <th className="p-2 sm:p-3 bg-[rgba(22,48,75,0.98)] border border-white/10 text-white text-center text-[11px] sm:text-sm">Standard</th>
                <th className="p-2 sm:p-3 bg-[rgba(22,48,75,0.98)] border border-white/10 text-white text-center text-[11px] sm:text-sm">Deep</th>
                <th className="p-2 sm:p-3 bg-[rgba(22,48,75,0.98)] border border-white/10 text-white text-center text-[11px] sm:text-sm">Move-In</th>
              </tr>
            </thead>
            <tbody>
              {cleaningTasks[activeTab].map((task, index) => (
                <tr key={index} className={index % 2 === 0 
                  ? 'bg-white/[0.03]' 
                  : 'bg-white/[0.06]'
                }>
                  <td className="p-2 sm:p-3 border border-white/10 text-white text-[11px] sm:text-sm">{task.task}</td>
                  <td className="p-2 sm:p-3 border border-white/10 text-center">
                    {task.routine ? <span className="text-[#dfbd69] text-base sm:text-lg">✓</span> : <span className="text-white/30 text-base sm:text-lg">✗</span>}
                  </td>
                  <td className="p-2 sm:p-3 border border-white/10 text-center">
                    {task.deep ? <span className="text-[#dfbd69] text-base sm:text-lg">✓</span> : <span className="text-white/30 text-base sm:text-lg">✗</span>}
                  </td>
                  <td className="p-2 sm:p-3 border border-white/10 text-center">
                    {task.moveInOut === true ? <span className="text-[#dfbd69] text-base sm:text-lg">✓</span> : 
                     task.moveInOut === false ? <span className="text-white/30 text-base sm:text-lg">✗</span> : 
                     <span className="text-white/60 text-[11px] sm:text-sm">N/A</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="max-w-5xl mx-auto mb-24">
          <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-4 text-center">
            Add-ons
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {ADDONS.map(({ key, label, description, icon }) => (
              <div 
                key={key}
                                  className="relative group bg-white/[0.06] backdrop-blur-md rounded-lg p-4 hover:bg-white/[0.09] transition-all text-center border border-white/10"
              >

                <div className="w-12 h-12 mx-auto mb-3">
                  <Image
                    src={`/icons/addons/${icon}`}
                    alt={label}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">{label}</h4>
                <p className="text-xs text-white/80">{description}</p>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}