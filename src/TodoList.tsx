import { Todo } from "./types";

export const TodoList = (props: { todos: Todo[] }) => {
  return (
    <ul>
      {props.todos.length
        ? props.todos.map((todo) => (
            <li key={`todo-${todo.id}`}>{todo.name}</li>
          ))
        : "No todos found"}
    </ul>
  );
}