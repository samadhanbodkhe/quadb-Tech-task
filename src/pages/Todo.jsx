import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Todo = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [allTodos, setAllTodos] = useState()
    const [task, setTask] = useState({})
    const [selectedTask, setSelectedTask] = useState()

    const handleAddTodo = async e => {
        try {
            await axios.post("http://localhost:5000/todos", task)
            toast.success("todo create success")
            setAllTodos()
            getAllTodos()
        } catch (error) {
            toast.error(error.message)

        }
    }

    const getAllTodos = async e => {
        try {
            setIsLoading(true)
            setTimeout(async () => {
                const { data } = await axios.get("http://localhost:5000/todos")
                setAllTodos(data)
                setIsLoading(false)

            }, 100)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const handleDelete = async todoId => {
        try {
            const { data } = await axios.delete(`http://localhost:5000/todos/${todoId}`)
            toast.success("todo delete success")
            getAllTodos()

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getAllTodos()
    }, [])

    const handleClasses = pr => {
        switch (pr) {
            case "1": return "table-danger"
            case "2": return "table-warning"
            case "3": return "table-success"
            default: return ""
        }
    }

    const TODO_TABLE = <>
        <table className='table  container'>
            <thead>
                <tr>
                    <th className='bg-black text-white font-monospace'>#</th>
                    <th className='bg-black text-white font-monospace'>Task</th>
                    <th className='bg-black text-white font-monospace'>Priority</th>
                    <th className='bg-black text-white font-monospace'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {allTodos && allTodos.map(item => <tr
                    className={handleClasses(item.priority)}
                    key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.task}</td>
                    <td>{item.priority}</td>
                    <td>
                        <button
                            data-bs-toggle="modal"
                            data-bs-target="#editModal"
                            onClick={e => setSelectedTask(item)}
                            className='btn btn-warning'>edit</button>
                        <button className='btn btn-danger mx-2' onClick={e => handleDelete(item.id)}>delete</button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    </>
    // const [count, setCount] = useState(100)
    const handleChange = e => {
        const { value, name } = e.target
        setTask({ ...task, [name]: value })
        console.log(name, value);
    }
    const handleEditChange = e => {
        const { value, name } = e.target
        setSelectedTask({ ...selectedTask, [name]: value })

    }
    const handleUpdate = async e => {
        try {
            const { data } = await axios.patch(`http://localhost:5000/todos/${selectedTask.id}`, selectedTask)
            toast.success("Todo update success")
            getAllTodos()

        } catch (error) {
            toast.error(error.message)

        }
    }

    if (isLoading) return <h1>Loading.......</h1>
    return <>
        <div className='d-flex m-5 gap-2'>
            <input name='task' placeholder='Enter Your Task' className='w-25' onChange={handleChange} type="text" /> <br /><br />
            <select name='priority' className='w-25 ' onChange={handleChange}>
                <option>Choose Priority</option>
                <option value="1">high</option>
                <option value="2">medium</option>
                <option value="3">low</option>
            </select>
            <button type="button" onClick={handleAddTodo} className="btn btn-primary h-25 ">Add Todo</button>
        </div>


        <hr />
        {TODO_TABLE}

        <div class="modal fade" id="editModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="text"
                            onChange={handleEditChange}
                            value={selectedTask && selectedTask.task}
                            className='form-control my-2'
                            name='task' />

                        <select class="form-select my-2"
                            onChange={handleEditChange}
                            name='priority'
                            value={selectedTask && selectedTask.priority}>
                            <option value="1">High</option>
                            <option value="2">Medium</option>
                            <option value="3">Low</option>
                        </select>
                        <button data-bs-dismiss="modal"
                            type="button"
                            onClick={handleUpdate}
                            class="btn btn-primary">Update Todo</button>
                    </div>

                </div>
            </div>
        </div>

    </>
}

export default Todo