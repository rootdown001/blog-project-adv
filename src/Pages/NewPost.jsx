import { Form, redirect, useLoaderData } from "react-router-dom";
import { getUsers } from "../api/usersGet";

export default function NewPost() {
  const users = useLoaderData();
  console.log("🚀 ~ file: NewPost.jsx:7 ~ NewPost ~ users:", users);

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <Form method="post" action="/posts/new" className="form">
        <div className="form-row">
          <div className="form-group error">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
            <div className="error-message">Required</div>
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId">
              {users &&
                users.map((user) => {
                  return (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body"></textarea>
          </div>
        </div>
        <div className="form-row form-btn-row">
          <a className="btn btn-outline" href="/posts">
            Cancel
          </a>
          <button className="btn">Save</button>
        </div>
      </Form>
    </>
  );
}

function loader({ request: { signal } }) {
  return getUsers({ signal });
}

async function action({ request }) {
  const formData = await request.formData();
  const title = await formData.get("title");
  const userId = await formData.get("userId");
  const body = await formData.get("body");

  const post = await fetch("http://localhost:3000/posts", {
    method: "POST",
    signal: request.signal,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, userId, body }),
  }).then((res) => res.json());
  console.log("🚀 ~ file: router.jsx:64 ~ action: ~ post:", post);

  return redirect("/posts");
}

export const newRoute = {
  loader,
  action,
  element: <NewPost />,
};
