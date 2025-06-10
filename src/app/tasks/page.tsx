'use client';
import React, {useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import {Task} from "../../types/type";
import {useDispatch} from "react-redux";
import {setAllTasks} from "../../store/tasksSlice";
import {fetchTasks} from "../../utils/mockApi";
const TaskTable = dynamic(() => import('../../components/taskTable/taskTable'), { ssr: false });

const TasksPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();


    useEffect(() => {
        const stored = localStorage.getItem('tasks');
        if (stored) {
            setTasks(JSON.parse(stored));
            dispatch(setAllTasks(JSON.parse(stored)));
            setLoading(false);
        }else{
            fetchTasks().then((data: Task[]) => {
                setTasks(data);
                dispatch(setAllTasks(data));
                setLoading(false);
            });
        }
    }, []);
    return (
        <>
            <TaskTable tasks={tasks} loading={loading} setTasks={setTasks}/>
        </>
    );
};

export default TasksPage;