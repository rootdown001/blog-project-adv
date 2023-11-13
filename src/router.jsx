import { Navigate, createBrowserRouter, useRouteError } from "react-router-dom";
import NavLayout from "./layouts/NavLayout";
import { postsRoute } from "./Pages/Posts";
import { usersRoute } from "./Pages/Users";
import { todosRoute } from "./Pages/Todos";
import { postRoute } from "./Pages/Post";
import { userRoute } from "./Pages/User";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    path: "/",
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          // add Navigate to so "/" goes to "/posts"
          { index: true, element: <Navigate to="/posts" /> },
          {
            path: "posts",
            children: [
              // go to `<Posts>` if "/posts"
              {
                index: true,
                ...postsRoute,
              },
              {
                path: ":postId",
                ...postRoute,
              },
            ],
          },

          // go to `<Users>` if "/users"
          {
            path: "users",
            children: [
              {
                index: true,
                // spread UsersRoute - gives loader & element
                ...usersRoute,
              },
              {
                path: ":userId",
                ...userRoute,
              },
            ],
          },
          // go to `<Todos>` if "/todos"
          {
            path: "todos",
            ...todosRoute,
          },
          // 404 Error if no match
          { path: "*", element: <h1>404 Error - Page Not Found</h1> },
        ],
      },
    ],
  },
]);

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <h1>Error - Something went wrong</h1>
      {import.meta.env.MODE !== "production" && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  );
}
