import axios from "axios";
import { useEffect, useState } from "react";
import AddUser from "./AddUser";
import DeleteIcon from '../images/abc.svg'
import UpdateUser from "./UpdateUser";
import "./FetchingUser.css";
import { useTheme } from "../Hooks/useTheme";

const api = axios.create({
  baseURL: "https://6821faa1b342dce8004c9871.mockapi.io/usersdata/users",
});

export default function FetchingUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);

  const { mode } = useTheme()
  const fetchData = () => {
    setLoading(true);
    setError(null);

    api
      .get("/")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const startEdit = (user) => {
    setEditUser(user);
  };

  const handleUpdated = () => {
    setEditUser(null);
    fetchData();
  };

  const handleDelete = (id) => {
    api
      .delete(`/${id}`)
      .then(() => fetchData())
      .catch((err) => setError(err.message));
  };

  if (loading) return <h4>Loading users...</h4>;
  if (error) return <h4>Error: {error}</h4>;



  return (
    <div className={`container ${mode}`}>
      {editUser && (
        <UpdateUser
          user={editUser}
          onUpdated={handleUpdated}
          onCancel={() => setEditUser(null)}
        />
      )}

      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className={`card ${mode}`}>

            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt={user.firstName}
                className="profilePic"
              />
            ) : (
              <div className="profilePic">N/A</div>
            )}

            <div className='info'>
              <p>
                <h2 className={`name ${mode}`}>
                  {user.firstName} {user.lastName}
                </h2>
              </p>
              <p className={`pera ${mode}`}>{user.email}</p>
              <p className={`bio ${mode}`}>{user.bio}</p>
            </div>

            <div className={`actions ${mode}`}>
              <button onClick={() => startEdit(user)}>Edit</button>
              <img
                className={`delete ${mode}`}
                src={DeleteIcon}
                alt="Delete"
                onClick={() => handleDelete(user.id)}
              />
            </div>
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
