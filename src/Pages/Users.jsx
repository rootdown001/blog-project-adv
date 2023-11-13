import axios from "axios";
import { useLoaderData, NavLink, useNavigation } from "react-router-dom";
import { getUsers } from "../api/usersGet";

export default function Users() {
  const users = useLoaderData();

  return (
    <>
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        {users.map((user) => {
          return (
            <div key={user.id} className="card">
              <div className="card-header">{user.name}</div>
              <div className="card-body">
                <div>{user.company.name}</div>
                <div>{user.website}</div>
                <div>{user.email}</div>
              </div>
              <div className="card-footer">
                <NavLink to={`/users/${user.id}`} className="btn">
                  View
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function loader({ request: { signal } }) {
  // use axios instead of fetch so we can take advantage of axious features later
  return getUsers({ signal });
}

export const usersRoute = {
  loader,
  element: <Users />,
};
