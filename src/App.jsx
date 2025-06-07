import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodosContainer from "./components/TodoSection/TodosContainer";

export default function App() {
  return (
    <>
      <Header />
      <TodoForm />
      <TodosContainer />
    </>
  );
}
