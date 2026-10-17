import { useState, useEffect } from "react";

export default function Home() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("low"); // Varsayılan öncelik "low"

//1. Listeleme: useEffect ile localStorage'dan verileri alıp todos state'ine atıyoruz.

    useEffect(() => { 
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        if (savedTodos) {
        setTodos(savedTodos);
        }
    }, []);

// Veriler her değiştiğinde LocalStorage'ı güncelle

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

// 2. EKLEME: Yeni görev ekleme fonksiyonu
  const addTask = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    const newTask = { 
        id: Date.now(),
        title: task,
        completed: false,
        priority: priority };

    setTodos([...todos, newTask]);
    setTask(''); // Input'u temizle
    setPriority('low'); // Önceliği varsayılan değere sıfırla
  };

// 3. SİLME: Görevi listeden çıkarma fonksiyonu
  const deleteTask = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

// 4. GÜNCELLEME: Görevin tamamlanma durumunu değiştirme
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

const priorityColors = {
    low: 'bg-green-500 text-green-800',
    medium: 'bg-yellow-500 text-yellow-800',
    high: 'bg-red-500 text-red-800',
  };

return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md border border-slate-200">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">To Do List</h1>
        
        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input 
            type="text" 
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task..." 
            className="flex-1 border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-100 hover:shadow-sm transition">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="w-5 h-5 cursor-pointer accent-blue-600"
                />
                <span className={`w-3 h-3 rounded-full flex-shrink-0 ${priorityColors[todo.priority] || 'bg-blue-500'}`}>
                </span>
                <span className={`${todo.completed ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}`}>
                  {todo.title}
                </span>
              </div>
              <button 
                onClick={() => deleteTask(todo.id)}
                className="text-red-500 hover:text-red-700 font-semibold text-sm bg-red-50 px-3 py-1 rounded-md"
              >
                Delete
              </button>
            </li>
          ))}
          {todos.length === 0 && (
            <p className="text-center text-slate-500 text-sm py-4">No tasks added yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
}