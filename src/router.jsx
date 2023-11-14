import {
  Navigate,
  createBrowserRouter,
  redirect,
  useRouteError,
} from "react-router-dom";
import NavLayout from "./layouts/NavLayout";
import { postsRoute } from "./Pages/Posts";
import { usersRoute } from "./Pages/Users";
import { todosRoute } from "./Pages/Todos";
import { postRoute } from "./Pages/Post";
import { userRoute } from "./Pages/User";
import NewPost from "./Pages/NewPost";

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
              {
                path: "new",
                element: <NewPost />,
                action: async ({ request }) => {
                  const formData = await request.formData();
                  const title = await formData.get("title");
                  // console.log(
                  //   "🚀 ~ file: router.jsx:43 ~ action: ~ title:",
                  //   title
                  // );
                  const userId = await formData.get("userId");
                  // console.log(
                  //   "🚀 ~ file: router.jsx:48 ~ action: ~ userId:",
                  //   userId
                  // );
                  const body = await formData.get("body");
                  // console.log(
                  //   "🚀 ~ file: router.jsx:50 ~ action: ~ body:",
                  //   body
                  // );

                  const post = await fetch("http://localhost:3000/posts", {
                    method: "POST",
                    signal: request.signal,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title, userId, body }),
                  }).then((res) => res.json());
                  console.log(
                    "🚀 ~ file: router.jsx:64 ~ action: ~ post:",
                    post
                  );

                  return redirect("/posts");
                },
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
