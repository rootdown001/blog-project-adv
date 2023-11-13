import { baseApi } from "./base";

export function getUsers(options) {
  // use baseApi instead of axios - made with axios.create
  return baseApi.get("users", options).then((res) => res.data);
}

export function getUser(id, options) {
  // use baseApi instead of axios - made with axios.create
  return baseApi.get(`users/${id}`, options).then((res) => res.data);
}
