import { useState } from "react";
import { useDispatch } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { addTodo } from "../features/todoSlice";
import { playSound } from "../utils/soundPlayer";

export default function TodoForm() {
  const [inputVal, setInputVal] = useState("");
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

      <label className="sr-only" htmlFor="todoInput">Create a new todo item:</label>
      <input className="w-full px-[clamp(.75rem,2vw,1.5rem)] py-[.5rem] form-input-typography caret-dodger-blue" id="todoInput" name="todoInput" type="text"
      onChange={(e) => setInputVal(e.target.value)} placeholder="Create a new todo…" />

      <AnimatePresence>
        {inputVal.trim() === "" ? null : (
          <motion.button className="btn bg-gradient-to-br from-malibu to-heliotrope border-none text-white text-shadow-md" type="submit"
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}>add</motion.button>
        )}
      </AnimatePresence>
    </form>
  );
}
