import {useState, useEffect} from 'react'

interface Task {
  id: number;
  text: string;
  completed: boolean;
}


function App() {
  const [editedId, setEditedId] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>(()=> {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

    useEffect(()=> {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const newTask: Task = {
      id: Date.now(),
      text: 'Empty',
      completed: false,
    }
    setTasks(prev => [...prev, newTask]);
  }
  
  const deleteTask = (id: number) => {
    const newTasks = tasks.filter(task=> task.id !== id);
    setTasks(newTasks);
    //setTasks(prev => prev.filter(task => task.id !== id));
  }

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? {...task, completed: !task.completed} : task
    ))
  }

  const updateTaskText = (id: number, newText: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? {...task, text: newText} : task
      )
    )
  }

  return (
    <div className='main-container'>
      <button className='addTask'
      onClick={addTask}>Add Task</button>
      <ul className='task-list'>
      {tasks.map(task => (
        <li key={task.id}
        style={{textDecoration: task.completed ? 'line-through' : 'none'}}
        className='task'>
          <button className='delete'
          onClick={() => deleteTask(task.id)}>X</button>

          {editedId === task.id ? (
            <input type="text"
            value={task.text}
            onChange={(e)=> updateTaskText(task.id, e.target.value)}
            onBlur={()=> setEditedId(null)}
            onKeyDown={(e)=> {
              if(e.key === 'Enter') setEditedId(null)
            }}
            autoFocus/>
          ) : (
            <span onDoubleClick={()=> setEditedId(task.id)}>
              {task.text || 'Empty'}
            </span>
          )}
          
          <button className='toggle'
          onClick={() => toggleTask(task.id)}>{task.completed ? '✅' : '⬜'}</button>
        </li>
      ))}  
      </ul>
    </div>
  )
}

export default App


