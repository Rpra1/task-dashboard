'use client';
import dynamic from 'next/dynamic';
import React from "react";

const DashboardSummary = dynamic(() => import('../components/dashboardSummary/dashboardSummary'), { ssr: false });


export default function Home() {
    return (
        <main>
            <DashboardSummary />
        </main>
    );
}