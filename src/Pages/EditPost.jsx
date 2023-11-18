import {
  Form,
  NavLink,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { getPost } from "../api/postsGet";
import { getUsers } from "../api/usersGet";

export default function EditPost() {
  const { post, users } = useLoaderData();
  const { state } = useNavigation();

  const isSubmitting = state === "submitting" || state === "loading";

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <Form method="put" action={`/posts/${post.id}/edit`} className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={post.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId" defaultValue={post.userId}>
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
            <textarea name="body" id="body" defaultValue={post.body}></textarea>
          </div>
        </div>
        <div className="form-row form-btn-row">
          <NavLink className="btn btn-outline" to={`/posts/${post.id}`}>
            Cancel
          </NavLink>
          <button disabled={isSubmitting} className="btn">
            {isSubmitting ? "Submitting" : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

async function loader({ request: { signal }, params: { postId } }) {
  const post = getPost(postId, { signal });
  const users = getUsers({ signal });

  return { post: await post, users: await users };
}

async function action({ request, params }) {
  const formData = await request.formData();
  const title = await formData.get("title");
  const userId = await formData.get("userId");
  const body = await formData.get("body");

  const updatedPost = await fetch(
    `http://localhost:3000/posts/${params.postId}`,
    {
      method: "PUT",
      signal: request.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, userId }),
    }
  ).then((res) => res.json());

  return redirect("/posts");
}

export const editRoute = {
  loader,
  action,
  element: <EditPost />,
};
