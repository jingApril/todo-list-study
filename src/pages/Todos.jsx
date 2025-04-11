import { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import TodoItem from "../components/TodoItem";
import { Outlet, Link } from "react-router-dom";

export default function Todos() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useLocalStorage("my-todo-list", []);
  const [filter, setFilter] = useState("all");

  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const uncompletedCount = totalCount - completedCount;

  // 读取本地数据
  useEffect(() => {
    const storedTodos = localStorage.getItem("my-todo-list");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // 写入本地数据
  useEffect(() => {
    localStorage.setItem("my-todo-list", JSON.stringify(todos));
  }, [todos]);

  const handleAddTask = () => {
    if (!task.trim()) return;
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
      isEditing: false,
    };
    setTodos([...todos, newTask]);
    setTask("");
  };

  const handleDeleteTask = (id) => {
    const filtered = todos.filter((todo) => todo.id !== id);
    setTodos(filtered);
  };

  const handleToggleComplete = (id) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const handleStartEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: true } : todo
      )
    );
  };

  const handleSaveEdit = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText.trim(), isEditing: false }
          : todo
      )
    );
  };
  const handleCancelEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: false } : todo
      )
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">📝 Todo List</h1>
        <nav className="mt-4 space-x-4">
          <Link to="/todos" className="text-blue-600 hover:underline">任务列表</Link>
          <Link to="/todos/settings" className="text-blue-600 hover:underline">设置</Link>
        </nav>
        <div className="mt-6">
          {/* 嵌套路由显示位置 */}
          <Outlet  />
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTask();
              }
            }}
            placeholder="请输入任务..."
            className="px-4 py-2 w-64 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={handleAddTask}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            添加
          </button>
        </div>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            全部
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1 rounded ${
              filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            未完成
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 rounded ${
              filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            已完成
          </button>
        </div>
        <div className="flex gap-4 mb-4 text-sm animate-fade-in">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-xl shadow transition-transform duration-300 hover:scale-105">
            总任务：{totalCount}
          </span>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-xl shadow transition-transform duration-300 hover:scale-105">
            ✅ 已完成：{completedCount}
          </span>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-xl shadow transition-transform duration-300 hover:scale-105">
            🕓 未完成：{uncompletedCount}
          </span>
        </div>
        <ul className="w-full max-w-md space-y-2">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleComplete}
              onDelete={handleDeleteTask}
              onStartEdit={handleStartEdit}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
