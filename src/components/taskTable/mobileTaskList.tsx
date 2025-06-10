'use client';

import React, {useState} from 'react';
import {Button, Card, Pagination, Tag} from 'antd';
import { Task } from '../../types/type';
import {mobileListInterfaceProps} from "../../types/type";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';



const MobileTaskList: React.FC = (props: mobileListInterfaceProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { tasks,pageSize,onEdit,onDelete }=props;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedTasks = tasks.slice(startIndex, endIndex);

    return (
        <div style={{ marginTop: 16 }}>
            {tasks.length> 0 ? tasks.map((task) => (
                <Card key={task.id} title={task.title} style={{ marginBottom: 16 }} extra={
                    <>
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => onEdit(task)}
                            style={{ marginRight: 8 }}
                        />
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => onDelete(task.id)}
                        />
                    </>
                }>
                    <p><strong>Description:</strong> {task.description}</p>
                    <p><strong>Assignee:</strong> {task.assignee}</p>
                    <p><strong>Dates:</strong> {task.startDate} → {task.dueDate}</p>
                    <p><strong>Priority:</strong> <Tag color={task.priority === 'HIGH' ? 'red' : task.priority === 'MEDIUM' ? 'orange' : 'green'}>{task.priority}</Tag></p>
                    <p><strong>Status:</strong> <Tag color={task.status === 'COMPLETED' ? 'green' : task.status === 'IN_PROGRESS' ? 'blue' : 'gold'}>{task.status.replace('_', ' ')}</Tag></p>
                </Card>
            )) : <h3 style={{textAlign:'center'}}>No Data Found</h3>}
            {tasks.length> 0 && tasks.length > pageSize && (
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={tasks.length}
                    onChange={(page) => setCurrentPage(page)}
                    style={{ textAlign: 'center', marginTop: 24 }}
                />
            )}
        </div>
    );
};

export default MobileTaskList;