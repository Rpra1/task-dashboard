export type TaskStatus = 'TO_DO' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
    id: string;
    title: string;
    description: string;
    assignee: string;
    startDate: string;
    dueDate: string;
    priority: TaskPriority;
    status: TaskStatus;
}

export interface modalInterfaceProps {
    open: boolean;
    onClose: () => void;
    onCreate: (task: Task) => void;
    onEdit?: (task: Task) => void;
    taskToEdit?: Task;
}

export interface tableInterfaceProps{
    tasks: Task[];
    loading: boolean;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    pageSize?: number;
    onEdit?: (task: Task) => void;
    onDelete?: (id: string) => void;
}

export interface mobileListInterfaceProps{
    tasks:Task[];
    pageSize: number;
    loading: boolean;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

export interface taskFilterInterface {
    assignee: string;
    status: string;
    priority: string;
    dateRange: [];
}

export interface taskFilterInterfaceProps{
    filters:taskFilterInterface[];
    pageSize: number;
    setPageSize: (value)=>void;
    handleFilterChange:(filterName,filterValue)=>void;
}
