import axios from "axios";
import { useLoaderData, NavLink, useNavigation } from "react-router-dom";
import { getPosts } from "../api/postsGet";
import PostCard from "../components/PostCard";

export default function Posts() {
  const posts = useLoaderData();

  return (
    <>
      <h1 className="page-title">Posts</h1>
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
