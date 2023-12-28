import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import MyForm from "../../Components/Form/MyForm";
import TotalTasks from "../../Components/TotalTasks/TotalTasks";
import Task from "../../Components/Task/Task";
import axios from "axios";
import Spinner from "../../Components/Spinner/Spinner";
import NoTask from "../../Components/NoTask/NoTask";
import "./HomePage.css";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://task-manager-backend-kappa.vercel.app/api/v1/tasks"
        );
        const taskData = response.data.data.tasks;
        setTasks(taskData);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchData();
  }, []);

  const createTask = async (newTask) => {
    setTasks((preTask) => [...preTask, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <MyForm onHandleCreate={createTask} />
          <TotalTasks tasks={tasks} />
          {tasks.length == 0 ? (
            <NoTask />
          ) : (
            <div className="task_container">
              {tasks.map((task) => (
                <Task key={task._id} task={task} onDelete={deleteTask} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
