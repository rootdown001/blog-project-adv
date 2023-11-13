import { baseApi } from "./base";

export function getTodos(options) {
  // use baseApi instead of axios - made with axios.create
  return baseApi.get("todos", options).then((res) => res.data);
}
