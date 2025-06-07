import { useSelector, useDispatch } from "react-redux";
import { clearCompleted } from "../../features/todoSlice";
import { playSound } from "../../utils/soundPlayer";

export default function BottomPanel({ filter, setFilter }) {
  const dispatch = useDispatch();
  const todosArray = useSelector((state) => state.todo.todos);
  const pendingTasksCount = todosArray.filter(todo => todo.completed === false).length;

  return (
    <>
      <section className="flex justify-between items-center h-[3.25rem] px-[1.5rem] bg-white dark:bg-ebony-clay border-t-1 border-color rounded-b-[.313rem] bottom-panel-typography">
        <p>{pendingTasksCount} items left</p>

        <button className="justify-self-end cursor-pointer transition-all duration-200 ease-in-out hover:text-mulled-wine hover:dark:text-snuff"
          onClick={() => { dispatch(clearCompleted()); playSound("deleteTask") }}>
          Clear Completed
        </button>
      </section>

      <section className="absolute bottom-0 max-sm:bottom-[-13%] left-1/2 -translate-x-1/2 flex justify-center gap-5 max-sm:w-full h-[3rem] bg-white dark:bg-ebony-clay rounded-[.313rem] filter-tablist-typography max-sm:shadow-[0_35px_50px_-15px_#C2C3D680] max-sm:dark:shadow-[0_35px_50px_-15px_#00000080] *:cursor-pointer *:transition-all *:duration-200 *:ease-in-out" role="tablist" aria-label="Filter tasks">
        <button onClick={() => { setFilter("all"); playSound("filterTask") }} aria-selected={filter === "all"} role="tab">All</button>
        <button onClick={() => { setFilter("active"); playSound("filterTask") }} aria-selected={filter === "active"} role="tab">Active</button>
        <button onClick={() => { setFilter("completed"); playSound("filterTask") }} aria-selected={filter === "completed"} role="tab">Completed</button>
      </section>
    </>
  );
}
