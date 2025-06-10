'use client';
import dynamic from 'next/dynamic';
import React, {useEffect} from "react";
import {setAllTasks} from "../store/tasksSlice";
import {fetchTasks} from "../utils/mockApi";
import {Task} from "../types/type";

const DashboardSummary = dynamic(() => import('../components/dashboardSummary/dashboardSummary'), { ssr: false });


export default function Home() {
    return (
        <main>
            <DashboardSummary />
        </main>
    );
}