import React, { useEffect } from "react";
import System from "../../System";

export const TodoItem = (props) => {
  console.log(props, "gh");
  const [system, setSystem] = React.useState(undefined);
  function setLayout() {
    setSystem({
      url: "http://localhost:4007/remoteEntry.js",
      scope: "todoItem",
      module: "./todoItem",
    });
  }
  useEffect(() => {
    setLayout();
  }, []);
  return <System system={system} {...props} />;
};
