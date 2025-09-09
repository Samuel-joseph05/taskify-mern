import React, { useEffect } from "react";
import Create from "./Create";
import { useState } from "react";
import axios from "axios";
import {
  Bs0Square,
  BsFill0SquareFill,
  BsFillCheckSquareFill,
  BsSquareFill,
} from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleCheckBox = (id) => {
    axios
      .put("http://localhost:3000/update/" + id)
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/delete/" + id)
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-red-500 h-screen">
      <div className=" ">
        <h1 className="flex justify-center font-bold text-[30px] sm:text-5xl p-2">
          {" "}
          To-Do-List
        </h1>

        <Create />
        {todos.length === 0 ? (
          <div>
            <h2 className="flex items-center justify-center font-bold text-[15px]">
              Please add a tasks to do 👇
            </h2>
          </div>
        ) : (
          todos.map((todo) => (
            <div className=" flex items-center gap-x-10  font-bold p-1 ml-5 sm:gap-x-30 sm:ml-130 sm:text-[24px] ">
              <div onClick={() => handleCheckBox(todo._id)}>
                {todo.done ? (
                  <BsFillCheckSquareFill className="icon"></BsFillCheckSquareFill>
                ) : (
                  <BsSquareFill className="icon"></BsSquareFill>
                )}
              </div>
              <div className=" ">
                <p className={todo.done ? "line_through" : " "}>{todo.task}</p>
              </div>
              <div className=" ">
                <span
                  className="material-icons p-2 m-0 cursor-pointer"
                  onClick={() => handleDelete(todo._id)}
                >
                  delete
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default Home;
