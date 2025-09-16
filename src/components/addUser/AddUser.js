import axios from "axios";
import './AddUser.css'
import { useEffect, useState } from "react";
import { useTheme } from "../../Hooks/useTheme";

const api = axios.create({
  baseURL: "https://6821faa1b342dce8004c9871.mockapi.io/usersdata/users",
});

export default function AddUser(onUserAdded) {
  const [ setError ] = useState(null);
  const [ setUsers ] = useState([]);
  const [ setLoading ] = useState(true);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: ""
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    api
      .post("/", newUser)
      .then(() => {
        fetchData();
        setNewUser({ firstName: "", lastName: "", email: "", bio: "" });
        onUserAdded();
      })
      .catch((err) => setError(err.message));
  };

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

  const { mode } = useTheme()
  
  return (

    <form onSubmit={handleAddUser} className={`container ${mode}`}>
      <input
        type="text"
        placeholder="First Name"
        value={newUser.firstName}
        onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={newUser.lastName}
        onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Bio"
        value={newUser.bio}
        onChange={(e) => setNewUser({ ...newUser, bio: e.target.value })}
      />
      <button type="submit">Add User</button>
    </form>
  )
}