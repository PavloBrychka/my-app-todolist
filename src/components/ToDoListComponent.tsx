// import React, { useEffect, useState } from 'react';
// import { fetchData } from '../http/http.ts';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Task } from './types';

// const ToDoListComponent = () => {
//     const [data, setData] = useState<Task[]>([]);
//     const [newTask, setNewTask] = useState('');
//     const [deleteSuccess, setDeleteSuccess] = useState(false);
//     useEffect(() => {
//         fetchDataFromApi();
//     }, []);

//     const fetchDataFromApi = async () => {
//         try {
//             const result: Task[] = await fetchData('/todo/all');
//             setData(result);
//         } catch (error) {
//             // Обробка помилки, якщо потрібно
//         }
//     };

//     const handleAddTask = async () => {
//         try {
//             // Викликати функцію для додавання завдання на бекенді
//             const response = await fetch('http://localhost:8080/todo/add', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ task: newTask }),
//             });
    
//             if (response.ok) {
//                 console.log('Task added successfully!');
//                 // Після додавання оновити список завдань
//                 fetchDataFromApi();
//                 // Очистити поле введення після успішного додавання
//                 setNewTask('');
//             } else {
//                 console.error('Failed to add task:', response.statusText);
//                 // Обробка помилки, якщо потрібно
//             }
//         } catch (error) {
//             console.error('Error while adding task:', error);
//             // Обробка помилки, якщо потрібно
//         }
//     };
    
    
   
//     const handleDeleteTask = async (taskId: number) => {
//         try {
//             // Питаємо користувача підтвердження
//             const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    
//             if (!confirmDelete) {
//                 return; // Виходимо з функції, якщо користувач відмінив видалення
//             }
    
//             // Викликаємо функцію для видалення завдання на бекенді
//             const response = await fetch(`http://localhost:8080/todo/delete/${taskId}`, {
//                 method: 'DELETE',
//             });
    
//             if (response.ok) {
//                 console.log(`Task with ID ${taskId} deleted successfully!`);
//                 // Після видалення оновлюємо список завдань
//                 fetchDataFromApi();
//             } else {
//                 console.error('Failed to delete task:', response.statusText);
//                 // Обробка помилки, якщо потрібно
//             }
//         } catch (error) {
//             console.error('Error while deleting task:', error);
//             // Обробка помилки, якщо потрібно
//         }
//     };
    
 
        
//     return (
//         <div className="container mt-5">
//             <h1 className="mb-4">ToDo List</h1>

//             <ul className="list-group">
//                 {data.map((task: Task) => (
//                     <li key={task.id} className="list-group-item">
//                         {task.task}
//                         {/* <button
//                             className="btn btn-warning btn-sm ml-2"
//                             onClick={() => handleUpdateTask(task.id, 'Updated Task')}
//                         >
//                             Update
//                         </button> */}
//                         <button
//                             className="btn btn-danger btn-sm ml-2"
//                             onClick={() => handleDeleteTask(task.id)}
//                         >
//                             Delete
//                         </button>
//                     </li>
//                 ))}
//             </ul>

//             <div className="mt-3">
//                 <input
//                     type="text"
//                     className="form-control mr-2"
//                     placeholder="New Task"
//                     value={newTask}
//                     onChange={(e) => setNewTask(e.target.value)}
//                 />
//                 <button className="btn btn-success mt-2" onClick={handleAddTask}>
//                     Add Task
//                 </button>
//             </div>
//         </div>
//     );
    
// }

// export default ToDoListComponent;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchData } from '../http/http.ts';
import { Task } from './types';

const ToDoListComponent = () => {
    const [data, setData] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');
    const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);

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

    const handleDeleteTask = async (taskId: number) => {
        try {
            // Зберегти ID завдання для видалення у стані
            setDeleteTaskId(taskId);
        } catch (error) {
            console.error('Error while initiating delete task:', error);
            // Обробка помилки, якщо потрібно
        }
    };

    const confirmDelete = () => {
        if (deleteTaskId !== null) {
            // Викликаємо функцію для видалення завдання на бекенді
            const performDelete = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/todo/delete/${deleteTaskId}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        console.log(`Task with ID ${deleteTaskId} deleted successfully!`);
                        // Після видалення оновлюємо список завдань
                        fetchDataFromApi();
                    } else {
                        console.error('Failed to delete task:', response.statusText);
                        // Обробка помилки, якщо потрібно
                    }
                } catch (error) {
                    console.error('Error while deleting task:', error);
                    // Обробка помилки, якщо потрібно
                } finally {
                    // Зачистити ID завдання для видалення після виконання операції
                    setDeleteTaskId(null);
                }
            };

            performDelete();
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

            {/* Модальне вікно для підтвердження видалення */}
            <div
                className="modal"
                tabIndex={-1}
                role="dialog"
                style={{ display: deleteTaskId !== null ? 'block' : 'none' }}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmation</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setDeleteTaskId(null)}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Ви дійсно хочите видалити це завдання?
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={() => setDeleteTaskId(null)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToDoListComponent;

