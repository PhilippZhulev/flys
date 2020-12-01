import { newStorage, createActionTo, middleware } from "../../lib/store";

newStorage("model", { id: 1, dot: "", data: null });
const model = createActionTo("model");

middleware(model).add((action, payload, state) => {
  state.dot += ".";
});

export default model;
