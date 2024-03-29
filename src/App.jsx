import React from 'react'
import { ToastContainer } from "react-toastify"
import Todo from './pages/Todo'
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return <>
    <ToastContainer />
    <Todo />
  </>
}

export default App