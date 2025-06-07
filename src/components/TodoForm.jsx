import { useDispatch } from "react-redux";
import { addTodo } from "../features/todoSlice";
import { playSound } from "../utils/soundPlayer";

export default function TodoForm() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.todoInput.value;

    if (inputValue.trim() === "") return;
    
    playSound("addTask");
    dispatch(addTodo(inputValue));
    e.target.todoInput.value = "";
  };

  return (
    <form className="flex items-center my-[clamp(1rem,2vw,1.5rem)] px-[clamp(1.25rem,2vw,1.5rem)] py-[clamp(.45rem,1vw,.63rem)] bg-white dark:bg-ebony-clay rounded-[.313rem] shadow-[0_35px_50px_-15px_#C2C3D680] dark:shadow-[0_35px_50px_-15px_#00000080]"
      onSubmit={handleSubmit}>
      <div className="w-[clamp(1.33rem,2vw,1.62rem)] aspect-square border-1 border-color rounded-full"></div>

      <label className="sr-only" htmlFor="todoInput">Create a new todo item. Type your task and press enter to add it.</label>
      <input className="w-full px-[clamp(.75rem,2vw,1.5rem)] py-[.5rem] form-input-typography caret-dodger-blue"
        id="todoInput" name="todoInput" type="text" placeholder="Create a new todo…" />
    </form>
  );
}
