import { useRef } from "react";

function TodoItem({
  todo,
  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
}) {
  const inputRef = useRef(null);
  return (
    <li
      key={todo.id}
      className="flex justify-between items-center bg-white p-3 rounded shadow"
    >
      {todo.isEditing ? (
        <input
          ref={inputRef}
          autoFocus
          defaultValue={todo.text}
          onBlur={(e) => onSaveEdit(todo.id, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSaveEdit(todo.id, e.target.value);
              setTimeout(() => inputRef.current?.blur(), 0);
              inputRef.current.blur(); // 自动触发blur
            }
            if (e.key === "Escape") onCancelEdit(todo.id);
          }}
          className="flex-1 border px-2 py-1 mr-2"
        />
      ) : (
        <span
          onClick={() => onStartEdit(todo.id)}
          className={`flex-1 block ${
            todo.completed
              ? "line-through text-gray-600 decoration-2"
              : "text-gray-800"
          }`}
        >
          {todo.text}
        </span>
      )}

      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onToggle(todo.id)}
          className="text-green-500 hover:underline"
        >
          {todo.completed ? "取消完成" : "完成"}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:underline"
        >
          删除
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
