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
    searchParams: { query, userId },
  } = useLoaderData();

  const queryRef = useRef();
  const userRef = useRef();

  useEffect(() => {
    queryRef.current.value = query;
    console.log(
      "🚀 ~ file: Posts.jsx:20 ~ useEffect ~ queryRef.current",
      queryRef.current
    );
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
            <select type="search" name="userId" id="userId" ref={userRef}>
              <option value="">Any</option>
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

  if (userId) {
    posts = fetch(
      `https://jsonplaceholder.typicode.com/posts?q=${query}&userId=${userId}`,
      {
        signal,
      }
    ).then((res) => res.json());
  } else {
    posts = fetch(`https://jsonplaceholder.typicode.com/posts?q=${query}`, {
      signal,
    }).then((res) => res.json());
  }

  return {
    searchParams: { query, userId },
    users: await users,
    posts: await posts,
  };
}

export const postsRoute = {
  loader,
  element: <Posts />,
};
