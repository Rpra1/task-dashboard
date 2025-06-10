import styles from "./taskTable.module.css";
import {DatePicker, Input, Select} from "antd";
import React from "react";
import {taskFilterInterfaceProps} from "../../types/type";
const {Search} = Input;
const {Option} = Select;
const { RangePicker } = DatePicker;

const TaskFilter = (props:taskFilterInterfaceProps) =>{
    const {filters,pageSize,setPageSize,handleFilterChange}=props;

    return (
        <div className={styles.tableFilter}>
            <div className={styles.tableFilterItems}>
            <Select
                defaultValue={5}
                onChange={(value) => setPageSize(value)}
                style={{width: 120, marginLeft: 16}}
            >
                <Option value={5}>5 / page</Option>
                <Option value={10}>10 / page</Option>
            </Select>

            <Select
                allowClear
                placeholder="Assignee"
                style={{ width: '100%' }}
                value={filters.assignee}
                onChange={(value) => handleFilterChange('assignee', value)}
            >
                <Option value="John">John</Option>
                <Option value="Jane">Jane</Option>
                <Option value="Alice">Alice</Option>
            </Select>

            <Select
                allowClear
                placeholder="Status"
                style={{ width: '100%' }}
                value={filters.status}
                onChange={(value) => handleFilterChange('status', value)}
            >
                <Option value="TO_DO">To Do</Option>
                <Option value="IN_PROGRESS">In Progress</Option>
                <Option value="COMPLETED">Completed</Option>
            </Select>

            <Select
                allowClear
                placeholder="Priority"
                style={{ width: '100%' }}
                value={filters.priority}
                onChange={(value) => handleFilterChange('priority', value)}
            >
                <Option value="LOW">Low</Option>
                <Option value="MEDIUM">Medium</Option>
                <Option value="HIGH">High</Option>
            </Select>

            <RangePicker
                value={filters.dateRange}
                onChange={(dates) => handleFilterChange('dateRange', dates)}
                style={{ width: '100%' }}
            />
            </div>
        </div>

        )



}
export default TaskFilter;