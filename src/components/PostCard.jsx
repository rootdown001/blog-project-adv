import { NavLink } from "react-router-dom";

export default function PostCard({ id, title, body }) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <div className="card-preview-text">{body}</div>
      </div>
      <div className="card-footer">
        <NavLink to={`/posts/${id}`} className="btn">
          View
        </NavLink>
      </div>
    </div>
  );
}
