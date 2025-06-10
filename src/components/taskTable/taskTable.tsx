'use client';

import {Button, DatePicker, Input, Select, Tag} from 'antd';
import React, {useMemo, useState} from 'react';
import styles from './taskTable.module.css';
import DesktopTaskList from "./desktopTaskList";
import {useIsMobile} from '../../hooks/useIsMobile';
import MobileTaskList from "./mobileTaskList";
import {ColumnsType} from "antd/es/table";
import {tableInterfaceProps, Task} from "../../types/type";
import CreateTaskModal from "./createTaskModal";
import TaskFilter from "./taskFilter";
import { useDispatch } from 'react-redux';
import {addTask,updateTask,deleteTask} from '../../store/tasksSlice';


const {Search} = Input;


const TaskTable: React.FC<tableInterfaceProps> = ({ tasks, loading, setTasks }) => {
    const [searchText, setSearchText] = useState('');
    const [pageSize, setPageSize] = useState(5);
    const [modalOpen, setModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        assignee: undefined,
        status: undefined,
        priority: undefined,
        dateRange: [],
    });
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const isMobile = useIsMobile();
    const dispatch = useDispatch();


    const filteredValues = useMemo(() => {
        const searchValue = searchText.toLowerCase();
        return tasks.filter((task) => {
            const matchesValue =
                task.title.toLowerCase().includes(searchValue) ||
                task.description.toLowerCase().includes(searchValue);

            const assignee = filters.assignee ? task.assignee === filters.assignee : true;
            const status = filters.status ? task.status === filters.status : true;
            const priority = filters.priority ? task.priority === filters.priority : true;

            const dateRange =
                filters.dateRange && filters.dateRange.length === 2
                    ? new Date(task.startDate) >= filters.dateRange[0].toDate() &&
                    new Date(task.dueDate) <= filters.dateRange[1].toDate()
                    : true;

            return (
                matchesValue &&
                assignee &&
                status &&
                priority &&
                dateRange
            );
        });
    }, [tasks, searchText,filters]);

    const handleCreateTask = (task: Task) => {
        const newTasks = [...tasks, task];
        setTasks([...newTasks]);
        dispatch(addTask(task));
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    const handleFilterChange = (key, value) => {
        const updatedFilters = { ...filters, [key]: value };
        setFilters(updatedFilters);
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setModalOpen(true);
    };

    const handleEditTask = (updatedTask: Task) => {
        const updatedTasks = tasks.map(t => {
            if(t.id===updatedTask.id){
                return updatedTask;

            }
            return t;
        });
        setTasks(updatedTasks);
        dispatch(updateTask(updatedTask));
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const handleDelete = (id: string) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        if(updatedTasks.length===0){
            localStorage.removeItem('tasks');

        }else{
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        }
        dispatch(deleteTask(id));

    };


    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
                <Search
                    placeholder="Search by title or description"
                    allowClear
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{width: 300, marginBottom: 16}}
                />
                    <Button type="primary" onClick={() => setModalOpen(true)}>
                    Create Task
                </Button>

                <CreateTaskModal
                    open={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                        setEditingTask(null);
                    }}
                    onCreate={handleCreateTask}
                    onEdit={handleEditTask}
                    taskToEdit={editingTask}
                />
            </div>

            <TaskFilter filters={filters} pageSize={pageSize} setPageSize={setPageSize} handleFilterChange={handleFilterChange}/>

            {isMobile ? <MobileTaskList tasks={filteredValues} pageSize={pageSize} loading={loading} onEdit={handleEdit} onDelete={handleDelete}/> :
                <DesktopTaskList tasks={filteredValues} pageSize={pageSize} loading={loading} onEdit={handleEdit} onDelete={handleDelete}/>}
        </div>
    );
};

export default TaskTable;