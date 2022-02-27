import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const getTodos = createAsyncThunk("todos/getTodos", () => {
  return fetch("/api/todos").then(todos => todos.json().catch(error => error.json()))
})

export const updateTodo = createAsyncThunk("todos/updateTodo", values => {
  return fetch(`/api/todos/${values.id}`, {
    method: "PUT",
    body: JSON.stringify({
      id: values.id,
      userId: values.userId,
      title: values.title,
      completed: values.completed
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => error.json())
})

export const createTodo = createAsyncThunk("todos/createTodo", values => {
  return fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify({
      userId: values.userId,
      title: values.title,
      completed: values.completed
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => error.json())
})

export const deleteTodo = createAsyncThunk("todos/deleteTodo", id => {
  return fetch(`/api/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => error.json())
})
const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: null,
    selectedTodo: { tite: "", id: 0, completed: false }
  },
  reducers: {
    selectTodo: (state, action) => {
      const id = action.payload
      state.selectedTodo = state.todos.find(x => x.id == id)
    }
  },
  extraReducers: {
    [getTodos.pending]: (state, action) => {
      state.loading = true
    },
    [getTodos.fulfilled]: (state, action) => {
      state.todos = action.payload
      console.log("Fulfilled")
      console.log(action)
      state.loading = false
    },
    [getTodos.rejected]: (state, action) => {
      state.loading = false
      console.log("Rejected")
      console.log(action)
      state.error = action.payload
    },
    [updateTodo.pending]: (state, action) => {
      state.loading = true
    },
    [updateTodo.fulfilled]: (state, action) => {
      //state.todos = action.payload
      console.log("Fulfilled")
      console.log(action)
      state.loading = false
    },
    [updateTodo.rejected]: (state, action) => {
      state.loading = false
      console.log("Rejected")
      console.log(action)
      state.error = action.payload
    },

    [createTodo.pending]: (state, action) => {
      state.loading = true
    },
    [createTodo.fulfilled]: (state, action) => {
      //state.todos = action.payload
      console.log("Fulfilled")
      console.log(action)
      state.loading = false
    },
    [createTodo.rejected]: (state, action) => {
      state.loading = false
      console.log("Rejected")
      console.log(action)
      state.error = action.payload
    },
    [deleteTodo.pending]: (state, action) => {
      state.loading = true
    },
    [deleteTodo.fulfilled]: (state, action) => {
      //state.todos = action.payload
      console.log("Fulfilled")
      console.log(action)
      state.loading = false
    },
    [deleteTodo.rejected]: (state, action) => {
      state.loading = false
      console.log("Rejected")
      console.log(action)
      state.error = action.payload
    }
  }
})
export const { selectTodo } = todoSlice.actions
export default todoSlice.reducer
