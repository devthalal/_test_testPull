import React, { useEffect } from "react";
import System from "../../System";

export const TodoItem = (props) => {
  const [system, setSystem] = React.useState(undefined);
  function setLayout() {
    setSystem({
      url: "http://localhost:4008/remoteEntry.js",
      scope: "todoInput",
      module: "./todoInput",
    });
  }
  useEffect(() => {
    setLayout();
  }, []);
  return <System system={system} {...props} />;
};
