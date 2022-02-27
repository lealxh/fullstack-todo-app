import { todos } from "../../../data/todos"
export default function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query
    let todo = todos.find(t => t.id == parseInt(id))
    res.status(200).json(todo)
  } else if (req.method === "PUT") {
    const { id } = req.query
    let body = req.body
    console.log(body)
    const index = todos.findIndex(t => t.id == parseInt(id))
    todos.splice(index, 1)
    todos.push(body)
    res.status(200).json(body)
  } else if (req.method === "DELETE") {
    const { id } = req.query
    const todo = todos.find(t => t.id == parseInt(id))
    const index = todos.findIndex(t => t.id == parseInt(id))
    todos.splice(index, 1)
    res.status(200).json(todo)
  }
}
