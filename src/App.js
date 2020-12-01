import React, { useEffect, useState } from "react";
import "./styles.css";
import { getState, dispatch, changeState } from "./lib/store";
import subscribe from "./lib/react-store";

changeState("MODEL_INIT", (payload) => {
  console.log(payload);
});

function App({ id, dot, dispatchInitModel }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    dispatchInitModel({ id: count });
  }, [count, dispatchInitModel]);

  const handleCount = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <h1>TEST STORAGE</h1>
      <h2>id: {id}</h2>
      <button onClick={handleCount}>Клик</button>
      <div>{dot}</div>
    </div>
  );
}

const stateToProps = () => {
  const model = getState("model", "MODEL_INIT");

  return {
    id: model.id,
    dot: model.dot
  };
};

const dispatchToProps = {
  dispatchInitModel: (params) =>
    dispatch({ state: "MODEL_INIT", store: "model" }, params)
};

export default subscribe(stateToProps, dispatchToProps)(App);
