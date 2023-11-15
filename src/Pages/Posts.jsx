import axios from "axios";
import { useLoaderData, NavLink, useNavigation, Form } from "react-router-dom";
import { getPosts } from "../api/postsGet";
import PostCard from "../components/PostCard";

export default function Posts() {
  const posts = useLoaderData();

  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <NavLink className="btn btn-outline" to="/posts/new">
            New
          </NavLink>
        </div>
      </h1>
      <Form method="get" action="/posts" className="form mb-4">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select type="search" name="userId" id="userId">
              <option value="">Any</option>
              <option value="1">Leanne Graham</option>
              <option value="2">Ervin Howell</option>
              <option value="3">Clementine Bauch</option>
              <option value="4">Patricia Lebsack</option>
              <option value="5">Chelsey Dietrich</option>
              <option value="6">Mrs. Dennis Schulist</option>
              <option value="7">Kurtis Weissnat</option>
              <option value="8">Nicholas Runolfsdottir V</option>
              <option value="9">Glenna Reichert</option>
              <option value="10">Clementina DuBuque</option>
            </select>
          </div>
          <button className="btn">Filter</button>
        </div>
      </Form>
      <div className="card-grid">
        {posts.map((post) => {
          return <PostCard key={post.id} {...post} />;
        })}
      </div>
    </>
  );
}

function loader({ request: { signal } }) {
  // use axios instead of fetch so we can take advantage of axious features later
  return getPosts({ signal });
}

export const postsRoute = {
  loader,
  element: <Posts />,
};
