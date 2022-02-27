import React, { useEffect } from "react"
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import Loading from "../../components/loading"
import { getTodos } from "../../redux/features/todoSlice"
import styles from "../../styles/Home.module.css"

function ListTodos() {
  const dispatch = useDispatch()
  const { todos = [], loading = false, error = null } = useSelector(state => ({ ...state.todos }))

  useEffect(() => {
    dispatch(getTodos())
    console.log("Use effect")
  }, [])

  return (
    <>
      <div className={styles.container}>
        <h1>List Todos</h1>
        <div>
          {loading ? (
            <Loading />
          ) : todos.length > 0 ? (
            <ul>
              {todos.map(todo => {
                return (
                  <li key={todo.id}>
                    <input type="checkbox" checked={todo.completed} readOnly="true" />
                    <Link href={{ pathname: "/todos/edit/[id]", query: { id: todo.id } }}>
                      <a>{todo.title}</a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div>No Todos to Show</div>
          )}
          {error ? <div>{error}</div> : ""}
        </div>
        <Link href="/">
          <a>Back</a>
        </Link>
      </div>
    </>
  )
}

export default ListTodos
