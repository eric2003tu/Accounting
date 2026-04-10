"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const backgroundImages = ['/images/bg1.jpg', '/images/bg2.jpg', '/images/bg3.jpg'];

const heroHighlights = [
    {
        title: 'Unified Financial Control',
        text: 'Manage bookkeeping, invoicing, reconciliation, and reporting from one clear workspace your whole team can trust.',
    },
    {
        title: 'Decision-Ready Reporting',
        text: 'See real-time cash flow, margin trends, and performance snapshots so you can make faster and smarter business moves.',
    },
    {
        title: 'Built For Growing Teams',
        text: 'Scale operations with role-based access, process automation, and workflows designed to reduce manual finance work.',
    },
];

const Hero = () => {
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveImage((currentImage) => (currentImage + 1) % backgroundImages.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='relative w-full min-h-screen overflow-hidden'>
            {/* Background Images */}
            <div className='absolute inset-0'>
                {backgroundImages.map((image, index) => (
                    <div
                        key={image}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            index === activeImage ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <Image
                            src={image}
                            alt='Hero background'
                            fill
                            className='object-cover'
                            priority={index === 0}
                        />
                    </div>
                ))}
                <div className='absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950/80' />
            </div>

            {/* Content - FULL WIDTH */}
            <div className='relative z-10 w-full min-h-screen flex items-center'>
                <div className='w-full max-w-7xl self-center mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10'>
                        <div className='max-w-4xl mx-auto text-center lg:text-left lg:mx-0'>
                        {/* Badge */}
                        <div className='flex justify-center lg:justify-start'>
                            <span className='inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium tracking-wide text-white/90 backdrop-blur-md shadow-lg'>
                                Accounting platform for growing businesses
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className='mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl'>
                            Run your finances from one clear,{' '}
                            <span className='bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent'>
                                modern dashboard
                            </span>
                        </h1>

                        {/* Description */}
                        <p className='mt-6 text-base leading-relaxed text-slate-100 sm:text-lg md:text-xl max-w-3xl mx-auto lg:mx-0'>
                            Keep bookkeeping, invoicing, reporting, and cash flow under control with a 
                            faster workflow built for founders, finance teams, and small businesses that 
                            need visibility without the clutter.
                        </p>

                        {/* Buttons */}
                        <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                            <button className='cursor-pointer rounded-lg bg-green-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-green-700 hover:to-emerald-700'>
                            Start Free Trial
                            </button>
                            <button className='cursor-pointer rounded-lg border border-white/30 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:scale-105'>
                            Explore Features
                            </button>
                        </div>

                        </div>

                        <div className='mt-2 grid gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-1'>
                            {heroHighlights.map((item) => (
                                <article
                                    key={item.title}
                                    className='rounded-2xl border border-white/20 bg-white/10 p-5 text-left backdrop-blur-md transition-all duration-300 hover:bg-white/15'
                                >
                                    <h3 className='text-base font-semibold text-white'>{item.title}</h3>
                                    <p className='mt-2 text-sm leading-6 text-slate-200'>{item.text}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;