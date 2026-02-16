import React, { useState } from "react";
import { useTodo } from "../contexts";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const { updatedTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updatedTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-4 py-3 border transition
      ${
        todo.completed
          ? "bg-emerald-500/10 border-emerald-500/20"
          : "bg-white/5 border-white/10 hover:border-white/20"
      }`}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        className="w-5 h-5 accent-emerald-500 cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />

      {/* Text */}
      <input
        type="text"
        className={`w-full bg-transparent outline-none text-sm sm:text-base
        ${todo.completed ? "text-white/40 line-through" : "text-white"}
        ${isTodoEditable ? "border-b border-white/20" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />

      {/* Edit / Save */}
      <button
        className="px-3 py-2 rounded-lg text-xs font-semibold
        bg-white/10 hover:bg-white/15 border border-white/10 transition disabled:opacity-40"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
        title={isTodoEditable ? "Save" : "Edit"}
      >
        {isTodoEditable ? "Save" : "Edit"}
      </button>

      {/* Delete */}
      <button
        className="px-3 py-2 rounded-lg text-xs font-semibold
        bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-300 transition"
        onClick={() => deleteTodo(todo.id)}
        title="Delete"
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
