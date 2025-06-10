'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import {Button, Card, Col, Row} from 'antd';
import styles from './dashboardSummary.module.css';
import { useRouter } from 'next/navigation';
import {Task} from "../../types/type";

const DashboardSummary = () => {
    const tasks = useSelector((state:any) => state.tasks.tasks);
    const router = useRouter();

    const totalTasks = tasks.length;

    const statusCounts = {
        TO_DO: 0,
        IN_PROGRESS: 0,
        COMPLETED: 0,
    };

    const priorityCounts = {
        HIGH: 0,
        MEDIUM: 0,
        LOW: 0,
    };

    tasks.forEach((task: Task) => {
        statusCounts[task.status]++;
        priorityCounts[task.priority]++;
    });

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardContainerAction}>
            <Button type="primary" onClick={() => router.push('/tasks')}>
                Go to Task Table
            </Button>
            </div>
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} md={8}>
                <Card title="Total Tasks" variant="outlined">
                    <h2>{totalTasks}</h2>
                </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
                <Card title="Status Count" variant="outlined">
                    <p>To Do: {statusCounts.TO_DO}</p>
                    <p>In Progress: {statusCounts.IN_PROGRESS}</p>
                    <p>Completed: {statusCounts.COMPLETED}</p>
                </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
                <Card title="Priority Count" variant="outlined">
                    <p>High: {priorityCounts.HIGH}</p>
                    <p>Medium: {priorityCounts.MEDIUM}</p>
                    <p>Low: {priorityCounts.LOW}</p>
                </Card>
            </Col>
        </Row>
        </div>
    );
};

export default DashboardSummary;