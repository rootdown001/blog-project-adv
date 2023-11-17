import axios from "axios";
import { useLoaderData, NavLink, useNavigation, Form } from "react-router-dom";
import { getPosts } from "../api/postsGet";
import PostCard from "../components/PostCard";
import { useEffect, useRef } from "react";
import { getUsers } from "../api/usersGet";

export default function Posts() {
  const {
    posts,
    users,
    searchParams: { query },
  } = useLoaderData();

  const queryRef = useRef();

  useEffect(() => {
    queryRef.current.value = query;
  }, [query]);

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
            <input type="search" name="query" id="query" ref={queryRef} />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select type="search" name="userId" id="userId">
              {users &&
                users.map((user) => {
                  return (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              {/* <option value="">Any</option>
              <option value="1">Leanne Graham</option>
              <option value="2">Ervin Howell</option>
              <option value="3">Clementine Bauch</option>
              <option value="4">Patricia Lebsack</option>
              <option value="5">Chelsey Dietrich</option>
              <option value="6">Mrs. Dennis Schulist</option>
              <option value="7">Kurtis Weissnat</option>
              <option value="8">Nicholas Runolfsdottir V</option>
              <option value="9">Glenna Reichert</option>
              <option value="10">Clementina DuBuque</option> */}
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

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query") || "";
  const userId = searchParams.get("userId") || "";
  console.log("🚀 ~ file: Posts.jsx:67 ~ loader ~ userId:", userId);

  const users = getUsers({ signal });

  let posts;

  posts = fetch(`http://localhost:3000/posts?q=${query}`, {
    signal,
  }).then((res) => res.json());

  // if (query === "") {
  //   posts = getPosts({ signal });
  // } else {
  //   posts = fetch(`http://localhost:3000/posts?q=${query}`, {
  //     signal,
  //   }).then((res) => res.json());
  // }

  return {
    searchParams: { query },
    users: await users,
    posts: await posts,
  };
}

export const postsRoute = {
  loader,
  element: <Posts />,
};
