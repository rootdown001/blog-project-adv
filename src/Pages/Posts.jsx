import axios from "axios";
import { useLoaderData, NavLink, useNavigation, Form } from "react-router-dom";
import { getPosts } from "../api/postsGet";
import PostCard from "../components/PostCard";
import { useEffect, useRef } from "react";

export default function Posts() {
  const {
    posts,
    searchParams: { query },
  } = useLoaderData();
  console.log("🚀 ~ file: Posts.jsx:9 ~ Posts ~ query:", query);
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

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query") || "";
  console.log("🚀 ~ file: Posts.jsx:56 ~ loader ~ query:", query);

  let posts;

  if (query === "") {
    posts = getPosts({ signal });
  } else {
    posts = fetch(`http://localhost:3000/posts?q=${query}`, {
      signal,
    }).then((res) => res.json());
  }

  return {
    searchParams: { query },
    posts: await posts,
  };
}

export const postsRoute = {
  loader,
  element: <Posts />,
};
