import React, { useEffect, useState } from "react";

const TaskInput = ({ setTodoData, setvisible, editItem }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddBtn = () => {
    setTodoData((prev) => {
      const todoArray = [...prev];
      if (editItem) {
        todoArray.splice(editItem.id, 1, {
          ...editItem,
          value: inputValue,
          isCompleted: false,
        });
        return todoArray;
      } else {
        const addTodo = {
          id: prev.length + 1,
          value: inputValue,
          isCompleted: false,
        };
        todoArray.unshift(addTodo);
        return todoArray;
      }
    });
    setInputValue("");
  };

  useEffect(() => {
    if (editItem) setInputValue(editItem.value);
  }, [editItem]);

  return (
    <div className="text__input__container">
      <input
        placeholder=" Add new Todo ..."
        className="input__todo"
        type="text"
        id="tast_input"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleAddBtn} className="add__btn">
        +
      </button>
    </div>
  );
};

export default TaskInput;
