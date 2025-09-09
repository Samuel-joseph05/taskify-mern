import React from "react";
import { useState } from "react";
import axios from "axios";

function Create() {
  const [task, setTask] = useState("play");
  const handleAdd = () => {
    axios
      .post("http://localhost:3000/add", { task: task })
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center m-5">
      <input
        className="font-normal p-1 m-1 w-100 border-2 border-sky-500 focus:border-red-600 outline-none transition-colors duration-200  
        rounded-lg placeholder-black sm:p-3 sm:m-2"
        placeholder="enter a task..."
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        className="bg-sky-400 hover:bg-sky-500 text-white py-1 px-4 sm:px-6 sm:py-2
      rounded cursor-pointer m-1"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
}

export default Create;
