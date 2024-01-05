import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./EditPage.css";
import Alert from "../../Components/Alert/Alert";
import { BeatLoader } from "react-spinners";

function EditPage() {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [editBtnSpinner, setEditBtnSpinner] = useState(false);
  const [editedTask, setEditedTask] = useState({
    Task: "",
    completed: false,
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `https://task-manager-backend-kappa.vercel.app/api/v1/tasks/${id}`
        );
        const singleTask = response.data.data.task;
        setTask(singleTask);
        setEditedTask((prev) => ({
          ...prev,
          Task: singleTask.Task,
          completed: singleTask.completed,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchTask();
  }, [id]);

  const TimeOutFunction = () => {
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const handleEdit = async () => {
    // check when the value is equall to empty string so the alert will be shown and the process will be terminated
    if (editedTask.Task === "") {
      setShowMessage(true);
      setAlertMessage("Task Is Required and You Enter Empty Value");
      TimeOutFunction();
      return;
    }
    // check when the value is equall to old value so the alert will be shown and the process will be terminated
    if (editedTask.Task === task.Task) {
      setShowMessage(true);
      setAlertMessage("Task already present, please edit again");
      TimeOutFunction();
      return;
    }
    setEditBtnSpinner(true);
    try {
      await axios.patch(
        `https://task-manager-backend-kappa.vercel.app/api/v1/tasks/${id}`,
        editedTask
      );
      setShowMessage(true);
      setAlertMessage("Successfully Edited");
      TimeOutFunction();
      setEditBtnSpinner(false);
    } catch (error) {
      console.log("Error response from server:", error.response);
    }
  };

  const handleInputCheckboxChange = () => {
    setEditedTask((prev) => ({ ...prev, completed: !prev.completed }));
  };

  return (
    <div className="edit_container">
      <div className="box">
        <div className="title">Edit Task</div>
        <div className="task_id">
          TaskID:
          <div className="id">{task?._id || "N/A"}</div>
        </div>
        <div className="Task_Name">
          Task:
          <input
            type="text"
            className="Input"
            name="Task"
            value={editedTask.Task ?? ""}
            onChange={(e) =>
              setEditedTask((prev) => ({ ...prev, Task: e.target.value }))
            }
          />
        </div>
        <div className="completed_task">
          completed:
          <input
            type="checkbox"
            className="completed_checkbox"
            name="completed"
            checked={editedTask.completed || false}
            onChange={handleInputCheckboxChange}
          />
        </div>

        {editBtnSpinner ? (
          <div className="edit_btn_Spinner">
            <BeatLoader color="teal" size={15} />
          </div>
        ) : (
          <button className="edit_task_btn" onClick={handleEdit}>
            Edit
          </button>
        )}
        <div className="msg_container">
          {showMessage && <Alert msg={alertMessage} />}
        </div>
      </div>
      <Link to="/" className="custom_link">
        <button className="back_to_home_btn">Back To Home Page</button>
      </Link>
    </div>
  );
}

export default EditPage;
