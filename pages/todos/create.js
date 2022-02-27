import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { createTodo } from "../../redux/features/todoSlice"
import Loading from "../../components/loading"
import styles from "../../styles/Home.module.css"

function CreateTodo() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { error, loading = false } = useSelector(state => ({ ...state.todos }))
  const [title, setTitle] = useState("")
  const [completed, setCompleted] = useState(false)

  function handleCreate() {
    dispatch(createTodo({ userId: 1, title, completed }))
      .then(resp => {
        console.log("Respuesta del dispatch")
        console.log(resp)
        alert("Created succesfully")
        router.push("/todos")
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <div className={styles.container}>
        <h1>Create Todo</h1>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <label htmlFor="title">Title</label>
            <input type={"text"} value={title} name="title" onChange={e => setTitle(e.target.value)} style={{ width: "300px" }} />

            <label htmlFor="title">Completed</label>
            <input type={"checkbox"} checked={completed} name="completed" onChange={e => setCompleted(e.target.checked)} />
            <input type={"button"} onClick={() => handleCreate()} value={"Create"} style={{ width: "100px" }} />
          </div>
        )}

        {error ? <div>{error}</div> : ""}

        <Link href={"/"}>
          <a>Back</a>
        </Link>
      </div>
    </>
  )
}
export default CreateTodo
