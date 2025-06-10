import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/type';

interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: [],
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setAllTasks(state, action: PayloadAction<Task[]>) {
            state.tasks = action.payload;
        },
        addTask(state, action: PayloadAction<Task>) {
            state.tasks.push(action.payload);
        },
        updateTask(state, action: PayloadAction<Task>) {
            const index = state.tasks.findIndex(t => t.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        deleteTask(state, action: PayloadAction<string>) {
            state.tasks = state.tasks.filter(t => t.id !== action.payload);
        },
    },
});

export const { setAllTasks, addTask, updateTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;