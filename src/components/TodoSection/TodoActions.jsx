import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../features/todoSlice";
import { playSound } from "../../utils/soundPlayer";
import ConfirmationModal from "./ConfirmationModal";

export default function TodoActions({ todo, editingId, setEditingId, editValue, setEditValue }) {
  const dispatch = useDispatch();

  const handleEdit = useCallback(() => {
    setEditingId(todo.id);
    setEditValue(todo.label);
  }, [setEditValue, setEditingId, todo.id, todo.label]);

  const handleSaveEdit = useCallback(() => {
    if (editValue.trim()) {
      dispatch(updateTodo({ id: todo.id, newLabel: editValue.trim() }));
    }
    setEditingId(null);
  }, [dispatch, editValue, setEditingId, todo.id]);

  const handleClickEditBtn = useCallback(() => {
    playSound("editTask");
    editingId === todo.id ? handleSaveEdit() : handleEdit();
  }, [editingId, handleEdit, handleSaveEdit, todo.id]);

  const handleShowConfirm = () => {
    playSound("modalPopup");
    const modal = document.getElementById(`confirmationModal-${todo.id}`);
    modal?.showModal();
  };

  return (
    <div className="flex gap-[clamp(.5rem,2vw,1.25rem)] *:cursor-pointer *:opacity-0 *:transition-opacity *:duration-250 *:ease-in-out *:group-hover:opacity-100 *:group-focus-within:opacity-100">

      <button className="tooltip-styles *:w-[clamp(.75rem,2vw,1.125rem)] *:text-mulled-wine/75 *:dark:text-comet *:transition-colors *:duration-150 *:ease-in-out *:hover:text-mulled-wine *:hover:dark:text-periwinkle-gray" type="button"
        onMouseDown={(e) => e.preventDefault()} onClick={handleClickEditBtn} 
        role="switch" aria-label={editingId === todo.id ? "Save changes" : "Edit task"} aria-pressed={editingId === todo.id} aria-controls={`todo-${todo.id}`} data-tip={editingId === todo.id ? "save" : "edit"}>

        {editingId === todo.id ? (
          <svg aria-hidden="true" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="currentColor" strokeWidth="2" d="M4 12l5 5 10-10" />
          </svg>
        ) : (
          <svg aria-hidden="true" focusable="false" width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        
      </button>

      <button className="tooltip-styles *:w-[clamp(.75rem,2vw,1.125rem)] *:text-mulled-wine/75 *:dark:text-comet *:transition-colors *:duration-150 *:ease-in-out *:hover:text-mulled-wine *:hover:dark:text-periwinkle-gray" type="button"
        onClick={handleShowConfirm} aria-label={`Delete task: ${todo.label}`} data-tip="delete">
        <svg aria-hidden="true" focusable="false" width="18px" height="18px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
        </svg>
      </button>

      <ConfirmationModal todo={todo} />
      
    </div>
  );
}
