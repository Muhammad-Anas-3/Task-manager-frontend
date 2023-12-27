import "./Task.css";
import { Delete } from "@mui/icons-material";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { Link } from "react-router-dom";
import axios from "axios";

function Task({ task, onDelete }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://task-manager-backend-dun.vercel.app/api/v1/tasks/${task._id}`);
      onDelete(task._id);
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
        {task.userName}
      </div>
      <Link to={`/edit/${task._id}`}>
        <EditNoteOutlinedIcon className="Edit_Task" />
      </Link>
      <Delete className="delete_icon" onClick={handleDelete} />
    </div>
  );
}
export default Task;
