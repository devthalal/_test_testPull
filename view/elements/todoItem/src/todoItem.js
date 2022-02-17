import React from "react";
// import "./styles.css";

export const Item = ({ id, item, refetch }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    const idToRemove = e.target.value.trim();
    fetch("http://localhost:3001/removeTodo", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "delete",
      body: JSON.stringify({ data: { id: idToRemove } }),
    })
      .then((res) => res.json())
      .then(({ status }) => {
        console.log(status);
        refetch(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div id={id} className="todo-item">
        <div>
          <p>{item}</p>
        </div>
        <div>
          <button value={id} onClick={handleDelete}>
            delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Item;
