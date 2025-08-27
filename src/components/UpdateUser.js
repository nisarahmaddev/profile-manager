  import React, { useState } from "react";
  import axios from "axios";

  const api = axios.create({
    baseURL: "https://6821faa1b342dce8004c9871.mockapi.io/usersdata/users",
  });

  export default function UpdateUser({ user, onUpdated, onCancel }) {
    const [editUser, setEditUser] = useState(user);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpdate = (e) => {
      e.preventDefault();
      setLoading(true);

      api
        .put(`/${editUser.id}`, editUser)
        .then((res) => {
          setLoading(false);
          onUpdated(res.data); 
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    };

    return (
      <div>
        <h3>Edit User</h3>
        {error && <p>Error: {error}</p>}
        {loading && <p>Updating user...</p>}

        <form onSubmit={handleUpdate} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={editUser.firstName}
            onChange={(e) =>
              setEditUser({ ...editUser, firstName: e.target.value })
            }
            required
            placeholder="First Name"
          />
          <input
            type="text"
            value={editUser.lastName}
            onChange={(e) =>
              setEditUser({ ...editUser, lastName: e.target.value })
            }
            required
            placeholder="Last Name"
          />
          <input
            type="email"
            value={editUser.email}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
            required
            placeholder="Email"
          />
          <input
            type="text"
            value={editUser.bio}
            onChange={(e) =>
              setEditUser({ ...editUser, bio: e.target.value })
            }
            placeholder="Bio"
          />

          <div style={{ marginTop: "10px" }}>
            <button type="submit" disabled={loading}>
              Update User
            </button>
            <button
              type="button"
              onClick={onCancel}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>   
          </div>
        </form>
      </div>
    );
  }
