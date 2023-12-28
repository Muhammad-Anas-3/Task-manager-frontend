import React, { useState } from "react";
import "./MyForm.css";
import AddTaskIcon from "@mui/icons-material/AddTask";
import axios from "axios";

function MyForm({ onHandleCreate, loading, setLoading }) {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const createTask = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (inputValue.length < 1) {
      setLoading(false);
      setErrorMessage("Please enter a task before adding.");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);

      return;
    }
    try {
      const response = await axios.post(
        "https://task-manager-backend-kappa.vercel.app/api/v1/tasks",
        {
          Task: inputValue,
        }
      );
      onHandleCreate(response.data.data.task);
      setLoading(false);
      setInputValue("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="form_container" onSubmit={createTask}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="main_input"
          placeholder="Enter a new task"
        />
        <button className="task_btn">
          Add
          <AddTaskIcon />
        </button>
      </form>
      <div className="err_container">
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </>
  );
}

export default MyForm;
