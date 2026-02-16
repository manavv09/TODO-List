import React, { useState } from "react";
import { useTodo } from "../contexts";

function TodoForm() {
    const [todo, setTodo] = useState("");
    const { addTodo } = useTodo();

const add = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;

    addTodo({ todo: todo.trim(), completed: false });
    setTodo("");
};

    return (
    <form onSubmit={add} className="flex gap-2">
    <input
        type="text"
        placeholder="Write a new todo..."
        className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/40
        border border-white/10 outline-none focus:border-white/30 transition"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
    />

    <button
        type="submit"
        className="px-5 py-3 rounded-xl font-semibold text-sm text-white
        bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] transition"
    >
        Add
    </button>
    </form>
);
}

export default TodoForm;
