import { request } from "http";
import { renderToString } from "react-dom/server";
import { Todo } from "./src/types";
import { TodoList } from "./src/TodoList";

const server = Bun.serve({
  hostname: 'localhost',
  port: 3000,
  fetch: fetchHandler
});

const todos: Todo[] = [];

async function fetchHandler(params: Request): Promise<Response> {
  const url = new URL(params.url);

  if (['', '/'].includes(url.pathname)) {
    return new Response(Bun.file('index.html'));
  }

  if (url.pathname === "/todos" && params.method === "GET") {
    return new Response(renderToString(<TodoList todos={todos} />));
  }

  if (url.pathname === "/todos" && params.method === "POST") {
    const { todo } = await params.json();
    todos.push({
      id: todos.length,
      name: todo,
    });
    return new Response(renderToString(<TodoList todos={todos} />));
  }

  return new Response("Not Found", { status: 404 });
}