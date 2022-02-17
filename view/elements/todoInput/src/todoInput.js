import React from "react";
export const Input = ({ refetch }) => {
  const [todo, setTodo] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const handleAdd = async () => {
    setSubmitting(true);
    try {
      console.log("todo", todo);
      const res = await fetch("http://localhost:3003/addTodos", {
        method: "post",
        body: JSON.stringify({ data: todo }),
        headers: { "Content-Type": "application/json" },
      });
      const resp = await res.json();
      console.log(resp);
      setSubmitting(false);
      refetch(true);
    } catch (e) {
      console.log(e);
      setSubmitting(false);
    }
  };
  return (
    <>
      <div className="todo-item">
        <div>
          <input
            type="text"
            value={todo}
            disabled={submitting}
            onChange={(e) => setTodo(e.target.value)}
          />
        </div>
        <div>
          <button disabled={submitting} onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default Input;
