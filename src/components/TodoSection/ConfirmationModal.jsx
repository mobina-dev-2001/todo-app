import { useDispatch } from "react-redux";
import { deleteTodo } from "../../features/todoSlice";
import { playSound } from "../../utils/soundPlayer";

export default function ConfirmationModal({ todo }) {
  const dispatch = useDispatch();
  const modalId = `confirmationModal-${todo.id}`;
  const handleDeleteTask = () => { playSound("deleteTask"); dispatch(deleteTodo(todo.id)) };

  return (
    <dialog className="modal text-mulled-wine dark:text-periwinkle-gray"
     id={modalId} aria-labelledby={`modal-title-${todo.id}`} aria-modal="true">
      <div className="modal-box grid place-items-center max-w-[22rem] bg-alabaster dark:bg-cinder border-1 border-color text-center">
        <div>
          <h3 id={`modal-title-${todo.id}`}>Are you sure?</h3>
          <p className="py-4"> Are you sure you want to delete this task? This action cannot be undone.</p>
        </div>

        <div className="modal-action">
          <form className="flex gap-5 *:border-none" method="dialog">
            <button className="btn bg-snuff dark:bg-ebony-clay text-mulled-wine dark:text-periwinkle-gray" type="submit"
            onClick={() => playSound("modalPopup")}>Close</button>

            <button className="btn bg-red-600 dark:bg-red-900 text-white dark:text-periwinkle-gray" type="submit"
            onClick={handleDeleteTask}>Delete</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
