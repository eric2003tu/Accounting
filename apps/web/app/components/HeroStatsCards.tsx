'use client';

import React, { useEffect, useState } from 'react';

type HeroStat = {
    label: string;
    targetValue: number;
    suffix?: string;
};

type HeroStatsCardsProps = {
    stats?: HeroStat[];
    variant?: 'dark' | 'light';
    className?: string;
};

const HeroStatsCards = ({ stats, variant = 'dark', className = '' }: HeroStatsCardsProps) => {
    const defaultStats: HeroStat[] = [
        { label: 'PARTNERS', targetValue: 1340, suffix: '+' },
        { label: 'SUBSCRIBERS', targetValue: 8420, suffix: '+' },
        { label: 'ACTIVE USERS', targetValue: 24500, suffix: '+' },
        { label: "Countries Served", targetValue: 120, suffix: "+" }
    ];

    const displayStats = stats || defaultStats;
    const [counters, setCounters] = useState<number[]>(displayStats.map(() => 0));

    // CONTINUOUS INCREASE - resets and grows again!
    useEffect(() => {
        let startTime = 0;
        let animationFrame: number;
        
        const animateIncrease = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const duration = 3000; // 3 seconds to reach target
            const pauseDuration = 1000; // 1 second pause at top
            
            // Calculate cycle progress (0 to 1 over duration + pause)
            const cycleProgress = (elapsed % (duration + pauseDuration)) / (duration + pauseDuration);
            
            if (cycleProgress < duration / (duration + pauseDuration)) {
                // INCREASING PHASE - numbers go UP
                const progress = cycleProgress / (duration / (duration + pauseDuration));
                const eased = 1 - Math.pow(1 - progress, 3); // Cubic ease out
                
                const newCounters = displayStats.map(stat => {
                    return Math.floor(stat.targetValue * eased);
                });
                setCounters(newCounters);
            } else if (cycleProgress >= duration / (duration + pauseDuration)) {
                // PAUSE AT MAXIMUM
                const newCounters = displayStats.map(stat => stat.targetValue);
                setCounters(newCounters);
            }
            
            animationFrame = requestAnimationFrame(animateIncrease);
        };
        
        animationFrame = requestAnimationFrame(animateIncrease);
        
        return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [displayStats]);

    const formatNumber = (num: number): string => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const containerClass =
        variant === 'light'
            ? 'grid gap-6 grid-cols-2 lg:grid-cols-4'
            : 'grid gap-6 grid-cols-2 lg:grid-cols-4';

    const cardClass =
        variant === 'light'
            ? 'group relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-4 text-left shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.12)]'
            : 'group relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 px-6 py-4 text-left backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-white/40';

    const valueClass = variant === 'light' ? 'text-4xl font-bold text-slate-900 tabular-nums' : 'text-4xl font-bold text-white tabular-nums';
    const suffixClass = variant === 'light' ? 'text-2xl font-bold text-green-600' : 'text-2xl font-bold text-emerald-400';
    const labelClass =
        variant === 'light'
            ? 'mt-2 text-xs uppercase tracking-[0.2em] text-slate-500'
            : 'mt-2 text-sm uppercase tracking-[0.2em] text-slate-200/80';

    return (
        <div className={`${containerClass} w-full ${className}`}>
            {displayStats.map((stat, index) => (
                <div 
                    key={stat.label} 
                    className={cardClass}
                >
                    <div className='relative z-10'>
                        <div className='flex items-baseline gap-1'>
                            <div className={valueClass}>
                                {formatNumber(counters[index])}
                            </div>
                            {stat.suffix && (
                                <span className={suffixClass}>
                                    {stat.suffix}
                                </span>
                            )}
                        </div>
                        
                        <div className={labelClass}>
                            {stat.label}
                        </div>
                    </div>
                    
                </div>
            ))}
        </div>
    );
};

export default HeroStatsCards;