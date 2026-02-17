import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import BaseButton from '../components/BaseButton';
import SectionFullScreen from '../components/SectionFullScreen';
import LayoutGuest from '../layouts/Guest';
import { getPageTitle } from '../config';
import { useAppSelector } from '../stores/hooks';
import { mdiMovieOpenStar, mdiPlay } from '@mdi/js';
import BaseIcon from '../components/BaseIcon';

export default function Starter() {
    const textColor = useAppSelector((state) => state.style.linkColor);
    const title = 'Entertainment Tracker CRM';

    return (
        <div className="bg-[#0f172a] min-h-screen text-white overflow-hidden">
            <Head>
                <title>{getPageTitle('Home')}</title>
            </Head>

            <SectionFullScreen bg="none">
                <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-6">
                    {/* Cinematic Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-[#0f172a] to-purple-900/20 z-0"></div>
                    
                    {/* Hero Content */}
                    <div className="z-10 text-center space-y-8 max-w-4xl">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                            <BaseIcon path={mdiMovieOpenStar} size={18} />
                            <span>Ultimate Marvel & Star Wars Tracker</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                            Track Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Cinematic Journey</span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                            The all-in-one CRM for franchise fans. Organize movies, track series progress, and never miss what&apos;s next in the galaxy.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <BaseButton
                                href="/login"
                                label="Enter Dashboard"
                                color="info"
                                icon={mdiPlay}
                                className="w-full sm:w-auto px-8 py-3 text-lg rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
                            />
                            <BaseButton
                                href="/register"
                                label="Get Started Free"
                                color="whiteDark"
                                className="w-full sm:w-auto px-8 py-3 text-lg rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-all"
                            />
                        </div>

                        {/* Feature Badges */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-16 border-t border-slate-800/50">
                            {[
                                { label: 'Franchise Tracking', desc: 'Marvel, Star Wars & more' },
                                { label: 'Series Progress', desc: 'Episode-by-episode' },
                                { label: 'Watchlist', desc: 'Next Up queue' },
                                { label: 'Statistics', desc: 'Your viewing habits' }
                            ].map((feature, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-blue-400 font-bold mb-1">{feature.label}</div>
                                    <div className="text-xs text-slate-500">{feature.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SectionFullScreen>

            <footer className="relative z-10 border-t border-slate-800 bg-[#0f172a]/80 backdrop-blur-sm py-8 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">© 2026 <span className="text-slate-300 font-semibold">{title}</span>. All rights reserved.</p>
                    <div className="flex items-center space-x-6">
                        <Link href="/privacy-policy" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms-of-use" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

Starter.getLayout = function getLayout(page: ReactElement) {
    return <LayoutGuest>{page}</LayoutGuest>;
};
