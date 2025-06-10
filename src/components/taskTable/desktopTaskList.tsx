import styles from "./taskTable.module.css";
import {Button, Table, Tag} from "antd";
import React from "react";
import {ColumnsType} from "antd/es/table";
import {tableInterfaceProps, Task} from "../../types/type";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const priorityOrder = { LOW: 1, MEDIUM: 2, HIGH: 3 }

const DesktopTaskList: React.FC<tableInterfaceProps> = ({tasks,setTasks,loading,pageSize,onEdit,onDelete}) => {
    const columns: ColumnsType<Task> = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Assignee',
            dataIndex: 'assignee',
            key: 'assignee',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            sorter: (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            sorter: (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            render: (priority: Task['priority']) => {
                const color = priority === 'HIGH' ? 'red' : priority === 'MEDIUM' ? 'orange' : 'green';
                return <Tag color={color}>{priority}</Tag>;
            },
            sorter: (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: Task['status']) => {
                const color = status === 'COMPLETED' ? 'green' : status === 'IN_PROGRESS' ? 'blue' : 'gold';
                return <Tag color={color}>{status.replace('_', ' ')}</Tag>;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => onEdit?.(record)}
                        style={{ marginRight: 8 }}
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => onDelete?.(record.id)}
                    />
                    </>
            ),
        }
    ];
    return (
        <>
            <h2 className={styles.tableTitle}>Tasks</h2>
            <Table
                columns={columns}
                loading={loading}
                dataSource={tasks}
                pagination={{ pageSize }}
                scroll={{ x: 'max-content' }}
                rowClassName={(_, index) => (index % 2 === 0 ? styles.evenRow : styles.oddRow)}
                rowKey="id"
            />
        </>
    );
};

export default DesktopTaskList;