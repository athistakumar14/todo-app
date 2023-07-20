import { useEffect, useState } from "react";
import "./App.css";
import TaskInput from "./components/TaskInput/TaskInput.component";
import { SAMPLE__TODO__DATA } from "./constant";
import { TodoModal } from "./components/TodoModal";

function App() {
  const [todoData, setTodoData] = useState([]);
  const [todoCount, setTodoCount] = useState({
    total: 0,
    pending: 0,
    completed: 0,
  });
  const [visible, setvisible] = useState({
    isEdit: false,
    editItem: {},
  });
  const { total, pending, completed } = todoCount;

  const handleCheckbox = (event, selected_id) => {
    setTodoData((prev) => {
      const isChecked = event.target.checked;
      prev[selected_id].isCompleted = isChecked;
      return [...prev];
    });
  };

  useEffect(() => {
    const pending = todoData.filter((p) => !p.isCompleted).length;
    const completed = todoData.filter((p) => p.isCompleted).length;
    setTodoCount((prev) => {
      return { ...prev, total: todoData.length, pending, completed };
    });
  }, [todoData]);

  const handleDelete = (id) => {
    setTodoData((prev) => {
      const cpy = [...prev];
      cpy.splice(id, 1);
      return cpy;
    });
  };
  const handleEdit = (item) => {
    setvisible({ ...visible, isEdit: !visible.isEdit, editItem: item });
    console.log("edit", item);
  };
  return (
    <div className="container">
      {/* {visible  && <TodoModal visible={visible}/>} */}
      <div className="todo__container">
        <div className="todo__outline__box">
          <TaskInput
            setTodoData={setTodoData}
            setvisible={setvisible}
            editItem={visible.editItem}
          />
        </div>
        <div className="todo__outline__box todo__footer">
          <h2 className="">Todo's</h2>
          <div className="todo__status">
            {" "}
            {total} total, {completed} completed and {pending} pending
          </div>
          {todoData.length > 0 ? (
            <table>
              <tr>
                <th>#</th>
                <th>Todo Title</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {todoData.map((todo, id) => {
                return (
                  <tr key={todo.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={todo.isCompleted}
                        id={todo.value}
                        onChange={(event) => handleCheckbox(event, id)}
                      />
                    </td>
                    <td>
                      <label
                        for={todo.value}
                        className="todo__table__title"
                        style={
                          todo.isCompleted
                            ? { textDecoration: "line-through" }
                            : {}
                        }
                      >
                        {todo.value}{" "}
                      </label>
                    </td>
                    <td>{todo.isCompleted ? " Completed" : "Pending"}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(todo)}
                        className="todo__edit"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(id)}
                        className="todo__delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          ) : (
            <div className="todo__status">No todo's available yet</div>
          )}
          {/* Todo's TableData */}
        </div>
      </div>
    </div>
  );
}

export default App;
