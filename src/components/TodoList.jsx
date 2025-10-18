import { useState, useEffect } from "react";

export function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        // código disparado quando o componente carrega
        const fetchTasks = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos");
            const data = await response.json();

            setTasks(data.slice(0, 10)); // Limit to first 10 for demo
        };

        fetchTasks();
    }, []); // onLoad do componente

    const addTask = () => {
        if (newTask.trim()) {
            const newId = Math.max(...tasks.map(t => t.id)) + 1;
            setTasks([...tasks, { id: newId, title: newTask, completed: false }]);
            setNewTask("");
        }
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Minhas Tarefas</h2>

            {/* Add new task */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Adicionar nova tarefa..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
                <button
                    onClick={addTask}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                    Adicionar
                </button>
            </div>

            {/* Task list */}
            <div className="space-y-3">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className={`flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${
                            task.completed ? 'opacity-75' : ''
                        }`}
                    >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span
                            className={`flex-1 text-gray-800 ${
                                task.completed ? 'line-through text-gray-500' : ''
                            }`}
                        >
                            {task.title}
                        </span>
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                        >
                            Excluir
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
