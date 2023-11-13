import { useLoaderData, useNavigation } from "react-router-dom";
import { getTodos } from "../api/todosGet";
import TodoItem from "../components/TodoItem";

export default function Todos() {
  const todos = useLoaderData();

  return (
    <>
      <h1 className="page-title">Todos</h1>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
}

function loader({ request: { signal } }) {
  return getTodos({ signal });
}

export const todosRoute = {
  loader,
  element: <Todos />,
};
