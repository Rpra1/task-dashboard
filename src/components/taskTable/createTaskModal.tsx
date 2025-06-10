'use client';
import { Button, Form, Input, Modal, Select, DatePicker } from 'antd';
import React, {useEffect, useState} from 'react';
// import dayjs from 'dayjs';
import {modalInterfaceProps, Task} from "../../types/type";
import dayjs from "dayjs";

const { TextArea } = Input;

const members = ['Alice', 'Bob', 'Charlie', 'David'];


const CreateTaskModal: React.FC<modalInterfaceProps> = ({open, onClose, onCreate,onEdit,taskToEdit}) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then((values: Task) => {
            const formattedTask: Task = {
                ...values,
                startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
                dueDate: dayjs(values.dueDate).format('YYYY-MM-DD'),
                id: taskToEdit?.id ?? Date.now().toString()
            };

            if (taskToEdit) {
                onEdit?.(formattedTask);
            } else {
                onCreate(formattedTask);
            }

            form.resetFields();
            onClose();
        }).catch((e) => {
            console.log(e);
        });
    };

    useEffect(() => {
        if (taskToEdit) {
            form.setFieldsValue({
                ...taskToEdit,
                startDate: dayjs(taskToEdit.startDate),
                dueDate: dayjs(taskToEdit.dueDate)
            });
        } else {
            form.resetFields();
        }
    }, [taskToEdit, form]);



    return (
        <>
            <Modal
                title={taskToEdit ? "Edit Task" : "Create New Task"}
                open={open}
                onOk={handleSubmit}
                onCancel={() => {
                    form.resetFields();
                    onClose();
                }}
                okText={taskToEdit ? "Update" : "Create"}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item name="assignee" label="Assignee" rules={[{ required: true }]}>
                        <Select>
                            {members.map((member) => (
                                <Select.Option key={member} value={member}>
                                    {member}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value="LOW">Low</Select.Option>
                            <Select.Option value="MEDIUM">Medium</Select.Option>
                            <Select.Option value="HIGH">High</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value="TO_DO">To Do</Select.Option>
                            <Select.Option value="IN_PROGRESS">In Progress</Select.Option>
                            <Select.Option value="COMPLETED">Completed</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateTaskModal;