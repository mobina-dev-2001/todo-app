import { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { toggleStatus, updateTodo } from "../../features/todoSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { playSound } from "../../utils/soundPlayer";
import TodoActions from "./TodoActions";

export default function SortableTodos({ todo }) {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: todo.id });
  const style = { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 1 : "auto" };

  const handleToggleTaskStatus = useCallback(() => {
    playSound("taskStatusToggle");
    dispatch(toggleStatus(todo.id));
  }, [dispatch, todo.id]);

  useEffect(() => {
    if (editingId === todo.id && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId, todo.id]);
  
  const handleSaveEdit = useCallback((id) => {
    if (editValue.trim()) { dispatch(updateTodo({ id, newLabel: editValue.trim() })) };
    setEditingId(null);
  }, [dispatch, editValue]);

  const handleKeydown = useCallback((e, id) => {
    if (e.key === "Enter") {
      playSound("editTask");
      handleSaveEdit(id);
    } else if (e.key === "Escape") {
      setEditingId(null);
      setTimeout(() => {
        document.querySelector(`button[aria-label="Edit task"]`)?.focus();
      }, 50);
    }
  }, [handleSaveEdit, setEditingId]);

  return (
    <div
      className={`group relative flex justify-between px-[clamp(1.25rem,2vw,1.5rem)] py-[1rem] bg-white dark:bg-ebony-clay rounded-[.313rem] ${ isDragging ? "shadow-[0_35px_50px_-15px_#C2C3D680] dark:shadow-[0_35px_50px_-15px_#00000080]" : "" }`}
      id={todo.id} tabIndex={-1} data-completed={todo.completed} ref={setNodeRef} {...attributes} style={style} 
      aria-label={`Task: ${todo.label}. ${todo.completed ? "Completed" : "Pending"}.`}>
      <div className="flex items-center gap-[clamp(.75rem,2vw,1.5rem)]">

        <label htmlFor={`statusToggle-${todo.id}`} className="sr-only">Toggle task status</label>
        <input className="checkbox relative w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)] p-[.4rem] border-snuff dark:border-bright-gray rounded-full shadow-none [&:checked]:bg-gradient-to-br [&:checked]:from-malibu [&:checked]:to-heliotrope [&:checked]:shadow-none after:content-[url(../../assets/images/gradient-circle-border.svg)] after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:duration-200 after:ease-in hover:after:opacity-100 focus:after:opacity-100"
          id={`statusToggle-${todo.id}`} name={`statusToggle-${todo.id}`} type="checkbox" onChange={handleToggleTaskStatus} 
          checked={todo.completed} aria-label={todo.completed ? "Mark task as incomplete" : "Mark task as complete"} />

        {editingId === todo.id ? (
          <label htmlFor="taskEditInput">
            <input className="min-w-full caret-dodger-blue" id="taskEditInput" type="text" value={editValue} 
            onChange={(e) => setEditValue(e.target.value)} onBlur={() => setEditingId(null)} onKeyDown={(e) => handleKeydown(e, todo.id)} autoFocus />
          </label>
        ) : (
          <span className={`cursor-grab active:cursor-grabbing ${ todo.completed ? "text-mischka dark:text-trout line-through" : "" }`}
          {...(editingId !== todo.id ? listeners : {})} {...attributes} aria-checked={todo.completed ? "true" : "false"}>
            {todo.label}
          </span>
        )}

      </div>
      
      <TodoActions todo={todo} editingId={editingId} setEditingId={setEditingId} editValue={editValue} setEditValue={setEditValue} />
    </div>
  );
}
