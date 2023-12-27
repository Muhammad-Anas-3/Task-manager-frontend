import React from "react";
import "./TotalTasks.css";

function TotalTasks({ tasks }) {
  return (
    <div className="total_Container">
      <h4>Total Tasks: {tasks.length}</h4>
    </div>
  );
}

export default TotalTasks;
