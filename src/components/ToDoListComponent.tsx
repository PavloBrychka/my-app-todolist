import React, { useEffect, useState } from 'react';
import { fetchData } from '../http/http.ts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Task } from './types';

const ToDoListComponent = () => {
    const [data, setData] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');
    useEffect(() => {
        fetchDataFromApi();
    }, []);

    const fetchDataFromApi = async () => {
        try {
            const result: Task[] = await fetchData('/todo/all');
            setData(result);
        } catch (error) {
            // Обробка помилки, якщо потрібно
        }
    };

    const handleAddTask = async () => {
        try {
            // Викликати функцію для додавання завдання на бекенді
            const response = await fetch('http://localhost:8080/todo/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: newTask }),
            });
    
            if (response.ok) {
                console.log('Task added successfully!');
                // Після додавання оновити список завдань
                fetchDataFromApi();
                // Очистити поле введення після успішного додавання
                setNewTask('');
            } else {
                console.error('Failed to add task:', response.statusText);
                // Обробка помилки, якщо потрібно
            }
        } catch (error) {
            console.error('Error while adding task:', error);
            // Обробка помилки, якщо потрібно
        }
    };
    
    
    const handleUpdateTask = async (taskId: number, updatedTask: string) => {
        try {
            // Викликати функцію для оновлення завдання на бекенді
            // Тут вам слід визначити логіку оновлення завдання
            console.log('Updating task:', taskId, updatedTask);

            // Після оновлення оновити список завдань
            fetchDataFromApi();
        } catch (error) {
            // Обробка помилки, якщо потрібно
        }
    };
    const handleDeleteTask = async (taskId: number) => {
        try {
            // Викликати функцію для видалення завдання на бекенді
            const response = await fetch(`http://localhost:8080/todo/delete/${taskId}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                console.log(`Task with ID ${taskId} deleted successfully!`);
                // Після видалення оновити список завдань
                fetchDataFromApi();
            } else {
                console.error('Failed to delete task:', response.statusText);
                // Обробка помилки, якщо потрібно
            }
        } catch (error) {
            console.error('Error while deleting task:', error);
            // Обробка помилки, якщо потрібно
        }
    };
    
 
        
    return (
        <div className="container mt-5">
            <h1 className="mb-4">ToDo List</h1>

            <ul className="list-group">
                {data.map((task: Task) => (
                    <li key={task.id} className="list-group-item">
                        {task.task}
                        <button
                            className="btn btn-warning btn-sm ml-2"
                            onClick={() => handleUpdateTask(task.id, 'Updated Task')}
                        >
                            Update
                        </button>
                        <button
                            className="btn btn-danger btn-sm ml-2"
                            onClick={() => handleDeleteTask(task.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <div className="mt-3">
                <input
                    type="text"
                    className="form-control mr-2"
                    placeholder="New Task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button className="btn btn-success mt-2" onClick={handleAddTask}>
                    Add Task
                </button>
            </div>
        </div>
    );
}

export default ToDoListComponent;
