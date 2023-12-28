import React, { useState } from "react";
import "./MyForm.css";
import AddTaskIcon from "@mui/icons-material/AddTask";
import axios from "axios";
import Alert from "../Alert/Alert";
import { BeatLoader } from "react-spinners";

function MyForm({ onHandleCreate }) {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [addBtnSpinner, setAddBtnSpinner] = useState(false);

  const createTask = async (e) => {
    setAddBtnSpinner(true);
    e.preventDefault();
    if (inputValue.length < 1) {
      setAddBtnSpinner(false);
      setErrorMessage(true);
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
      setAddBtnSpinner(false);
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
        {addBtnSpinner ? (
          <BeatLoader color="teal" size={15} className="beat_loader" />
        ) : (
          <button className="task_btn">
            Add
            <AddTaskIcon />
          </button>
        )}
      </form>
      <div className="err_container">
        {errorMessage && <Alert msg={"Please enter a task before adding."} />}
      </div>
    </>
  );
}

export default MyForm;
