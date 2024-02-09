import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { getUsers } from "../api/usersGet";

export default function NewPost() {
  const users = useLoaderData();
  const { state } = useNavigation();
  const errorMessage = useActionData();
  console.log(
    "🚀 ~ file: NewPost.jsx:14 ~ NewPost ~ errorMessage:",
    errorMessage
  );

  const isSubmitting = state === "submitting" || state === "loading";

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <Form method="post" action="/posts/new" className="form">
        <div className="form-row">
          <div
            className={
              errorMessage === "Title is required"
                ? "form-group error"
                : "form-group"
            }
          >
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
            {errorMessage === "Title is required" ? (
              <div className="error-message">Required</div>
            ) : (
              ""
            )}
          </div>
          <div
            className={
              errorMessage === "Author is required"
                ? "form-group error"
                : "form-group"
            }
          >
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId">
              <option value={""}>-- Select --</option>;
              {users &&
                users.map((user) => {
                  return (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
            </select>
            {errorMessage === "Author is required" ? (
              <div className="error-message">Required</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="form-row">
          <div
            className={
              errorMessage === "Body is required"
                ? "form-group error"
                : "form-group"
            }
          >
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body"></textarea>
            {errorMessage === "Body is required" ? (
              <div className="error-message">Required</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="form-row form-btn-row">
          <a className="btn btn-outline" href="/posts">
            Cancel
          </a>
          <button disabled={isSubmitting} className="btn">
            {isSubmitting ? "Submitting" : "Save"}
          </button>
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

  // add validation
  if (title === "") {
    return "Title is required";
  }
  if (userId === "") {
    return "Author is required";
  }
  if (body === "") {
    return "Body is required";
  }

  const post = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    signal: request.signal,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, userId, body }),
  }).then((res) => res.json());

  return redirect("/posts");
}

export const newRoute = {
  loader,
  action,
  element: <NewPost />,
};
