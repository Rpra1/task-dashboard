import { dummyTasks } from '../data/dummyTask';
import {Task} from "../types/type";

export const fetchTasks = (): Promise<Task[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dummyTasks);
        }, 1000); // Simulate 1 second network delay
    });
};