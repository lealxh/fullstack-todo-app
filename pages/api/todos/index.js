import { todos } from "../../../data/todos"
export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(todos)
  } else if (req.method === "POST") {
    const body = req.body
    let newTodo = {
      id: todos.length + 1,
      userId: 1,
      title: body.title,
      completed: body.completed
    }
    todos.push(newTodo)
    res.status(201).json(newTodo)
  }
}
