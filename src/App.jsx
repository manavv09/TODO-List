import React, { useEffect, useState } from "react";
import { TodoProvider } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updatedTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 👇 extra (minimal) - stats
  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <TodoProvider
      value={{ todos, addTodo, updatedTodo, deleteTodo, toggleComplete }}
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-zinc-900 to-slate-950 px-4 py-10">
        <div className="w-full max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Todo List
            </h1>
            <p className="text-sm text-white/60 mt-1">
              Simple • Clean • LocalStorage
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-5 sm:p-6">
            {/* Form */}
            <TodoForm />

            {/* Stats */}
            <div className="flex items-center justify-between mt-4 mb-4 text-sm">
              <p className="text-white/70">
                Total: <span className="text-white font-semibold">{totalCount}</span>
              </p>
              <p className="text-white/70">
                Completed:{" "}
                <span className="text-white font-semibold">{completedCount}</span>
              </p>
            </div>

            {/* Todos */}
            <div className="flex flex-col gap-3">
              {todos.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-white/60 text-sm">
                    No todos yet. Add your first one ✨
                  </p>
                </div>
              ) : (
                todos.map((todo) => (
                  <div key={todo.id} className="w-full">
                    <TodoItem todo={todo} />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-white/40 mt-6">
            Built with React + Context API
          </p>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
