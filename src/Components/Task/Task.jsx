import "./Task.css";
import { useState } from "react";
import { Delete } from "@mui/icons-material";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { Link } from "react-router-dom";
import axios from "axios";
import { ScaleLoader } from "react-spinners";

function Task({ task, onDelete }) {
  const [deleteSpinner, setDeleteSpinner] = useState(false);

  const handleDelete = async () => {
    setDeleteSpinner(true);
    try {
      await axios.delete(
        `https://task-manager-backend-kappa.vercel.app/api/v1/tasks/${task._id}`
      );
      onDelete(task._id);
      setDeleteSpinner(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="task" key={task._id}>
      <div
        className="taskName"
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed ? "#676a6c" : "",
        }}
      >
        {task.Task}
      </div>
      <Link to={`/edit/${task._id}`}>
        <EditNoteOutlinedIcon className="Edit_Task" />
      </Link>
      {deleteSpinner ? (
        <ScaleLoader
          color="teal"
          speedMultiplier={2}
          height={20}
          width={3}
          className="delete_btn_spinner"
        />
      ) : (
        <Delete className="delete_icon" onClick={handleDelete} />
      )}
    </div>
  );
}
export default Task;
