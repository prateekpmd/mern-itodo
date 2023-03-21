import React, { useEffect, useState } from "react";

const App = () => {
  // const API_BASE = "http://localhost:5000/todo";
  const [todos, setTodos] = useState([]);
  const [addpopUp, setAddPopUp] = useState(false);
  const [newTodo, setNewTodo] = useState();

 

  useEffect(() => {
     const getAllTodos = async () => {
       try {
         const res = await fetch("/todo");
         const data = await res.json();
         setTodos(data);
         
       } catch (err) {
         console.error(err);
       }
     };
    getAllTodos();
  }, [todos]);
  
  const strikeHandler = async (id) => {
    try {
      const res = await fetch("/todo/" + id);

      const data = await res.json();
      setTodos(
        todos.map((t) => {
          if (t._id === data._id) {
            t.complete = data.complete;
          }
          return t;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const res = await fetch("/todo/" + id, {
        method: "DELETE",
      });

      const data = await res.json();
      setTodos(
        todos.filter((t) => {
          return t._id !== data._id;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
  const addNewTodo = async () => {
    try {
      const res = fetch("/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newTodo,
        }),
      });
      const data = await res.json();
      setTodos([...newTodo, data]);
    } catch (error) {
      console.error(error);
    }
    setNewTodo("");
    setAddPopUp(false);
  };

  return (
    <div className="App">
      <h1>Welcome, XXX</h1>
      <h4>YOUR TASKS</h4>

      <div className="todos">
        {todos.map((element) => {
          return (
            <div
              className={element.complete ? " todo is-complete " : "todo"}
              key={element._id}
              onClick={() => strikeHandler(element._id)}
            >
              <div className="checkbox"></div>
              <div className="text">{element.text}</div>
              <div
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteHandler(element._id);
                }}
              >
                X
              </div>
            </div>
          );
        })}
      </div>
      <div className="addPopup" onClick={() => setAddPopUp(!addpopUp)}>
        +
      </div>
      {addpopUp ? (
        <div className="overlay" onClick={() => setAddPopUp(!addpopUp)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="closePopup" onClick={() => setAddPopUp(false)}>
              X
            </div>
            <div className="content">
              <h3>Add Task</h3>
              <input
                type="text"
                className="add-todo-input"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
              <button className="button" onClick={() => addNewTodo()}>
                Create Task
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
