import React from 'react';

type WhatYouGetCardProps = {
    highlights: string[];
};

const WhatYouGetCard = ({ highlights }: WhatYouGetCardProps) => {
    return (
        <div className='rounded-3xl border border-white/15 bg-slate-950/35 p-6 text-left text-white shadow-2xl backdrop-blur-md sm:p-8'>
            <div className='flex items-center justify-between border-b border-white/10 pb-4'>
                <div>
                    <p className='text-sm uppercase tracking-[0.24em] text-slate-300'>What you get</p>
                    <h2 className='mt-2 text-2xl font-semibold'>Everything finance teams need</h2>
                </div>
                <span className='rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-300'>Live</span>
            </div>

            <div className='mt-6 space-y-4'>
                {highlights.map((item) => (
                    <div key={item} className='flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4'>
                        <div className='mt-1 h-2.5 w-2.5 rounded-full bg-green-400' />
                        <p className='text-sm leading-6 text-slate-100'>{item}</p>
                    </div>
                ))}
            </div>

            <div className='mt-6 rounded-2xl bg-black/20 p-5'>
                <p className='text-sm uppercase tracking-[0.2em] text-slate-300'>Focus</p>
                <p className='mt-2 text-base leading-7 text-slate-100'>
                    A better accounting experience starts with clear data, fast decisions, and a hero that immediately explains the value of your product.
                </p>
            </div>
        </div>
    );
};

export default WhatYouGetCard;