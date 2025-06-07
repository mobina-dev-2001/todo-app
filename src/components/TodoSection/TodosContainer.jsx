import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reorderTodos } from "../../features/todoSlice";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { playSound } from "../../utils/soundPlayer";
import EmptyState from "./EmptyState";
import SortableTodos from "./SortableTodos";
import BottomPanel from "./BottomPanel";

export default function TodosContainer() {
  const [filter, setFilter] = useState("all");
  const todosArray = useSelector((state) => state.todo.todos);
  const sensors = useSensors(useSensor(PointerSensor));
  const dispatch = useDispatch();

  const filteredTodos = todosArray.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = todosArray.findIndex((t) => t.id === active.id);
    const newIndex = todosArray.findIndex((t) => t.id === over.id);
    dispatch(reorderTodos(arrayMove(todosArray, oldIndex, newIndex)));
    playSound("dragEnd");
  };

  return (
    <motion.section className="shadow-[0_35px_50px_-15px_#C2C3D680] dark:shadow-[0_35px_50px_-15px_#00000080]"
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <ul className={`${ todosArray.length >= 6 ? "overflow-y-scroll" : "" } overflow-x-hidden relative h-[clamp(19.75rem,30vw,24.25rem)] bg-white dark:bg-ebony-clay rounded-t-[.313rem] scrollbar-thin scrollbar-thumb-[#C8CBE7] scrollbar-track-transparent`} aria-live="polite" aria-atomic="true">

        {todosArray.length === 0 ? <EmptyState /> : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={() => playSound("dragStart")} onDragEnd={handleDragEnd}>
            <SortableContext items={filteredTodos.map((todo) => todo.id)} strategy={verticalListSortingStrategy}>
              <AnimatePresence>
                {filteredTodos.map((todo) => (
                  <li key={todo.id}>
                    <SortableTodos todo={todo} />
                    <div className="border-b-1 border-color"></div>
                  </li>
                ))}
                </AnimatePresence>
            </SortableContext>
          </DndContext>)}
          
      </ul>

      <BottomPanel filter={filter} setFilter={setFilter} />
    </motion.section>
  );
}
