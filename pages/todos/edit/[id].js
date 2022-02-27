import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { selectTodo, updateTodo, deleteTodo } from "../../../redux/features/todoSlice"
import Loading from "../../../components/loading"
import styles from "../../../styles/Home.module.css"

function EditTodo() {
  const dispatch = useDispatch()
  const router = useRouter()
  const id = router.query.id

  const { selectedTodo, error, loading = false } = useSelector(state => ({ ...state.todos }))
  const [title, setTitle] = useState("")
  const [completed, setCompleted] = useState(false)
  useEffect(() => {
    dispatch(selectTodo(id))
  }, [])
  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title)
      setCompleted(selectedTodo.completed)
    }
  }, [selectedTodo])

  function handleUpdate() {
    const values = { id, userId: 1, title, completed }

    dispatch(updateTodo(values))
      .then(resp => {
        console.log("Respuesta del dispatch")
        console.log(resp)
        alert("Updated succesfully")
        router.push("/todos")
      })
      .catch(error => console.log(error))
  }

  function handleDelete() {
    dispatch(deleteTodo(id))
      .then(resp => {
        console.log("Respuesta del dispatch")
        console.log(resp)
        alert("Deleted succesfully")
        router.push("/todos")
      })
      .catch(error => console.log(error))
  }
  return (
    <>
      <div className={styles.container}>
        <h1>Edit Todo {id}</h1>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <label htmlFor="title">Title</label>
            <input type={"text"} value={title} name="title" onChange={e => setTitle(e.target.value)} style={{ width: "300px" }} />

            <label htmlFor="title">Completed</label>
            <input type={"checkbox"} checked={completed} name="completed" onChange={e => setCompleted(e.target.checked)} />

            <input type={"button"} onClick={() => handleUpdate()} value={"Update"} style={{ width: "100px" }} />
            <input type={"button"} onClick={() => handleDelete()} value={"Delete"} style={{ width: "100px" }} />
          </div>
        )}

        {error ? <div>{error}</div> : ""}
        <Link href={"/todos"}>Back</Link>
      </div>
    </>
  )
}

export default EditTodo
