import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from "react";
import Navbar from './components/Navbar';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {
  const [Todo, setTodo] = useState() //this holds the current todo that is being added
  const [Todos, setTodos] = useState([]) //this holds all the todos
  const [showFinished, setshowFinished] = useState(true) //this holds the state of whether to show finished todos or not

  useEffect(() => {
    let todoString = localStorage.getItem('todos')
    if (todoString){
      let Todos = JSON.parse(localStorage.getItem('todos'));
      setTodos(Todos);
    }
  }, [])

  const saveToLS = (latestTodos) => {
    localStorage.setItem('todos', JSON.stringify(latestTodos));
  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = Todos.filter(i => i.id === id)
    setTodo(t.Todo)
    let newTodos = Todos.filter(item => item.id !== id);
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleDelete = (e, id) => {
    let newTodos = Todos.filter(item => item.id !== id);
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleAdd = () => {
    const newTodos = [...Todos, { id: uuidv4(), Todo, isCompleted: false }];
    setTodos(newTodos)
    setTodo("") 
    saveToLS(newTodos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex(item => item.id === id)
    let newTodos = [...Todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS(newTodos)
  }
  
  return (
    <>
      <Navbar/>
      <div className="container mx-auto my-7 rounded-2xl bg-violet-300 p-5 md:min-h-[80vh] w-full ">
        <h1 className='font-bold text-xl text-center pb-7'>iToDo - Manage all your todos</h1>
        <div className="addTodo">
          <h2 className="text-lg font-bold">Add a todo</h2>
          <div className="inputs_buttons flex">
            <input onChange={handleChange} value={Todo} type="text" className="bg-purple-200 p-2 m-2 md:w-200 text-xl" />
            <button onClick={handleAdd} disabled={!Todo || Todo.length <= 3}  className="p-2 bg-purple-800 text-white mx-3 rounded-2xl hover:bg-purple-600 font-bold hover:cursor-pointer px-4 disabled:bg-violet-400">Save</button>
          </div>
        </div>
       <div className="Finished_task m-4">
        <input type="checkbox" onChange={toggleFinished} checked={showFinished} />
        <label className="mx-2 font-bold">Show Finished Task</label>
       </div>  
          <h2 className="font-bold text-xl">Your Todos</h2>
          <div className="todos p-5 mx-3">
            {Todos.length === 0 && <div className="text-center text-[32px] font-bold text-pink-600">No todos yet</div>}
            
            {Todos.map(item=>{
        return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between bg-purple-300 p-3 rounded-2xl m-3 border-1 border-purple-700 gap-3 md:w-[80vw]">
               <div className='flex gap-3 items-center'>
                <input type="checkbox" name={item.id} onChange={handleCheckbox} checked={item.isCompleted} id=''/>
                <div className={item.isCompleted?"line-through":""}>{item.Todo}</div>
               </div> 
                <div className="buttons flex gap-5">
                  <button onClick={(e)=>{handleEdit(e,item.id)}}  className="edit bg-purple-600 p-1 px-3 rounded-2xl hover:bg-purple-500 hover:cursor-pointer text-white"><FaEdit /></button>
                  <button onClick={(e)=>{handleDelete(e, item.id)}} className="delete bg-purple-600 p-1 px-3 rounded-2xl hover:bg-purple-500 hover:cursor-pointer text-white"><MdDelete />
                  </button>
                </div>
              </div>
            })}
          </div>
        

      </div>

    </>
  )
}

export default App
