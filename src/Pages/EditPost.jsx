import { Form, NavLink, redirect, useLoaderData } from "react-router-dom";
import { getPost } from "../api/postsGet";

export default function EditPost() {
  const post = useLoaderData();
  console.log("🚀 ~ file: EditPost.jsx:6 ~ EditPost ~ post:", post);

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <Form method="post" action="/posts/2/edit" className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value="qui est esse" />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId">
              <option value="1">Leanne Graham</option>
              <option value="2">Ervin Howell</option>
              <option value="3" selected="">
                Clementine Bauch
              </option>
              <option value="4">Patricia Lebsack</option>
              <option value="5">Chelsey Dietrich</option>
              <option value="6">Mrs. Dennis Schulist</option>
              <option value="7">Kurtis Weissnat</option>
              <option value="8">Nicholas Runolfsdottir V</option>
              <option value="9">Glenna Reichert</option>
              <option value="10">Clementina DuBuque</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body">
              est rerum tempore vitae sequi sint nihil reprehenderit dolor
              beatae ea dolores neque fugiat blanditiis voluptate porro vel
              nihil molestiae ut reiciendis qui aperiam non debitis possimus qui
              neque nisi nulla
            </textarea>
          </div>
        </div>
        <div className="form-row form-btn-row">
          <NavLink className="btn btn-outline" to="/posts/2">
            Cancel
          </NavLink>
          <button className="btn">Save</button>
        </div>
      </Form>
    </>
  );
}

async function loader({ request: { signal }, params: { postId } }) {
  const post = getPost(postId, { signal });
  return { post: await post };
}

async function action({ request }) {
  const formData = await request.formData();
  const title = await formData.get("title");
  const userId = await formData.get("userId");
  const body = await formData.get("body");

  //   const post = await fetch("http://localhost:3000/posts", {
  //     method: "POST",
  //     signal: request.signal,
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ title, userId, body }),
  //   }).then((res) => res.json());
  //   console.log("🚀 ~ file: router.jsx:64 ~ action: ~ post:", post);

  return;
  //   redirect("/posts");
}

export const editRoute = {
  loader,
  action,
  element: <EditPost />,
};
